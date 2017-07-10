import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';

import { removeToken, setToken, getToken, isAuth, getUserId } from '../../utils/auth';
import { Action } from '../../utils/actions';

import matrix from '../../utils/matrix';

import {
  login,
  setAuthState
} from '../../redux/modules/app/app';

import {
  LOGOUT,
  LOGIN,
  CHECK_AUTH
} from '../../redux/modules/app/app';

/**
 * Check auth
 */
function* checkAuthIterator(): SagaIterator {
  const auth = yield call(isAuth);

  if (auth) {
    const token = yield call(getToken);
    yield put(login(token));
  } else {
    yield put(setAuthState({ authorized: false, token: '', login: '' }));
  }
}

function* checkAuthSaga(): SagaIterator {
  yield takeLatest(
    CHECK_AUTH,
    checkAuthIterator
  );
}

/**
 * Logout saga
 */
function* logoutIterator(): SagaIterator {
  yield call(removeToken);
  yield put(setAuthState({ authorized: false, token: '', login: '' }));
  yield call([matrix.store, matrix.store.deleteAllData]);
  yield call([window.location, window.location.replace], '/cmp/auth/signin');
}

function* logoutSaga(): SagaIterator {
  yield takeLatest(
    LOGOUT,
    logoutIterator
  );
}

/**
 * Login saga
 */
function* loginIterator({ payload: token }: Action<string>): SagaIterator {
  yield call(setToken, token);
  const login = yield call(getUserId);
  yield put(setAuthState({ authorized: true, token, login }));
}

function* loginSaga(): SagaIterator {
  yield takeLatest(
    LOGIN,
    loginIterator
  );
}

/**
 * App saga
 */
export default function*(): SagaIterator {
  yield all([
    fork(loginSaga),
    fork(logoutSaga),
    fork(checkAuthSaga)
  ]);
}
