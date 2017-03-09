import { CALL_API } from '../middleware/api';
import { Schemas } from '../schemas';

import { selectMetadata } from '../selectors/metadata';
import { newLocalModel, updateLocalModel, editLocalModel, removeLocalModel } from './locals';

const METADATA_NEW = "METADATA_NEW";
export function newMetadata(userId, subjectId) {
  return newLocalModel(Schemas.METADATA, METADATA_NEW, { userId, subjectId });
}

const METADATA_EDIT = "METADATA_EDIT";
export function editMetadata(metadata) {
  return editLocalModel(Schemas.METADATA, METADATA_EDIT, metadata);
}

const METADATA_CANCEL_EDIT = "METADATA_CANCEL_EDIT";
export function cancelMetadataEdit(id) {
  return removeLocalModel(Schemas.METADATA, METADATA_CANCEL_EDIT, id);
}

const METADATA_UPDATE = "METADATA_UPDATE";
export function updateMetadata(metadata) {
  return updateLocalModel(Schemas.METADATA, METADATA_UPDATE, metadata);
}

export const METADATA_REQUEST = 'METADATA_REQUEST';
export const METADATA_SUCCESS = 'METADATA_SUCCESS';
export const METADATA_FAILURE = 'METADATA_FAILURE';

export function fetchMetadata(address) {
  return {
    [CALL_API]: {
      types: [METADATA_REQUEST, METADATA_SUCCESS, METADATA_FAILURE],
      endpoint: `/datasets?address=${address}`,
      schema: Schemas.METADATA,
      address,
    },
  };
}

export function loadMetadata(address, requiredFields = []) {
  return (dispatch, getState) => {
    const dataset = selectMetadata(getState(), address);
    if (dataset.schema != null) {
      return null;
    }
    // if (dataset && requiredFields.every(key => dataset.hasOwnProperty(key))) {
    //   return null;
    // }

    return dispatch(fetchMetadata(address, requiredFields));
  };
}


export const METADATA_SAVE_REQUEST = "METADATA_SAVE_REQUEST";
export const METADATA_SAVE_SUCCESS = "METADATA_SAVE_SUCCESS";
export const METADATA_SAVE_FAILURE = "METADATA_SAVE_FAILURE";

export function saveMetadata(metadata = {}) {
  return {
    [CALL_API]: {
      types: [METADATA_SAVE_REQUEST, METADATA_SAVE_SUCCESS, METADATA_SAVE_FAILURE],
      schema: Schemas.METADATA,
      endpoint: "/metadata",
      data: metadata,
    },
  };
}
