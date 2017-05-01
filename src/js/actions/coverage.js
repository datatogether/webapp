import { COVERAGE_API } from '../middleware/coverage';
import { selectNode } from '../selectors/coverage';

export const COVERAGE_NODE_REQUEST = 'COVERAGE_NODE_REQUEST';
export const COVERAGE_NODE_SUCCESS = 'COVERAGE_NODE_SUCCESS';
export const COVERAGE_NODE_FAILURE = 'COVERAGE_NODE_FAILURE';

export function fetchNode(id) {
  return {
    [COVERAGE_API] : {
      types : [COVERAGE_NODE_REQUEST,COVERAGE_NODE_SUCCESS,COVERAGE_NODE_FAILURE],
      endpoint : `/tree/${id}`,
      data: { id },
    }
  }
}

export function loadNode(id) {
  return ((dispatch, getState) => {
    const node = selectNode(getState(), id)
    if (node && node.children && node.children.length == node.numChildren) {
      return null;
    }

    return dispatch(fetchNode(id));
  });
}