import { combineReducers } from 'redux';
import paginate from './paginate';

import {
  SOURCES_FETCH_REQUEST,
  SOURCES_FETCH_SUCCESS,
  SOURCES_FETCH_FAILURE,

  SOURCE_URLS_REQUEST,
  SOURCE_URLS_SUCCESS,
  SOURCE_URLS_FAILURE,

  SOURCE_ATTRIBUTED_URLS_REQUEST,
  SOURCE_ATTRIBUTED_URLS_SUCCESS,
  SOURCE_ATTRIBUTED_URLS_FAILURE,
} from '../actions/source';

import {
  CONTENT_RECENT_URLS_REQUEST,
  CONTENT_RECENT_URLS_SUCCESS,
  CONTENT_RECENT_URLS_FAILURE,
} from '../actions/content';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  sources: paginate({
    mapActionToKey: action => "created",
    types: [
      SOURCES_FETCH_REQUEST,
      SOURCES_FETCH_SUCCESS,
      SOURCES_FETCH_FAILURE,
    ],
  }),

  sourceUndescribedUrls: paginate({
    mapActionToKey: action => action.id,
    types: [
      SOURCE_URLS_REQUEST,
      SOURCE_URLS_SUCCESS,
      SOURCE_URLS_FAILURE,
    ],
  }),

  sourceAttributedUrls: paginate({
    mapActionToKey: action => action.id,
    types: [
      SOURCE_ATTRIBUTED_URLS_REQUEST,
      SOURCE_ATTRIBUTED_URLS_SUCCESS,
      SOURCE_ATTRIBUTED_URLS_FAILURE,
    ],
  }),

  contentRecentUrls: paginate({
    mapActionToKey: action => "created",
    types: [
      CONTENT_RECENT_URLS_REQUEST,
      CONTENT_RECENT_URLS_SUCCESS,
      CONTENT_RECENT_URLS_FAILURE,
    ]
  }),
});

export default pagination;
