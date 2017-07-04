import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import matrix from '../../utils/matrix';
import { createAlias } from '../../helpers/matrix';
import { post } from '../../utils/api';

import { Action } from '../../utils/actions';
import {
  fetchRooms,
  createRoom,
  selectRoom
} from '../../redux/modules/messenger/rooms';
import { openRoom } from '../../redux/modules/messenger/messenger';

import { getAnotherGuyId, createRooms, addDomain } from '../../helpers/matrix';

/**
 * Fetch rooms saga
 */

function* fetchRoomsIterator({ payload }: Action<string>): SagaIterator {
  try {
    const matrixRooms = yield call([matrix, matrix.getRooms]);
    yield call(console.log, matrixRooms);
    const matrixIds = yield call(getAnotherGuyId, matrixRooms);
    if (matrixIds.length > 0) {
      const { data } = yield call(post, '/employee/matrix', { matrixIds });
      yield call(console.log, data);
      yield put(fetchRooms.success(createRooms(matrixRooms, data)));
    } else {
      yield call(console.log, 'no rooms');
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
 * Select room saga
 */

function* selectRoomIterator({ payload }: Action<string>): SagaIterator {
  const userId = matrix.credentials.userId;
  const domain = yield call([matrix, matrix.getDomain]);
  const alias = yield call(createAlias, userId, payload, domain);

  try {
    const room = yield call([matrix, matrix.getRoomIdForAlias], alias);
    yield put(openRoom(room.room_id));
  } catch (e) {
    yield call(console.log, 'creating room...');
    yield put(createRoom(payload));
  }
}

function* selectRoomSaga(): SagaIterator {
  yield takeLatest(
    selectRoom.REQUEST,
    selectRoomIterator
  );
}

/**
 * Create room saga
 */

function* createRoomIterator({ payload }: Action<string>): SagaIterator {
  const userId = matrix.credentials.userId;
  const domain = yield call([matrix, matrix.getDomain]);
  const alias = yield call(createAlias, userId, payload, domain);

  const options = {
    visibility: 'private',
    invite: [addDomain(payload)],
    name: 'set room name :)',
    topic: ''
  };

  const privateRoomPower = {
    ban: 100,
    kick: 100,
    invite: 100,
    redact: 100
  };

  try {
    const room = yield call([matrix, matrix.createRoom], options);
    yield call([matrix, matrix.createAlias], alias, room.room_id);
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.join_rules', { join_rules: 'private' });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.guest_access', { guest_access: 'forbidden' });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.may_join', { may_join: [userId, addDomain(payload)] });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.public_history', { public_history: false });
    yield call([matrix, matrix.sendStateEvent], room.room_id, 'm.room.power_levels', { power_levels: privateRoomPower });
    yield call(console.log, `room ${room.room_id} created`);
    yield put(createRoom.success());
  } catch (e) {
    yield put(createRoom.failure(e));
  }
}

function* createRoomSaga(): SagaIterator {
  yield takeLatest(
    createRoom.REQUEST,
    createRoomIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(fetchRoomsSaga),
    fork(selectRoomSaga),
    fork(createRoomSaga)
  ]);
}
