import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import appSaga from './app/app';
import appLayoutSaga from './app/appLayout';
// import profileCardSaga from './app/profileCard';

export default function*(): SagaIterator {
  yield [
    fork(appSaga),
    fork(appLayoutSaga)
  ];
}
