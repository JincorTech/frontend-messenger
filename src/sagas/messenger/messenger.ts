import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork, put, select } from 'redux-saga/effects';
import { post } from '../../utils/api';
import {
  getMembersIdsFromRoom,
  getMessages,
  membersTransformer,
  removeDomain
} from '../../helpers/matrix';

import { Action } from '../../utils/actions';

import {
  openRoom,
  fetchMessages,
  fetchMembers,
  fetchRoomData,
  resetTextarea,
  SEND_MESSAGE,
  Member as MemberProps
} from '../../redux/modules/messenger/messenger';
import matrix from '../../utils/matrix';

/**
 * Open room saga
 * Fetch members and request roomdata and messages
 */

function* openRoomIterator({ payload: roomId }: Action<string>): SagaIterator {
  try {
    const room = yield call([matrix, matrix.getRoom], roomId);
    const matrixIds = yield call(getMembersIdsFromRoom, room);
    const { data: members } = yield call(post, '/employee/matrix', { matrixIds });
    const storeMembers = yield call(membersTransformer, members);
    yield put(openRoom.success(storeMembers));
    yield put(fetchRoomData({ members, roomId }));
    yield put(fetchMessages());
  } catch (e) {
    yield put(openRoom.failure(e));
  }
}

function* openRoomSaga(): SagaIterator {
  yield takeLatest(
    openRoom.REQUEST,
    openRoomIterator
  );
}

/**
 * Fetch messages saga
 */

const getOpenedRoomId = (state) => state.messenger.messenger.openedRoom.roomId;

function* fetchMessagesIterator(): SagaIterator {
  try {
    const roomId = yield select(getOpenedRoomId);
    const room = yield call([matrix, matrix.getRoom], roomId);
    const messages = yield call(getMessages, room);
    yield put(fetchMessages.success(messages));
  } catch (e) {
    yield put(fetchMessages.failure(e));
  }
}

function* fetchMessagesSaga(): SagaIterator {
  yield [
    takeLatest(
      fetchMessages.REQUEST,
      fetchMessagesIterator
    ),
    takeLatest(
      SEND_MESSAGE,
      fetchMessagesIterator
    )
  ];
}

/**
 * Fetch room data saga
 */

function* fetchRoomDataIterator({ payload }: Action<any>): SagaIterator {
  try {
    const { members, roomId } = payload;

    const anoterGuy = yield call(
      [members, members.reduce],
      (acc, member) => member.matrixId !== removeDomain(matrix.credentials.userId)
        ? Object.assign(acc, member)
        : acc,
      {}
    );

    yield put(fetchRoomData.success({
      roomId,
      name: anoterGuy.name,
      position: anoterGuy.position,
      companyName: anoterGuy.companyName
    }));
  } catch (e) {
    yield put(fetchRoomData.failure(e));
  }
}

function* fetchRoomDataSaga(): SagaIterator {
  yield takeLatest(
    fetchRoomData.REQUEST,
    fetchRoomDataIterator
  );
}

/**
 * Send message saga
 */

const getTextareValue = (state) => state.messenger.messenger.textarea;

function* sendMessageIterator(): SagaIterator {
  try {
    const value = yield select(getTextareValue);

    if (value.trim()) {
      yield put(resetTextarea());
      const roomId = yield select(getOpenedRoomId);
      yield call([matrix, matrix.sendTextMessage], roomId, value);
    }
  } catch (e) {
    yield call(console.error, e);
  }
}

function* sendMessageSaga(): SagaIterator {
  yield takeLatest(
    SEND_MESSAGE,
    sendMessageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(openRoomSaga),
    fork(sendMessageSaga),
    fork(fetchMessagesSaga),
    fork(fetchRoomDataSaga)
  ]);
}
