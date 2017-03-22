import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

export const SUBPRIMERS_FETCH_REQUEST = "SUBPRIMERS_FETCH_REQUEST";
export const SUBPRIMERS_FETCH_SUCCESS = "SUBPRIMERS_FETCH_SUCCESS";
export const SUBPRIMERS_FETCH_FAILURE = "SUBPRIMERS_FETCH_FAILURE";

export function fetchSubprimers(page = 1, pageSize = 25) {
  return {
    [CALL_API]: {
      types: [SUBPRIMERS_FETCH_REQUEST, SUBPRIMERS_FETCH_SUCCESS, SUBPRIMERS_FETCH_FAILURE],
      schema: Schemas.SUBPRIMER,
      endpoint: '/subprimers',
      data: { page, pageSize },
    },
  };
}

export function loadSubprimers(page = 1, pageSize = 25) {
  return (dispatch) => {
    // TODO - add pagination & pagination check
    return dispatch(fetchSubprimers(page, pageSize));
  };
}


export const SUBPRIMER_FETCH_REQUEST = "SUBPRIMER_FETCH_REQUEST";
export const SUBPRIMER_FETCH_SUCCESS = "SUBPRIMER_FETCH_SUCCESS";
export const SUBPRIMER_FETCH_FAILURE = "SUBPRIMER_FETCH_FAILURE";

export function fetchSubprimer(id = "") {
  return {
    [CALL_API]: {
      types: [SUBPRIMER_FETCH_REQUEST, SUBPRIMER_FETCH_SUCCESS, SUBPRIMER_FETCH_FAILURE],
      schema: Schemas.SUBPRIMER_ARRAY,
      endpoint: `/subprimers/${id}`,
      data: { id },
    },
  };
}

export function loadSubprimer(id = "") {
  return (dispatch) => {
    // TODO - check for local url copy via getState
    return dispatch(fetchSubprimer(id));
  };
}

export const SUBPRIMER_URLS_REQUEST = "SUBPRIMER_URLS_REQUEST";
export const SUBPRIMER_URLS_SUCCESS = "SUBPRIMER_URLS_SUCCESS";
export const SUBPRIMER_URLS_FAILURE = "SUBPRIMER_URLS_FAILURE";

export function fetchSubprimerUrls(id = "", page = 1, pageSize = 200) {
  return {
    [CALL_API]: {
      types: [SUBPRIMER_URLS_REQUEST, SUBPRIMER_URLS_SUCCESS, SUBPRIMER_URLS_FAILURE],
      schema: Schemas.SUBPRIMER_ARRAY,
      endpoint: `/primers/${id}/urls`,
      data: { id, page, pageSize },
      id,
      page,
      pageSize,
    },
  };
}

export function loadSubprimerUrls(id = "", page = 1, pageSize = 200) {
  return (dispatch) => {
    // TODO - check pagination
    return dispatch(fetchSubprimerUrls(id, page, pageSize));
  };
}

export const SUBPRIMER_ATTRIBUTED_URLS_REQUEST = "SUBPRIMER_ATTRIBUTED_URLS_REQUEST";
export const SUBPRIMER_ATTRIBUTED_URLS_SUCCESS = "SUBPRIMER_ATTRIBUTED_URLS_SUCCESS";
export const SUBPRIMER_ATTRIBUTED_URLS_FAILURE = "SUBPRIMER_ATTRIBUTED_URLS_FAILURE";

export function fetchSubprimerAttributedUrls(id = "", page = 1, pageSize = 200) {
  return {
    [CALL_API]: {
      types: [SUBPRIMER_ATTRIBUTED_URLS_REQUEST, SUBPRIMER_ATTRIBUTED_URLS_SUCCESS, SUBPRIMER_ATTRIBUTED_URLS_FAILURE],
      schema: Schemas.SUBPRIMER_ARRAY,
      endpoint: `/primers/${id}/urls/attributed`,
      data: { id, page, pageSize },
      id,
      page,
      pageSize,
    },
  };
}

export function loadSubprimerAttributedUrls(id = "", page = 1, pageSize = 200) {
  return (dispatch) => {
    // TODO - check pagination
    return dispatch(fetchSubprimerAttributedUrls(id, page, pageSize));
  };
}
