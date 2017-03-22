import { combineReducers } from 'redux';
import paginate from './paginate';

import {
  SUBPRIMER_URLS_REQUEST,
  SUBPRIMER_URLS_SUCCESS,
  SUBPRIMER_URLS_FAILURE,

  SUBPRIMER_ATTRIBUTED_URLS_REQUEST,
  SUBPRIMER_ATTRIBUTED_URLS_SUCCESS,
  SUBPRIMER_ATTRIBUTED_URLS_FAILURE,
} from '../actions/subprimer';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  subprimerUndescribedUrls: paginate({
    mapActionToKey: action => action.id,
    types: [
      SUBPRIMER_URLS_REQUEST,
      SUBPRIMER_URLS_SUCCESS,
      SUBPRIMER_URLS_FAILURE,
    ],
  }),

  subprimerAttributedUrls: paginate({
    mapActionToKey: action => action.id,
    types: [
      SUBPRIMER_ATTRIBUTED_URLS_REQUEST,
      SUBPRIMER_ATTRIBUTED_URLS_SUCCESS,
      SUBPRIMER_ATTRIBUTED_URLS_FAILURE,
    ],
  }),
});

export default pagination;
