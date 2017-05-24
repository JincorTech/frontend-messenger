import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, fork } from 'redux-saga/effects';

import { get } from '../../utils/api';

import { fetchUser } from '../../redux/modules/app/appLayout';

/**
 * Fetch user saga
 */
function* fetchUserIterator(): SagaIterator {
  try {
    const { data } = yield call(get, '/employee/me');
    yield put(fetchUser.success(data));
  } catch (e) {
    yield put(fetchUser.failure(e));
  }
}

function* fetchUserSaga(): SagaIterator {
  yield takeLatest(
    fetchUser.REQUEST,
    fetchUserIterator
  );
}

/**
 * App Layout saga
 */
export default function*(): SagaIterator {
  yield [
    fork(fetchUserSaga)
  ];
}
