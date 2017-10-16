import { SagaIterator } from 'redux-saga';
import { all, takeLatest, call, put, fork } from 'redux-saga/effects';

import { messagesService } from '../../utils/matrix/messagesService';
import { Action } from '../../utils/actions';
import { loadFirstPage, loadNextPage, loadNewMessage } from '../../redux/modules/messenger/messagesArea';

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

function* loadFirstPageIterator({ payload }: Action<string>): SagaIterator {
  try {
    yield call([messagesService, messagesService.initialize], payload);
    yield call([messagesService, messagesService.loadNextPage]);
    
    const messages = yield call([messagesService, messagesService.getMessages]);
    const groupedMessages = groupMessages(messages);

    yield put(loadFirstPage.success(groupedMessages));
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

function* fetchMessagesSaga(): SagaIterator {
  yield takeLatest(
    loadNewMessage.REQUEST,
    loadNewMessageIterator
  );
}

/**
 * Export
 */

export default function*(): SagaIterator {
  yield all([
    fork(loadFirstPageSaga),
    fork(loadNextPageSaga),
    fork(fetchMessagesSaga)
  ]);
}
