import { createAction } from 'redux-actions';
import uuid from 'node-uuid';


// define action types
export const PROJECT_CREATE = 'PROJECT_CREATE';
export const PROJECT_UPDATE_INFO = 'PROJECT_UPDATE_INFO';
export const PROJECT_START_TIMER = 'PROJECT_START_TIMER';
export const PROJECT_STOP_TIMER = 'PROJECT_STOP_TIMER';
export const PROJECT_CHANGE_PICTURE = 'PROJECT_CHANGE_PICTURE';
export const PROJECT_CLEAR = 'PROJECT_CLEAR';
export const PROJECT_DISCARD = 'PROJECT_DISCARD';
export const PROJECT_PIN = 'PROJECT_PIN';
export const PROJECT_UNPIN = 'PROJECT_UNPIN';


export const create = createAction(PROJECT_CREATE, project => {
  const id = uuid.v4();

  return {
    ...project,
    id,
  };
});
export const changePicture = createAction(PROJECT_CHANGE_PICTURE, id => id);
export const update = createAction(PROJECT_UPDATE_INFO, project => project);
export const start = createAction(PROJECT_START_TIMER, id => id);
export const stop = createAction(PROJECT_STOP_TIMER, id => id);
export const clear = createAction(PROJECT_CLEAR, id => id);
export const discard = createAction(PROJECT_DISCARD, id => id);
export const pin = createAction(PROJECT_PIN, id => id);
export const unpin = createAction(PROJECT_UNPIN, id => id);
