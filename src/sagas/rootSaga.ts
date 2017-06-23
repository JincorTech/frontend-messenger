import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';
import appLayoutSaga from './app/appLayout';
import profileCardSaga from './app/profileCard';

import contactsSaga from './contacts/contacts';
import newContactSaga from './contacts/newContact';

import messengerSaga from './messenger/messenger';
import roomsSaga from './messenger/rooms';

export default function*(): SagaIterator {
  yield all([
    fork(appSaga),
    fork(appLayoutSaga),
    fork(formActionSaga),
    fork(profileCardSaga),

    fork(contactsSaga),
    fork(newContactSaga),

    fork(messengerSaga),
    fork(roomsSaga)
  ]);
}
