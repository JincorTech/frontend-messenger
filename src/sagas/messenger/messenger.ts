// TODO Disabled saga

import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork } from 'redux-saga/effects';

import { START_MATRIX } from '../../redux/modules/messenger/messenger';
// import matrix from '../../utils/matrix';

/**
 * Start matrix saga
 */

function* startMatrixIterator() {
  try {
    // yield call([matrixClient, matrixClient.store.startup]);
  } catch (e) {
    yield call(console.log, e);
  } finally {
    // yield call(matrixClient.startClient, opts);
  }
}

function* startMatrixSaga() {
  yield takeLatest(
    START_MATRIX,
    startMatrixIterator
  );
}

/**
 * Test
 */

// export const subscribe = matrix => eventChannel((emit) => {
//   matrix.on('sync', () => matrix.getRooms());
// });

// function* flow(): SagaIterator {
//   try {
//     yield call(console.log, 'success');
//   } catch (e) {
//     yield call(console.log, e);
//   }
// }

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(startMatrixSaga)
  ]);
}
