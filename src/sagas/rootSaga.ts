import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';
import appLayoutSaga from './app/appLayout';
import profileCardSaga from './app/profileCard';

export default function*(): SagaIterator {
  yield all([
    fork(appSaga),
    fork(appLayoutSaga),
    fork(formActionSaga),
    fork(profileCardSaga)
  ]);
}
