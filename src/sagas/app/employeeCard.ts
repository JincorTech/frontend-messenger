import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { get } from '../../utils/api';

import { OPEN_EMPLOYEE_CARD } from '../../redux/modules/app/employeeCard';

/**
 * Open Employee Card Saga (from matrixId)
 */

function* openEmployeeCardIterator({ payload }: Action<string>): SagaIterator {
  try {
    yield call(get, '');
  } catch (e) {
    yield call(console.error, e);
  }
}

function* openEmployeeCardSaga(): SagaIterator {
  yield takeLatest(
    OPEN_EMPLOYEE_CARD,
    openEmployeeCardIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(openEmployeeCardSaga)
  ]);
}
