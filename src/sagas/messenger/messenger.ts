import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork, put, select } from 'redux-saga/effects';
import { post } from '../../utils/api';
import {
  membersTransformer,
  getMembersIds,
  getAnotherGuyId,
  getIdsFromRooms,
  createRooms,
  createUsers,
  removeDomain
} from '../../helpers/matrix';

import { Action } from '../../utils/actions';

import {
  fetchRooms,
  resetTextarea,
  sendMessage
} from '../../redux/modules/messenger/messenger';
import matrix from '../../utils/matrix';

/**
 * Fetch rooms saga
 */

function* fetchRoomsIterator(): SagaIterator {
  try {
    const matrixRooms = yield call([matrix, matrix.getRooms]);
    const matrixIds = yield call(getIdsFromRooms, matrixRooms);
    if (matrixIds.length > 0) {
      const { data: usersData } = yield call(post, '/employee/matrix', { matrixIds: [...matrixIds, removeDomain(matrix.credentials.userId)] });
      const users = createUsers(usersData);
      yield put(fetchRooms.success({
        rooms: createRooms(matrixRooms, users),
        users: users
      }));
    }
  } catch (e) {
    yield put(fetchRooms.failure(e));
  }
}

function* fetchRoomsSaga(): SagaIterator {
  yield takeLatest(
    fetchRooms.REQUEST,
    fetchRoomsIterator
  );
}

/**
 * Send message saga
 */

const getOpenedRoomId = (state) => state.messenger.messenger.openedRoomId;
const getTextareValue = (state) => state.messenger.messenger.textarea;

function* sendMessageIterator(): SagaIterator {
  try {
    const value: string = yield select(getTextareValue);
    const roomId: string = yield select(getOpenedRoomId);

    if (value.trim()) {
      yield put(resetTextarea());
      yield call([matrix, matrix.sendTextMessage], roomId, value);
    }

    yield put(sendMessage.success({ roomId, text: value.trim() }));
  } catch (e) {
    yield put(sendMessage.failure(e));
  }
}

function* sendMessageSaga(): SagaIterator {
  yield takeLatest(
    sendMessage.REQUEST,
    sendMessageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(sendMessageSaga),
    fork(fetchRoomsSaga)
  ]);
}
