import { USERS_API } from '../middleware/users';
import Schemas from '../schemas';
import { selectUserByUsername } from '../selectors/user';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [USERS_API]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: `/users/${login}`,
      schema: Schemas.USER,
    },
  };
}

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
    const user = getState().entities.users[login];
    if (user && requiredFields.every(key => Object.prototype.hasOwnProperty.call(user, key))) {
      return null;
    }

    return dispatch(fetchUser(login));
  };
}

export function fetchUserByUsername(username) {
  return {
    [USERS_API]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: `/users?username=${username}`,
      schema: Schemas.USER,
    },
  };
}

export function loadUserByUsername(username, requiredFields = []) {
  return (dispatch, getState) => {
    const user = selectUserByUsername(getState(), username);
    if (user && requiredFields.every(key => Object.prototype.hasOwnProperty.call(user, key))) {
      return null;
    }

    return dispatch(fetchUserByUsername(username));
  };
}

export const USERS_SEARCH_REQUEST = 'USERS_SEARCH_REQUEST';
export const USERS_SEARCH_SUCCESS = 'USERS_SEARCH_SUCCESS';
export const USERS_SEARCH_FAILURE = 'USERS_SEARCH_FAILURE';

export function usersSearch(query) {
  return {
    [USERS_API]: {
      types: [USERS_SEARCH_REQUEST, USERS_SEARCH_SUCCESS, USERS_SEARCH_FAILURE],
      endpoint: `/search?q=${query}`,
      schema: Schemas.USER_ARRAY,
    }
  }
}

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export function fetchUsers(userType, page = 1, pageSize = 50) {
  return {
    [USERS_API]: {
      types: [USERS_SEARCH_REQUEST, USERS_SEARCH_SUCCESS, USERS_SEARCH_FAILURE],
      endpoint: `/users?type=${userType}&page=${page}&page_size=${pageSize}`,
      schema: Schemas.USER_ARRAY,
    }
  }
}

export function loadUsers(userType, page = 1, pageSize = 50) {
  return (dispatch, getState) => {
    // TODO - prevent overfetching
    return dispatch(fetchUsers(userType, page, pageSize));
  }
}