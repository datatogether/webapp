import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

import { selectMetadata, metadataId } from '../selectors/metadata';
import { newLocalModel, updateLocalModel, editModel, removeLocalModel } from './locals';

const blankMetadata = {
  title: "",
  description: "",
};

const METADATA_NEW = "METADATA_NEW";
export function newMetadata(userId, subjectHash) {
  return newLocalModel(Schemas.METADATA, METADATA_NEW, Object.assign({}, blankMetadata, { userId, subjectHash }));
}

const METADATA_EDIT = "METADATA_EDIT";
export function editMetadata(metadata) {
  return editModel(Schemas.METADATA, METADATA_EDIT, Object.assign({}, blankMetadata, metadata));
}

const METADATA_CANCEL_EDIT = "METADATA_CANCEL_EDIT";
export function cancelMetadataEdit(metadata) {
  return removeLocalModel(Schemas.METADATA, METADATA_CANCEL_EDIT, metadataId(metadata));
}

const METADATA_UPDATE = "METADATA_UPDATE";
export function updateMetadata(metadata) {
  return updateLocalModel(Schemas.METADATA, METADATA_UPDATE, metadata);
}

export const METADATA_REQUEST = 'METADATA_REQUEST';
export const METADATA_SUCCESS = 'METADATA_SUCCESS';
export const METADATA_FAILURE = 'METADATA_FAILURE';

export function fetchMetadata(userId, subjectHash) {
  return {
    [CALL_API]: {
      types: [METADATA_REQUEST, METADATA_SUCCESS, METADATA_FAILURE],
      endpoint: `/metadata/${userId}/${subjectHash}`,
      schema: Schemas.METADATA,
      data: { userId, subjectHash },
    },
  };
}

export function loadMetadata(userId, hash, requiredFields = []) {
  return (dispatch, getState) => {
    const metadata = selectMetadata(getState(), userId, hash);
    if (metadata && requiredFields.every(key => Object.prototype.hasOwnProperty(metadata, key))) {
      return null;
    }

    return dispatch(fetchMetadata(userId, hash, requiredFields));
  };
}

export const METADATA_SAVE_REQUEST = "METADATA_SAVE_REQUEST";
export const METADATA_SAVE_SUCCESS = "METADATA_SAVE_SUCCESS";
export const METADATA_SAVE_FAILURE = "METADATA_SAVE_FAILURE";

export function saveMetadata(metadata = {}) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [METADATA_SAVE_REQUEST, METADATA_SAVE_SUCCESS, METADATA_SAVE_FAILURE],
        schema: Schemas.METADATA,
        endpoint: "/metadata",
        data: metadata,
      },
    }).then((action) => {
      console.log("huh?");
      cancelMetadataEdit(metadata.userId, metadata.subjectHash);
    });
  };
}
