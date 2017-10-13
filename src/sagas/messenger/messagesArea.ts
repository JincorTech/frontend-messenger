import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import Matrix from 'matrix-js-sdk';
import matrix from '../../utils/matrix';
import { messagesService } from '../../utils/matrix/messagesService';

import { post } from '../../utils/api';
import { removeDomain } from '../../helpers/matrix';

import { Action } from '../../utils/actions';
import { loadPreviousPage } from '../../redux/modules/messenger/messagesArea';

/**
 * Fetch messages saga
 */

function groupMessages(messages): any {
  const result = messages.reduce((acc, d) => {
    if (acc.length === 0) {
      return new Array({
        sender: d.sender,
        messages: [{
          timestamp: d.timestamp,
          content: d.content
        }]
      });
    }

    if (acc[0].sender === d.sender && d.timestamp - acc[0].messages[acc[0].messages.length - 1].timestamp < 60000) {
      const item = {
        ...acc[0],
        messages: acc[0].messages.concat([{
          timestamp: d.timestamp,
          content: d.content
        }])
      };

      const newArr = acc.slice(1);
      return Array.from([item, ...newArr]);
    }

    const item = {
      sender: d.sender,
      messages: [{
        timestamp: d.timestamp,
        content: d.content
      }]
    };

    return [item, ...acc];
  }, []);

  return result.reverse();
}

function* loadPreviousPageIterator({ payload }: Action<string>): SagaIterator {
  try {
    if (messagesService.getLoadedRoomId() !== payload) {
      yield call([messagesService, messagesService.initialize], payload);
    } else {
      yield call([messagesService, messagesService.loadPreviousPage]);
    }

    const messages = yield call([messagesService, messagesService.getMessages]);
    const groupedMessages = groupMessages(messages);

    yield put(loadPreviousPage.success(groupedMessages));
  } catch (e) {
    yield put(loadPreviousPage.failure(e));
  }
}

function* loadPreviousPageSaga(): SagaIterator {
  yield takeLatest(
    loadPreviousPage.REQUEST,
    loadPreviousPageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(loadPreviousPage)
  ]);
}
