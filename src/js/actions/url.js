import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

export const URL_ARCHIVE_REQUEST = "URL_ARCHIVE_REQUEST";
export const URL_ARCHIVE_SUCCESS = "URL_ARCHIVE_SUCCESS";
export const URL_ARCHIVE_FAILURE = "URL_ARCHIVE_FAILURE";

export function archiveUrl(url = "") {
  return {
    [CALL_API]: {
      types: [URL_ARCHIVE_REQUEST, URL_ARCHIVE_SUCCESS, URL_ARCHIVE_FAILURE],
      schema: Schemas.URL,
      endpoint: '/archive',
      data: {
        url,
      },
    },
  };
}

export const URL_FETCH_REQUEST = "URL_FETCH_REQUEST";
export const URL_FETCH_SUCCESS = "URL_FETCH_SUCCESS";
export const URL_FETCH_FAILURE = "URL_FETCH_FAILURE";

export function fetchUrl(url = "") {
  return {
    [CALL_API]: {
      types: [URL_FETCH_REQUEST, URL_FETCH_SUCCESS, URL_FETCH_FAILURE],
      schema: Schemas.URL,
      endpoint: '/url',
      data: {
        url,
      },
    },
  };
}

export function loadUrl(url = "") {
  return (dispatch) => {
    // TODO - check for local url copy via getState
    return dispatch(fetchUrl(url));
  };
}

export const URL_FETCH_OUTBOUND_LINKS_REQUEST = "URL_FETCH_OUTBOUND_LINKS_REQUEST";
export const URL_FETCH_OUTBOUND_LINKS_SUCCESS = "URL_FETCH_OUTBOUND_LINKS_SUCCESS";
export const URL_FETCH_OUTBOUND_LINKS_FAILURE = "URL_FETCH_OUTBOUND_LINKS_FAILURE";

export function fetchOutboundLinks(url = "") {
  return {
    [CALL_API]: {
      types: [URL_FETCH_OUTBOUND_LINKS_REQUEST, URL_FETCH_OUTBOUND_LINKS_SUCCESS, URL_FETCH_OUTBOUND_LINKS_FAILURE],
      schema: Schemas.LINK_ARRAY,
      endpoint: '/url/links/outbound',
      data: { url },
    },
  };
}

export function loadOutboundLinks(url = "") {
  return (dispatch) => {
    // TODO - check for local url copy
    return dispatch(fetchOutboundLinks(url));
  };
}

export const URL_FETCH_INBOUND_LINKS_REQUEST = "URL_FETCH_INBOUND_LINKS_REQUEST";
export const URL_FETCH_INBOUND_LINKS_SUCCESS = "URL_FETCH_INBOUND_LINKS_SUCCESS";
export const URL_FETCH_INBOUND_LINKS_FAILURE = "URL_FETCH_INBOUND_LINKS_FAILURE";

export function fetchInboundLinks(url = "") {
  return {
    [CALL_API]: {
      types: [URL_FETCH_INBOUND_LINKS_REQUEST, URL_FETCH_INBOUND_LINKS_SUCCESS, URL_FETCH_INBOUND_LINKS_FAILURE],
      schema: Schemas.LINK_ARRAY,
      endpoint: '/url/links/inbound',
      data: { url },
    },
  };
}

export function loadInboundLinks(url = "") {
  return (dispatch) => {
    // TODO - check for local url copy
    return dispatch(fetchInboundLinks(url));
  };
}