import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { PROJECT_CREATE, update } from '../actions/project';
import Vibrant from 'node-vibrant';
import getRandomPictureUrl from '../libs/randomPictureUrl';

// Handlers Sagas
function* handleProjectCreation({ payload }) {
  const { id } = payload;
  try {
    const { url, color } = yield call(getRandomPictureUrl);

    yield put(update({ id, picture: url, color }));
  } catch (e) {
    console.error(`Error during picture definition for project {${id}}`, e);
  }
}

// Watchers Sagas
function* watchProjectCreation() {
  yield* takeEvery(PROJECT_CREATE, handleProjectCreation);
}

// Composed saga
export default function* watchers() {
  yield [
    watchProjectCreation(),
  ];
}
