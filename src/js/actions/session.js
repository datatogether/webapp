import { push } from 'react-router-redux';
import { USERS_API } from '../middleware/users';

import Schemas from '../schemas';
import { setMessage, resetMessage } from './app';
import { updateLocalModel, editModel } from './locals';
import { selectSessionUser } from '../selectors/session';

export const SESSION_SIGNUP_REQUEST = 'SESSION_SIGNUP_REQUEST';
export const SESSION_SIGNUP_SUCCESS = 'SESSION_SIGNUP_SUCCESS';
export const SESSION_SIGNUP_FAILURE = 'SESSION_SIGNUP_FAILURE';

export function signup(user) {
  return (dispatch) => {
    return dispatch({
      [USERS_API]: {
        types: [SESSION_SIGNUP_REQUEST, SESSION_SIGNUP_SUCCESS, SESSION_SIGNUP_FAILURE],
        endpoint: `/users`,
        method: "POST",
        schema: Schemas.SESSION_USER,
        data: user,
      },
    });
  };
}

export const SESSION_USER_REQUEST = 'SESSION_USER_REQUEST';
export const SESSION_USER_SUCCESS = 'SESSION_USER_SUCCESS';
export const SESSION_USER_FAILURE = 'SESSION_USER_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchSessionUser() {
  return (dispatch, getState) => {
    return dispatch({
      [USERS_API]: {
        types: [SESSION_USER_REQUEST, SESSION_USER_SUCCESS, SESSION_USER_FAILURE],
        endpoint: `/session`,
        schema: Schemas.SESSION_USER,
        silentError: true,
      },
    }).then(action => {
      if (action.type == SESSION_USER_SUCCESS) {
        dispatch(fetchKeys())
      }
    });
  };
}

// Relies on Redux Thunk middleware.
export function loadSessionUser() {
  return (dispatch, getState) => {
    // if (getState().session.requestedSession) {
    //   return null
    // }

    if (Object.keys(getState().entities.session).length) {
      return new Promise((resolve) => {
        resolve({});
      });
    }

    return dispatch(fetchSessionUser());
  };
}

export const EDIT_SESSION_USER = 'EDIT_SESSION_USER';
export function editSessionUser() {
  return (dispatch, getState) => {
    const user = selectSessionUser(getState());
    if (!user) {
      return null;
    }

    return dispatch(editModel(Schemas.SESSION_USER, EDIT_SESSION_USER, user));
  };
}

const SESSION_USER_UPDATE = 'SESSION_USER_UPDATE';
export function updateSessionUser(user) {
  return updateLocalModel(Schemas.SESSION_USER, SESSION_USER_UPDATE, user);
}

export const SAVE_SESSION_USER_REQUEST = 'SAVE_SESSION_USER_REQUEST';
export const SAVE_SESSION_USER_SUCCESS = 'SAVE_SESSION_USER_SUCCESS';
export const SAVE_SESSION_USER_FAILURE = 'SAVE_SESSION_USER_FAILURE';

export function saveSessionUser(user) {
  return (dispatch) => {
    return dispatch({
      [USERS_API]: {
        types: [SAVE_SESSION_USER_REQUEST, SAVE_SESSION_USER_SUCCESS, SAVE_SESSION_USER_FAILURE],
        endpoint: '/session',
        method: 'PUT',
        schema: Schemas.SESSION_USER,
        data: user,
      },
    }).then((action) => {
      if (action.type == SAVE_SESSION_USER_SUCCESS) {
        dispatch(setMessage("settings successfully saved"));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 3500);
        return dispatch(push(`/${user.username}`));
      }

      return null;
    });
  };
}

export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE';

export function loginUser(username, password) {
  return {
    [USERS_API]: {
      types: [SESSION_LOGIN_REQUEST, SESSION_LOGIN_SUCCESS, SESSION_LOGIN_FAILURE],
      endpoint: '/session',
      method: 'POST',
      schema: Schemas.SESSION_USER,
      data: { username, password },
    },
  };
}

export const SESSION_LOGOUT_REQUEST = 'SESSION_LOGOUT_REQUEST';
export const SESSION_LOGOUT_SUCCESS = 'SESSION_LOGOUT_SUCCESS';
export const SESSION_LOGOUT_FAILURE = 'SESSION_LOGOUT_FAILURE';

export function logoutUser(username, password) {
  return {
    [USERS_API]: {
      types: [SESSION_LOGOUT_REQUEST, SESSION_LOGOUT_SUCCESS, SESSION_LOGOUT_FAILURE],
      endpoint: '/session',
      method: 'DELETE',
      schema: Schemas.SESSION_USER,
      data: { username, password },
    },
  };
}


export const SESSION_KEYS_REQUEST = 'SESSION_KEYS_REQUEST';
export const SESSION_KEYS_SUCCESS = 'SESSION_KEYS_SUCCESS';
export const SESSION_KEYS_FAILURE = 'SESSION_KEYS_FAILURE';

export function fetchKeys() {
  return {
    [USERS_API]: {
      types: [SESSION_KEYS_REQUEST, SESSION_KEYS_SUCCESS, SESSION_KEYS_FAILURE],
      endpoint: `/session/keys`,
      schema: Schemas.KEY_ARRAY,
      silentError: true,
    },
  };
}

export function loadKeys() {
  return (dispatch, getState) => {
    if (getState().entities.ssh_keys) {
      return null;
    }

    return dispatch(fetchKeys());
  };
}

export const SESSION_CREATE_KEY_REQUEST = 'SESSION_CREATE_KEY_REQUEST';
export const SESSION_CREATE_KEY_SUCCESS = 'SESSION_CREATE_KEY_SUCCESS';
export const SESSION_CREATE_KEY_FAILURE = 'SESSION_CREATE_KEY_FAILURE';

export function createKey(name = "", key = "") {
  return (dispatch) => {
    return dispatch({
      [USERS_API]: {
        types: [SESSION_CREATE_KEY_REQUEST, SESSION_CREATE_KEY_SUCCESS, SESSION_CREATE_KEY_FAILURE],
        endpoint: "/session/keys",
        method: "POST",
        schema: Schemas.KEY,
        data: { name, key },
      },
    }).then((action) => {
      if (action.type == SESSION_CREATE_KEY_SUCCESS) {
        dispatch(setMessage(`added ssh key:${name}`));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 3500);
        // return dispatch(push(`/qri`));
      }

      return null;
    });
  };
}


export const SESSION_DELETE_KEY_REQUEST = 'SESSION_DELETE_KEY_REQUEST';
export const SESSION_DELETE_KEY_SUCCESS = 'SESSION_DELETE_KEY_SUCCESS';
export const SESSION_DELETE_KEY_FAILURE = 'SESSION_DELETE_KEY_FAILURE';

export function deleteKey(name = "", sha = "") {
  return (dispatch) => {
    return dispatch({
      [USERS_API]: {
        types: [SESSION_DELETE_KEY_REQUEST, SESSION_DELETE_KEY_SUCCESS, SESSION_DELETE_KEY_FAILURE],
        endpoint: `/session/keys/${sha}`,
        method: "DELETE",
        schema: Schemas.KEY,
      },
    }).then((action) => {
      if (action.type == SESSION_DELETE_KEY_SUCCESS) {
        dispatch(setMessage(`deleted ssh key: ${name}`));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 3500);
        // return dispatch(push(`/qri`));
      }

      return null;
    });
  };
}
