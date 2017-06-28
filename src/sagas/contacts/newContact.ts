import { SagaIterator, delay } from 'redux-saga';
import { all, takeEvery, takeLatest, call, put, fork, select } from 'redux-saga/effects';

import { Action } from '../../utils/actions';
import { EMAIL_REGEXP } from '../../utils/validators';
import { request } from '../../utils/search';
import { get, post, del } from '../../utils/api';

import { AddContactReq } from '../../redux/modules/contacts/newContact';

import { openContacts } from '../../redux/modules/contacts/contacts';
import {
  closeNewContact,
  CLOSE_AND_OPEN_CONTACTS,
  searchNewContact,
  CHANGE_SEARCH_QUERY,
  changeStep,
  addContact,
  removeContact
} from '../../redux/modules/contacts/newContact';
import { showLoading, hideLoading, resetLoading } from 'react-redux-loading-bar';

/**
 * New contact back saga
 */

function* backIterator(): SagaIterator {
  try {
    yield put(closeNewContact());
    yield put(openContacts());
  } catch (e) {
    yield call(console.log, e);
  }
}

function* backSaga(): SagaIterator {
  yield takeEvery(
    CLOSE_AND_OPEN_CONTACTS,
    backIterator
  );
}

/**
 * Search saga
 */

const getSearchRequest = state => state.contacts.newContact;

function* searchNewContactIterator(): SagaIterator {
  try {
    const { search: email } = yield select(getSearchRequest);
    const body = request({ email, perPage: 0 });

    if (EMAIL_REGEXP.test(email)) {
      yield put(resetLoading());
      yield call(delay, 600);
      yield put(showLoading());
      const data = yield call(get, `/employee/contacts/search?${body}`);

      if (data.data.length === 0) {
        yield put(searchNewContact.failure());
        yield put(changeStep('not-found'));
      } else {
        yield put(searchNewContact.success(data));
        yield put(changeStep('results'));
      }
    } else {
      yield call(console.log, 'its not email!');
    }
  } catch (e) {
    yield put(searchNewContact.failure(e));
  } finally {
    yield put(hideLoading());
  }
}

function* searchNewContactSaga(): SagaIterator {
  yield takeLatest(
    CHANGE_SEARCH_QUERY,
    searchNewContactIterator
  );
}

/**
 * Add contact saga
 */

function* addContactIterator({ payload }: Action<AddContactReq>): SagaIterator {
  try {
    const { data } = yield call(post, '/employee/contacts', payload);
    yield call(console.log, data);
    yield put(addContact.success(data.id));
  } catch (e) {
    yield put(addContact.failure(e));
  }
}

function* addContactSaga(): SagaIterator {
  yield takeLatest(
    addContact.REQUEST,
    addContactIterator
  );
}

/**
 * Remove contact saga
 */

function* removeContactIterator({ payload }: Action<string>): SagaIterator {
  try {
    const { data } = yield call(del, `/employee/contacts/${payload}`);
    yield put(removeContact.success(data.id));
  } catch (e) {
    yield put(removeContact.failure(e));
  }
}

function* removeContactSaga(): SagaIterator {
  yield takeLatest(
    removeContact.REQUEST,
    removeContactIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(backSaga),
    fork(searchNewContactSaga),
    fork(addContactSaga),
    fork(removeContactSaga)
  ]);
}
