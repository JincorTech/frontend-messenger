import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import matrix from '../../utils/matrix';
import { post } from '../../utils/api';

import { Action } from '../../utils/actions';
import {
  fetchRooms,
  selectRoom,
  createRoom,
  openRoom,
  OUTSIDE_SELECT_ROOM,
  SELECT_ROOM,
  CREATE_ROOM,
  OPEN_ROOM
} from '../../redux/modules/messenger/rooms';
import { fetchRoom } from '../../redux/modules/messenger/messenger';

import {
  createAlias,
  getIdsFromRooms,
  createRooms,
  addDomain,
  restoreMatrixId
} from '../../helpers/matrix';

/**
 * SELECT_ROOM (id)
 * if room exist
 * OPEN_ROOM (id)
 * else
 * CREATE_ROOM
 */

/**
 * Fetch rooms saga
 */

function* fetchRoomsIterator(): SagaIterator {
  try {
    const matrixRooms = yield call([matrix, matrix.getRooms]);
    const matrixIds = yield call(getIdsFromRooms, matrixRooms);
    if (matrixIds.length > 0) {
      const { data } = yield call(post, '/employee/matrix', { matrixIds });
      yield put(fetchRooms.success(createRooms(matrixRooms, data)));
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
 * Try to open room outside app
 * @param {string} payload clear matrix id (without dot symbols)
 * 1. Validation matrix id (onfail - show error)
 * 2. Restore id
 * 3. Select room
 */

function* outsideSelectRoomIterator({ payload }: Action<string>): SagaIterator {
  try {
    const matrixId = yield call(restoreMatrixId, payload);
    yield put(selectRoom(matrixId));
  } catch (e) {
    yield call(console.error, e);
  }
}

function* outsideSelectRoomSaga(): SagaIterator {
  yield takeLatest(
    OUTSIDE_SELECT_ROOM,
    outsideSelectRoomIterator
  );
}

/**
 * Select room saga
 * @param {string} payload another guy matrixId
 * 1. Create alias
 * 2. If alias exist we get room.id and put openRoom action
 */

function* selectRoomIterator({ payload }: Action<string>): SagaIterator {
  try {
    const userId = matrix.credentials.userId;
    const domain = yield call([matrix, matrix.getDomain]);
    const alias = yield call(createAlias, userId, payload, domain);
    const room = yield call([matrix, matrix.getRoomIdForAlias], alias);
    yield put(openRoom(room.room_id));
  } catch (e) {
    yield put(createRoom(payload));
  }
}

function* selectRoomSaga(): SagaIterator {
  yield takeLatest(
    SELECT_ROOM,
    selectRoomIterator
  );
}

/**
 * Create room saga
 * @param {string} payload another guy matrixId
 * 1. Create alias
 * 2. Create room with that alias
 */

function* createRoomIterator({ payload }: Action<string>): SagaIterator {
  try {
    const userId = matrix.credentials.userId;
    const domain = yield call([matrix, matrix.getDomain]);
    const alias = yield call(createAlias, userId, payload, domain);

    const options = {
      visibility: 'private',
      invite: [addDomain(payload)],
      name: '',
      topic: ''
    };

    const room = yield call([matrix, matrix.createRoom], options);
    yield call([matrix, matrix.createAlias], alias, room.room_id);
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.join_rules', { join_rules: 'private' });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.guest_access', { guest_access: 'forbidden' });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.may_join', { may_join: [userId, addDomain(payload)] });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.public_history', { public_history: false });
    // yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.power_levels', {});
    yield put(openRoom(room.room_id));
  } catch (e) {
    yield call(console.error, e);
  }
}

function* createRoomSaga(): SagaIterator {
  yield takeLatest(
    CREATE_ROOM,
    createRoomIterator
  );
}

/**
 * Open room saga
 * @param {string} payload roomId
 * 1. Store opened room id
 * 2. Put fetchRoom action
 */

function* openRoomIterator({ payload: roomId }: Action<string>): SagaIterator {
  try {
    // try to get room. If room doesnt exist catch the error
    const room = yield call([matrix, matrix.getRoom], roomId);
    yield put(fetchRoom(room.roomId));
  } catch (e) {
    yield call(console.error, e);
  }
}

function* openRoomSaga(): SagaIterator {
  yield takeLatest(
    OPEN_ROOM,
    openRoomIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(fetchRoomsSaga),
    fork(outsideSelectRoomSaga),
    fork(selectRoomSaga),
    fork(createRoomSaga),
    fork(openRoomSaga)
  ]);
}
