import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

import { selectMetadata, metadataId } from '../selectors/metadata';
import { newLocalModel, updateLocalModel, editModel, removeLocalModel } from './locals';

const blankMetadata = {
  meta: {
    title: "",
    description: "",
  },
};

const METADATA_NEW = "METADATA_NEW";
export function newMetadata(keyId, subject) {
  return newLocalModel(Schemas.METADATA, METADATA_NEW, Object.assign({}, blankMetadata, { keyId, subject }));
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

export function fetchMetadata(keyId, subject) {
  return {
    [CALL_API]: {
      types: [METADATA_REQUEST, METADATA_SUCCESS, METADATA_FAILURE],
      endpoint: `/metadata/${keyId}/${subject}`,
      schema: Schemas.METADATA,
      data: { keyId, subject },
    },
  };
}

export function loadMetadata(keyId, subject, requiredFields = []) {
  return (dispatch, getState) => {
    const metadata = selectMetadata(getState(), keyId, subject);
    if (metadata && requiredFields.every(key => Object.prototype.hasOwnProperty.call(metadata, key))) {
      return null;
    }

    return dispatch(fetchMetadata(keyId, subject, requiredFields));
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
      if (action.type == METADATA_SUCCESS) {
        cancelMetadataEdit(metadata.keyId, metadata.subject);
      }
    });
  };
}
