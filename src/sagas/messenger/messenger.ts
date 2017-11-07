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
  SEND_MESSAGE
} from '../../redux/modules/messenger/messenger';
import matrix from '../../utils/matrix';
import { clearMessages } from '../../redux/modules/messenger/messagesArea';

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

// /**
//  * Fetch Room saga
//  * @param {string} payload matrix room id
//  */

// function* fetchRoomIterator({ payload }: Action<string>): SagaIterator {
//   try {
//     const room = yield call([matrix, matrix.getRoom], payload);
//     const members = yield call([room.currentState, room.currentState.getMembers]);
//     const matrixIds = yield call(getMembersIds, members);
//     const { data } = yield call(post, '/employee/matrix', { matrixIds });
//     const storeMembers = yield call(membersTransformer, data);
//     const anotherGuyId = yield call(getAnotherGuyId, storeMembers);

//     const result = {
//       id: payload,
//       name: storeMembers[anotherGuyId].name,
//       position: storeMembers[anotherGuyId].position,
//       companyName: storeMembers[anotherGuyId].companyName,
//       members: storeMembers
//     };

//     yield put(fetchRoomMembers.success(result));
//   } catch (e) {
//     yield put(fetchRoomMembers.failure(e));
//   }
// }

// function* fetchRoomSaga(): SagaIterator {
//   yield takeLatest(
//     fetchRoomMembers.REQUEST,
//     fetchRoomIterator
//   );
// }

// /**
//  * Open room saga
//  * @param {string} payload roomId
//  * 1. Store opened room id
//  * 2. Put fetchRoom action
//  */

// function* openRoomIterator({ payload: roomId }: Action<string>): SagaIterator {
//   try {
//     // try to get room. If room doesnt exist catch the error
//     const room = yield call([matrix, matrix.getRoom], roomId);
//     yield put(clearMessages());
//     yield put(fetchRoomMembers(room.roomId));
//   } catch (e) {
//     yield call(console.error, e);
//   }
// }

// function* openRoomSaga(): SagaIterator {
//   yield takeLatest(
//     OPEN_ROOM,
//     openRoomIterator
//   );
// }

/**
 * Send message saga
 */

const getOpenedRoomId = (state) => state.messenger.messenger.openedRoomId;
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
    fork(sendMessageSaga),
    fork(fetchRoomsSaga)
  ]);
}
