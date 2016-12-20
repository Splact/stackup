import { createAction } from 'redux-actions';
import uuid from 'node-uuid';


// define action types
export const PROJECT_CREATE = 'PROJECT_CREATE';
export const PROJECT_UPDATE_INFO = 'PROJECT_UPDATE_INFO';
export const PROJECT_START_TIMER = 'PROJECT_START_TIMER';
export const PROJECT_STOP_TIMER = 'PROJECT_STOP_TIMER';
export const PROJECT_CLEAR = 'PROJECT_CLEAR';


export const create = createAction(PROJECT_CREATE, project => {
  const id = uuid.v4();

  return {
    ...project,
    id,
  };
});
export const update = createAction(PROJECT_UPDATE_INFO, project => project);
export const start = createAction(PROJECT_START_TIMER, id => id);
export const stop = createAction(PROJECT_STOP_TIMER, id => id);
export const clear = createAction(PROJECT_CLEAR, id => id);
