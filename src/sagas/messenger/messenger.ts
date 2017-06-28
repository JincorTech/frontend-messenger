// TODO Disabled saga

import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork } from 'redux-saga/effects';

// import { Action } from '../../utils/actions';

import { SEND_TEST_MESSAGE } from '../../redux/modules/messenger/messenger';
import matrix from '../../utils/matrix';

/**
 * Send test message
 */

function* sendMessageIterator(): SagaIterator {
  try {
    // yield call([matrix, matrix.sendTextMessage], '!yJBNZGcnZjzVkJoveo:jincor.com', 'JS - сила, PHP - могила');
    const test = yield call([matrix, matrix.getRoom], '!yJBNZGcnZjzVkJoveo');
    yield call(console.log, test);
  } catch (e) {
    yield call(console.error, e);
  }
}

function* sendMessageSaga(): SagaIterator {
  yield takeLatest(
    SEND_TEST_MESSAGE,
    sendMessageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(sendMessageSaga)
  ]);
}
