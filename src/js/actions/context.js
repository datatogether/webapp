import { CALL_API } from '../middleware/api';
import { Schemas } from '../schemas';

export const CONTEXT_SAVE_REQUEST = "CONTEXT_SAVE_REQUEST"
export const CONTEXT_SAVE_SUCCESS = "CONTEXT_SAVE_SUCCESS"
export const CONTEXT_SAVE_FAILURE = "CONTEXT_SAVE_FAILURE"

export function saveContext(context) {
  return {
    [CALL_API] : {
      types : [CONTEXT_SAVE_REQUEST, CONTEXT_SAVE_SUCCESS, CONTEXT_SAVE_FAILURE],
      schema : Schemas.CONTEXT,
      data : context,
    }
  }
}