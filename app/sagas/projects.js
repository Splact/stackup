import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { PROJECT_CREATE, PROJECT_CHANGE_PICTURE, update } from '../actions/project';
import getRandomPictureUrl from '../libs/randomPictureUrl';

// Handlers Sagas
function* handleProjectPictureChange({ payload }) {
  const id = payload.id || payload;

  if (!id) {
    return;
  }

  try {
    const { url, color } = yield call(getRandomPictureUrl);

    yield put(update({ id, picture: url, color }));
  } catch (e) {
    console.error(`Error during picture definition for project {${id}}`, e);
  }
}

// Watchers Sagas
function* watchProjectCreation() {
  yield* takeEvery(PROJECT_CREATE, handleProjectPictureChange);
}
function* watchProjectChangePicture() {
  yield* takeEvery(PROJECT_CHANGE_PICTURE, handleProjectPictureChange);
}

// Composed saga
export default function* watchers() {
  yield [
    watchProjectCreation(),
    watchProjectChangePicture(),
  ];
}
