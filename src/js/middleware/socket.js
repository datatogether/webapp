/* globals window, WebSocket */
import { normalize } from 'normalizr';
import Schemas from '../schemas';
// import { setErrorMessage, resetErrorMessage } from '../actions/app';

const WEBSOCKET_URL = "localhost:3000/ws";

// Variable to hold the connection
let conn;

// Connect the websocket using a passed-in redux dispatch
// @return {promise}
export function connect(dispatch, reconnectTimeout = 6500) {
  return new Promise((resolve, reject) => {
    if (window.WebSocket) {
      conn = new WebSocket(`ws://${WEBSOCKET_URL}`);
      conn.onclose = () => {
        if (reconnectTimeout) {
          setTimeout(() => {
            connect(dispatch, reconnectTimeout);
          }, reconnectTimeout);
        }
      };

      conn.onmessage = (evt) => {
        let res = JSON.parse(evt.data);
        if (res.schema) {
          res.response = normalize(res.data, Schemas[res.schema]);
          dispatch(res);
          return;
        }
        dispatch(res);
      };

      conn.onopen = (evt) => {
        resolve(evt);
      };

      conn.onerror = (evt) => {
        reject(evt);
      };

      return;
    }

    reject("websocket connections not supported");
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
  return new Promise((resolve) => {
    conn.close();
    return resolve();
  });
}

// sendCallApiAction is meant to work with api middleware
// as a seamless upgrade to traditional JSON API calls
// "actions" submitted here are expected to be the CALL_API
// object referenced in actions
export function callApiAction(store, next, action) {
  let { endpoint } = action;
  const { schema, types, data } = action;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(d) {
    const finalAction = Object.assign({}, action, d);
    // delete finalAction[CALL_API]
    return finalAction;
  }

  const [requestType] = types;

  // fire an action indicating a request has been made
  next(actionWith({ type: requestType }));

  // send the request through the socket
  return conn.send(JSON.stringify({
    type: requestType,
    data,
  }));
}
