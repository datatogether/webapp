import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

import analytics from '../analytics';
import { selectMetadata } from '../selectors/metadata';

export const COMMUNITY_USERS_REQUEST = "COMMUNITY_USERS_REQUEST";
export const COMMUNITY_USERS_SUCCESS = "COMMUNITY_USERS_SUCCESS";
export const COMMUNITY_USERS_FAILURE = "COMMUNITY_USERS_FAILURE";

export function fetchCommunityUsers(key, page = 1, pageSize = 25) {
  return ({
    [CALL_API]: {
      types: [COMMUNITY_USERS_REQUEST, COMMUNITY_USERS_SUCCESS, COMMUNITY_USERS_FAILURE],
      schema: Schemas.USER_ARRAY,
      endpoint: `/communities/${key}/users`,
      data: { key, page, pageSize },
      key,
      page,
      pageSize,
    },
  });
}

export function loadMetadataByKey(key, page = 1, pageSize = 25) {
  return (dispatch) => {
    // TODO - add pagination & pagination check
    return dispatch(fetchCommunityUsers(key, page, pageSize));
  };
}