import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { Action } from '../../utils/actions';
import { fetchRooms } from '../../redux/modules/messenger/rooms';
import matrix from '../../utils/matrix';

import { rooms } from '../../helpers/matrix/fetchRooms';

/**
 * Fetch rooms saga
 */

function* fetchRoomsIterator({ payload }: Action<string>): SagaIterator {
  try {
    const data = yield call([matrix, matrix.getRooms]);
    // const idsArray = yield call([data, data.map], (room) => room.roomId);
    yield call(console.log, data);
    yield put(fetchRooms.success(rooms(data)));
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
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(fetchRoomsSaga)
  ]);
}
