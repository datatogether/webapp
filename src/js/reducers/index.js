import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';

import * as ActionTypes from '../actions/app';

import pagination from './pagination';
// import sessionReducer from './session';
import layoutReducer from './layout';
import coverageReducer from './coverage';
import appReducer from './app';
import locals from './locals';
import urlStates from './urlStates';
import selectionReducer from './selection';

const initialEntitiesState = {
  session: {
    // "edgi" : { username: "EDGI", id: "edgi", type: "community", homeUrl: "https://envirodatagov.com", description: "The Environmental Data & Governance Initiative (EDGI) is an international network of academics and non-profits addressing potential threats to federal environmental and energy policy, and to the scientific research infrastructure built to investigate, inform, and enforce. Dismantling this infrastructure -- which ranges from databases to satellites to models for climate, air, and water -- could imperil the public's right to know, the United States' standing as a scientific leader, corporate accountability, and environmental protection.", profilePhotoUrl: "https://avatars0.githubusercontent.com/u/24626991?v=3&s=200" },        
  },
  keys: {},
  users: {
  },

  groups: {},

  primers: {},
  sources: {},
  urls: {},
  links: {},

  content: {},
  metadata: {},
  consensus: {},
  collections: {},
  
  tasks: {},

  uncrawlables: {
    // TODO - wut
    "1" : { id : "1", url : "https://epa.gov/uncrawlable" },
    "2" : { id : "2", url : "https://epa.gov/def/not/crawlable" },
  },

  searchResults: {},

  pagination: {},
};

// Updates an entity cache in response to any action with response.entities.
// see api middleware
function entities(state = initialEntitiesState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  if (action.type === ActionTypes.REMOVE_MODEL) {
    const newState = merge({}, state);
    newState[action.schema.getKey()] = merge({}, newState[action.schema.getKey()]);
    delete newState[action.schema.getKey()][action.id];
    return newState;
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, silentError } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error && !silentError) {
    return error;
  }

  return state;
}

function statusMessage(state = null, action) {
  const { type, message } = action;

  if (type === ActionTypes.RESET_MESSAGE) {
    return null;
  } else if (message) {
    return message;
  }

  return state;
}

const rootReducer = combineReducers({
  entities,
  locals,
  app: appReducer,
  layout: layoutReducer,
  coverage: coverageReducer,
  selection: selectionReducer,
  pagination,
  urlStates,
  routing,
  errorMessage,
  statusMessage,
});

export default rootReducer;
