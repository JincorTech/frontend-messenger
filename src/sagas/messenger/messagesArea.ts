import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';

import { messagesService } from '../../utils/matrix/messagesService';
import { Action } from '../../utils/actions';
import {
  loadFirstPage,
  loadNextPage,
  loadNewMessage,
  clearMessages,
  updateLastReadMessage
} from '../../redux/modules/messenger/messagesArea';

/**
 * Fetch messages saga
 */

function groupMessages(messages): any {
  const oneMinute = 60000;

  const result = messages.reduce((acc, message) => {
    if (acc.length === 0) {
      return new Array({
        sender: message.sender,
        messages: [{
          id: message.id,
          timestamp: message.timestamp,
          content: message.content
        }]
      });
    }

    if (acc[0].sender === message.sender && message.timestamp - acc[0].messages[acc[0].messages.length - 1].timestamp < oneMinute) {
      const item = {
        ...acc[0],
        messages: acc[0].messages.concat([{
          id: message.id,
          timestamp: message.timestamp,
          content: message.content
        }])
      };

      const newArr = acc.slice(1);
      return Array.from([item, ...newArr]);
    }

    const item = {
      sender: message.sender,
      messages: [{
        id: message.id,
        timestamp: message.timestamp,
        content: message.content
      }]
    };

    return [item, ...acc];
  }, []);

  return result.reverse();
}

function* loadFirstPageIterator({ payload }: Action<string>): SagaIterator {
  try {
    yield put(clearMessages());

    yield call([messagesService, messagesService.initialize], payload);
    yield call([messagesService, messagesService.loadNextPage]);

    const messages = yield call([messagesService, messagesService.getMessages]);
    const groupedMessages = groupMessages(messages);

    const lastReadMessageId = yield call([messagesService, messagesService.getLastReadMessageId]);

    yield put(loadFirstPage.success({ messagesGroups: groupedMessages, lastReadMessageId: lastReadMessageId }));
  } catch (e) {
    yield put(loadFirstPage.failure(e));
  }
}

function* loadFirstPageSaga(): SagaIterator {
  yield takeLatest(
    loadFirstPage.REQUEST,
    loadFirstPageIterator
  );
}

function* loadNextPageIterator(): SagaIterator {
  try {
    yield call([messagesService, messagesService.loadNextPage]);

    const messages = yield call([messagesService, messagesService.getMessages]);
    const groupedMessages = groupMessages(messages);

    yield put(loadNextPage.success(groupedMessages));
  } catch (e) {
    yield put(loadNextPage.failure(e));
  }
}

function* loadNextPageSaga(): SagaIterator {
  yield takeLatest(
    loadNextPage.REQUEST,
    loadNextPageIterator
  );
}

function* loadNewMessageIterator(): SagaIterator {
  try {
    yield call([messagesService, messagesService.loadNewMessage]);

    const messages = yield call([messagesService, messagesService.getMessages]);
    const groupedMessages = groupMessages(messages);

    yield put(loadNewMessage.success(groupedMessages));
  } catch (e) {
    yield put(loadNewMessage.failure(e));
  }
}

function* loadNewMessageSaga(): SagaIterator {
  yield takeLatest(
    loadNewMessage.REQUEST,
    loadNewMessageIterator
  );
}

function* updateLastReadMessageIterator(): SagaIterator {
  const lastReadMessageId = yield call([messagesService, messagesService.getLastReadMessageId]);
  yield put(updateLastReadMessage.success(lastReadMessageId));
}

function* updateLastReadMessageSaga(): SagaIterator {
  yield takeLatest(
    updateLastReadMessage.REQUEST,
    updateLastReadMessageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(loadFirstPageSaga),
    fork(loadNextPageSaga),
    fork(loadNewMessageSaga),
    fork(updateLastReadMessageSaga)
  ]);
}
