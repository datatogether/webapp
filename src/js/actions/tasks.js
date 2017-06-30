import { CALL_API } from '../middleware/api';
import Schemas from '../schemas';

import analytics from '../analytics';
import { newLocalModel, updateLocalModel, editModel, removeLocalModel } from './locals';

const blankTask = {
  meta: {
    title: "",
    description: "",
  },
};

const TASK_NEW = "TASK_NEW";
export function newTask(keyId) {
  return newLocalModel(Schemas.TASK, TASK_NEW, Object.assign({}, blankTask, { keyId }));
}

const TASK_EDIT = "TASK_EDIT";
export function editTask(task) {
  return editModel(Schemas.TASK, TASK_EDIT, Object.assign({}, blankTask, task));
}

const TASK_CANCEL_EDIT = "TASK_CANCEL_EDIT";
export function cancelTaskEdit(task) {
  return removeLocalModel(Schemas.TASK, TASK_CANCEL_EDIT, task);
}

const TASK_UPDATE = "TASK_UPDATE";
export function updateTask(task) {
  return updateLocalModel(Schemas.TASK, TASK_UPDATE, task);
}

export const TASKS_FETCH_REQUEST = "TASKS_FETCH_REQUEST";
export const TASKS_FETCH_SUCCESS = "TASKS_FETCH_SUCCESS";
export const TASKS_FETCH_FAILURE = "TASKS_FETCH_FAILURE";

export function fetchTasks(page = 1, pageSize = 25) {
  return {
    [CALL_API]: {
      types: [TASKS_FETCH_REQUEST, TASKS_FETCH_SUCCESS, TASKS_FETCH_FAILURE],
      schema: Schemas.TASK,
      endpoint: '/tasks',
      data: { page, pageSize },
    },
  };
}

export function loadTasks(page = 1, pageSize = 25) {
  return (dispatch) => {
    // TODO - add pagination & pagination check
    return dispatch(fetchTasks(page, pageSize));
  };
}


export const TASK_FETCH_REQUEST = "TASK_FETCH_REQUEST";
export const TASK_FETCH_SUCCESS = "TASK_FETCH_SUCCESS";
export const TASK_FETCH_FAILURE = "TASK_FETCH_FAILURE";

export function fetchTask(id = "") {
  return {
    [CALL_API]: {
      types: [TASK_FETCH_REQUEST, TASK_FETCH_SUCCESS, TASK_FETCH_FAILURE],
      schema: Schemas.TASK_ARRAY,
      endpoint: `/tasks/${id}`,
      data: { id },
    },
  };
}

export function loadTask(id = "") {
  return (dispatch) => {
    // TODO - check for local url copy via getState
    return dispatch(fetchTask(id));
  };
}

export const TASK_SAVE_REQUEST = "TASK_SAVE_REQUEST";
export const TASK_SAVE_SUCCESS = "TASK_SAVE_SUCCESS";
export const TASK_SAVE_FAILURE = "TASK_SAVE_FAILURE";

export function saveTask(task = {}) {
  return (dispatch) => {
    analytics.track(task.id ? "Created Task" : "Saved Task", task);
    return dispatch({
      [CALL_API]: {
        types: [TASK_SAVE_REQUEST, TASK_SAVE_SUCCESS, TASK_SAVE_FAILURE],
        schema: Schemas.TASK,
        method: (task.id == "new") ? "POST" : "PUT",
        endpoint: "/tasks",
        data: task,
      },
    }).then((action) => {
      if (action.type == TASK_SAVE_SUCCESS) {
        cancelTaskEdit(task.keyId, task.subject);
      }
    });
  };
}

export const TASK_DELETE_REQUEST = "TASK_DELETE_REQUEST";
export const TASK_DELETE_SUCCESS = "TASK_DELETE_SUCCESS";
export const TASK_DELETE_FAILURE = "TASK_DELETE_FAILURE";

export function deleteTask(task = {}) {
  analytics.track("Deleted Task", task);
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        types: [TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAILURE],
        schema: Schemas.TASK,
        endpoint: "/tasks",
        method: "DELETE",
        data: task,
      },
    });
  };
}
