import * as ActionTypes from '../actions/app';

const initialState = {
  sshKeys: {},
  groups: {},
  messages: {},
  metadata: {},
  collections: {},
};

// updates an entity cache in response to any actuion with response.local.
// see local middleware
export default function locals(state = initialState, action) {
  if (action.locals && action.locals.entities) {
    // TODO - WARNING - horrible hack for demo. 
    if (action.type === ActionTypes.REMOVE_MODEL || action.type === "METADATA_CANCEL_EDIT") {
      // console.log(action);
      // const newState = Object.assign({}, state);
      // newState[action.schema.getKey()] = Object.assign({}, newState[action.schema.getKey()]);
      // delete newState[action.schema.getKey()][action.id];
      return initialState;
      // return newState;
    }

    return Object.assign({}, state, action.locals.entities);
  }

  return state;
}
