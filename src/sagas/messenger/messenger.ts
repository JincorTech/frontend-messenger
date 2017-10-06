import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, fork, put, select } from 'redux-saga/effects';
import { success } from 'react-notification-system-redux';
import _ from 'lodash';
import { post } from '../../utils/api';
import {
  membersTransformer,
  getMembersIds,
  removeDomain,
  getAnotherGuyId
} from '../../helpers/matrix';

import { Action } from '../../utils/actions';

import {
  fetchRoom,
  resetTextarea,
  SEND_MESSAGE,
  showNotification,
  NewMessageNotification
} from '../../redux/modules/messenger/messenger';
import matrix from '../../utils/matrix';

/**
 * Fetch Room saga
 * @param {string} payload matrix room id
 */

function* fetchRoomIterator({ payload }: Action<string>): SagaIterator {
  try {
    const room = yield call([matrix, matrix.getRoom], payload);
    const members = yield call([room.currentState, room.currentState.getMembers]);
    const matrixIds = yield call(getMembersIds, members);
    const { data } = yield call(post, '/employee/matrix', { matrixIds });
    const storeMembers = yield call(membersTransformer, data);
    const anotherGuyId = yield call(getAnotherGuyId, storeMembers);

    const result = {
      roomId: payload,
      name: storeMembers[anotherGuyId].name,
      position: storeMembers[anotherGuyId].position,
      companyName: storeMembers[anotherGuyId].companyName,
      members: storeMembers
    };

    yield put(fetchRoom.success(result));
  } catch (e) {
    yield put(fetchRoom.failure(e));
  }
}

function* fetchRoomSaga(): SagaIterator {
  yield takeLatest(
    fetchRoom.REQUEST,
    fetchRoomIterator
  );
}

/**
 * Show notification saga
 * @param {string} payload.userId matrix user id
 * @param {string} payload.content notification text
 */

const getMembersCache = (state) => state.messenger.messenger.membersCache;

function* showNotificationIterator({ payload }: Action<NewMessageNotification>): SagaIterator {
  try {
    const membersCache = yield select(getMembersCache);
    const memberId = removeDomain(payload.userId);
    let member = membersCache[memberId];

    if (!member) {
      const matrixIds = [memberId];
      const { data } = yield call(post, '/employee/matrix', { matrixIds });
      const storeMembers = yield call(membersTransformer, data);
      member = storeMembers[memberId];
    }

    yield put(success({
      title: _.template(payload.title)({ 'name': member ? member.name : '' }),
      message: payload.message,
      position: payload.position,
      autoDismiss: payload.autoDismiss
    }));

    yield put(showNotification.success(member));
  } catch (e) {
    yield put(showNotification.failure(e));
  }
}

function* showNotificationSaga(): SagaIterator {
  yield takeLatest(
    showNotification.REQUEST,
    showNotificationIterator
  );
}

/**
 * Send message saga
 */

const getOpenedRoomId = (state) => state.messenger.messenger.openedRoom.roomId;
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
    fork(fetchRoomSaga),
    fork(sendMessageSaga),
    fork(showNotificationSaga)
  ]);
}
