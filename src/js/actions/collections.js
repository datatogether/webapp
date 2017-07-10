import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

import analytics from '../analytics';
import { newLocalModel, updateLocalModel, editModel, removeLocalModel } from './locals';

const blankCollection = {
  title: "",
  description: "",
  schema: ["hash","url","description"],
  contents: [],
};

const COLLECTION_NEW = "COLLECTION_NEW";
export function newCollection(keyId) {
  return newLocalModel(Schemas.COLLECTION, COLLECTION_NEW, Object.assign({}, blankCollection, { keyId }));
}

const COLLECTION_EDIT = "COLLECTION_EDIT";
export function editCollection(collection) {
  return editModel(Schemas.COLLECTION, COLLECTION_EDIT, Object.assign({}, blankCollection, collection));
}

const COLLECTION_CANCEL_EDIT = "COLLECTION_CANCEL_EDIT";
export function cancelCollectionEdit(collection) {
  return removeLocalModel(Schemas.COLLECTION, COLLECTION_CANCEL_EDIT, collection);
}

const COLLECTION_UPDATE = "COLLECTION_UPDATE";
export function updateCollection(collection) {
  return updateLocalModel(Schemas.COLLECTION, COLLECTION_UPDATE, collection);
}

export const COLLECTIONS_FETCH_REQUEST = "COLLECTIONS_FETCH_REQUEST";
export const COLLECTIONS_FETCH_SUCCESS = "COLLECTIONS_FETCH_SUCCESS";
export const COLLECTIONS_FETCH_FAILURE = "COLLECTIONS_FETCH_FAILURE";

export function fetchCollections(page = 1, pageSize = 25) {
  return {
    [CALL_API]: {
      types: [COLLECTIONS_FETCH_REQUEST, COLLECTIONS_FETCH_SUCCESS, COLLECTIONS_FETCH_FAILURE],
      schema: Schemas.COLLECTION,
      endpoint: '/collections',
      data: { page, pageSize },
    },
  };
}

export function loadCollections(page = 1, pageSize = 25) {
  return (dispatch) => {
    // TODO - add pagination & pagination check
    return dispatch(fetchCollections(page, pageSize));
  };
}


export const COLLECTION_FETCH_REQUEST = "COLLECTION_FETCH_REQUEST";
export const COLLECTION_FETCH_SUCCESS = "COLLECTION_FETCH_SUCCESS";
export const COLLECTION_FETCH_FAILURE = "COLLECTION_FETCH_FAILURE";

export function fetchCollection(id = "") {
  return {
    [CALL_API]: {
      types: [COLLECTION_FETCH_REQUEST, COLLECTION_FETCH_SUCCESS, COLLECTION_FETCH_FAILURE],
      schema: Schemas.COLLECTION_ARRAY,
      endpoint: `/collections/${id}`,
      data: { id },
    },
  };
}

export function loadCollection(id = "") {
  return (dispatch) => {
    // TODO - check for local url copy via getState
    return dispatch(fetchCollection(id));
  };
}

export const COLLECTION_SAVE_REQUEST = "COLLECTION_SAVE_REQUEST";
export const COLLECTION_SAVE_SUCCESS = "COLLECTION_SAVE_SUCCESS";
export const COLLECTION_SAVE_FAILURE = "COLLECTION_SAVE_FAILURE";

export function saveCollection(collection = {}) {
  return (dispatch) => {
    analytics.track(collection.id ? "Created Collection" : "Saved Collection", collection);
    return dispatch({
      [CALL_API]: {
        types: [COLLECTION_SAVE_REQUEST, COLLECTION_SAVE_SUCCESS, COLLECTION_SAVE_FAILURE],
        schema: Schemas.COLLECTION,
        method: (collection.id == "new") ? "POST" : "PUT",
        endpoint: "/collections",
        data: (collection.id != "new") ? {collection} : { collection: Object.assign({}, collection, { id : "" }) },
      },
    }).then((action) => {
      if (action.type == COLLECTION_SAVE_SUCCESS) {
        cancelCollectionEdit(collection.keyId, collection.subject);
      }
    });
  };
}

export const COLLECTION_DELETE_REQUEST = "COLLECTION_DELETE_REQUEST";
export const COLLECTION_DELETE_SUCCESS = "COLLECTION_DELETE_SUCCESS";
export const COLLECTION_DELETE_FAILURE = "COLLECTION_DELETE_FAILURE";

export function deleteCollection(collection = {}) {
  analytics.track("Deleted Collection", collection);
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [COLLECTION_DELETE_REQUEST, COLLECTION_DELETE_SUCCESS, COLLECTION_DELETE_FAILURE],
        schema: Schemas.COLLECTION,
        endpoint: "/collections",
        method: "DELETE",
        data: collection,
      },
    });
  };
}
