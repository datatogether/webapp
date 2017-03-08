/* globals window */
import { normalize } from 'normalizr';
import Schemas from '../schemas';
import { setErrorMessage, resetErrorMessage } from '../actions/app';

// Variable to hold the connection
let conn;

// attempt to reconnect
function reconnect(dispatch, timeout=0) {
  console.log('attempting reconnnect');
  if (!timeout) {
    return connect(dispatch);
  }

  return setTimeout(() => {
    connect(dispatch).catch(() => {
      reconnect(dispatch, timeout);
    })
  }, timeout);
}

// Connect the websocket using a passed-in redux dispatch
// @return {promise}
export function connect(dispatch, reconnectTimeout=6500) {
  return new Promise((resolve, reject) => {
    if (window["WebSocket"]) {
      conn = new WebSocket("ws://" + "localhost:3000" + "/ws");
      conn.onclose = (evt) => {
        reconnect(dispatch, reconnectTimeout);
      };

      conn.onmessage = (evt) => {
        console.log(evt);
        dispatch(JSON.parse(evt.data));
      };

      conn.onopen = (evt) => {
        resolve();
      }

      conn.onerror = (evt) => {
        reject(evt);
      }

      return;
    }

    return reject("websocket connections not supported");
  });
}

// check weather the websocket is connected or not
// @return {boolean}
export function connected() {
  return !!conn;
}

// disconnect closes the connection.
// @return {promise}
export function disconnect() {
  return new Promise((resolve, reject) => {
    console.log("disconnecting");
    conn.close();
    return resolve();
  })
}

// sendCallApiAction is meant to work with api middleware
// as a seamless upgrade to traditional JSON API calls
// "actions" submitted here are expected to be the CALL_API
// object referenced in actions
export function callApiAction(store, next, action) {
  let { endpoint } = action;
  const { schema, types, data, method="GET", silentError=false } = action;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    // delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }));

  // make the request
  // return callApi(method, endpoint, schema, data).then(
  //   response => next(actionWith({
  //     type: successType,
  //     response
  //   })),
  //   error => {
  //     var msg = 'Something Bad Happened' 
  //     if (error.meta && error.meta.message) {
  //       msg = error.meta.message
  //     }
  //     return next(actionWith({
  //       type: failureType, 
  //       error: msg,
  //       silentError
  //     }))
  //   }
  // )

  return conn.send(JSON.stringify({
    type : requestType,
    data
  }));
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(method, endpoint, schema, data) {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  let body

  // add query params to GET requests listed on data
  if (data && method == "GET") {
    let addedFirst = false
    Object.keys(data).forEach((key, i) => {
      const val = encodeURIComponent(data[key])
      if (val != "") {
        fullUrl += (addedFirst) ? `&${key}=${val}` : `?${key}=${val}`
        addedFirst = true
      }
    })
  } else if (data) {
    body = JSON.stringify(data)
  }

  return fetch(fullUrl, {
    method : method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body
  })
    .then(response => {
      return response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      } else if (response.status == 204) {
        return {}
      }

      const { data } = json

      return Object.assign({},
        normalize(data, schema)
        // { nextPageUrl }
      )
    });
}