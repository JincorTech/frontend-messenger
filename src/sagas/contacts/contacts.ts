import { SagaIterator } from 'redux-saga';
import { all, takeLatest, takeEvery, call, put, fork } from 'redux-saga/effects';

import { get } from '../../utils/api';

import {
  fetchContacts,
  closeContacts,
  CLOSE_AND_OPEN_NEW_CONTACT
} from '../../redux/modules/contacts/contacts';
import {
  openNewContact,
  addContact,
  removeContact
} from '../../redux/modules/contacts/newContact';

/**
 * Fetch contacts
 */

function* fetchContactsIterator(): SagaIterator {
  try {
    const data = yield call(get, '/employee/contacts');
    yield put(fetchContacts.success(data));
  } catch (e) {
    yield put(fetchContacts.failure(e));
  }
}

function* fetchContactsSaga(): SagaIterator {
  yield [
    takeLatest(
      fetchContacts.REQUEST,
      fetchContactsIterator
    ),
    takeLatest(
      addContact.SUCCESS,
      fetchContactsIterator
    ),
    takeLatest(
      removeContact.SUCCESS,
      fetchContactsIterator
    )
  ];
}

/**
 * Close Contacts and open NewContact popup saga
 */

function* closeAndOpenNewContactIterator(): SagaIterator {
  try {
    yield put(closeContacts());
    yield put(openNewContact());
  } catch (e) {
    yield call(console.log, e);
  }
}

function* closeAndOpenNewContactSaga(): SagaIterator {
  yield takeEvery(
    CLOSE_AND_OPEN_NEW_CONTACT,
    closeAndOpenNewContactIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(fetchContactsSaga),
    fork(closeAndOpenNewContactSaga)
  ]);
}
