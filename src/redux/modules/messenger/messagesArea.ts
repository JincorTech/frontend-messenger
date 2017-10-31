import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  loading: boolean,
  lastReadMessageId: string,
  messagesGroups: MessagesGroup[]
};

export type Message = {
  id: string
  content: string,
  timestamp: number
};

export type MessagesGroup = {
  sender: string,
  messages: Message[]
};

export type LoadFirstPagePayload = {
  lastReadMessageId: string,
  messagesGroups: MessagesGroup[]
};

/**
 * Constants
 */
export const LOAD_FIRST_PAGE = 'messenger/messagesArea/LOAD_FIRST_PAGE';
export const LOAD_NEXT_PAGE = 'messenger/messagesArea/LOAD_NEXT_PAGE';
export const LOAD_NEW_MESSAGE = 'messenger/messagesArea/LOAD_NEW_MESSAGE';
export const CLEAR_MESSAGES = 'messenger/messagesArea/CLEAR_MESSAGES';
export const UPDATE_LAST_READ_MESSAGE = 'messenger/messagesArea/UPDATE_LAST_READ_MESSAGE';

/**
 * Action creators
 */

export const loadFirstPage = createAsyncAction<string, LoadFirstPagePayload>(LOAD_FIRST_PAGE);
export const loadNextPage = createAsyncAction<string, MessagesGroup[]>(LOAD_NEXT_PAGE);
export const loadNewMessage = createAsyncAction<string, MessagesGroup[]>(LOAD_NEW_MESSAGE);
export const clearMessages = createAction<void>(CLEAR_MESSAGES);
export const updateLastReadMessage = createAsyncAction<void, string>(UPDATE_LAST_READ_MESSAGE);

/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  loading: false,
  lastReadMessageId: '',
  messagesGroups: []
});

export default createReducer<State>({
  [loadFirstPage.REQUEST]: (state: State, { payload }: Action<string>): State => (
    state.merge({ loading: true })
  ),

  [loadFirstPage.SUCCESS]: (state: State, { payload }: Action<LoadFirstPagePayload>): State => (
    state.merge({ messagesGroups: payload.messagesGroups, loading: false, lastReadMessageId: payload.lastReadMessageId })
  ),

  [loadFirstPage.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ loading: false })
  ),

  [loadNextPage.REQUEST]: (state: State): State => (
    state.merge({ loading: true })
  ),

  [loadNextPage.SUCCESS]: (state: State, { payload }: Action<MessagesGroup[]>): State => (
    state.merge({ messagesGroups: payload, loading: false })
  ),

  [loadNextPage.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ loading: false })
  ),

  [loadNewMessage.REQUEST]: (state: State): State => (
    state.merge({ loading: true })
  ),

  [loadNewMessage.SUCCESS]: (state: State, { payload }: Action<MessagesGroup[]>): State => (
    state.merge({ messagesGroups: payload, loading: false })
  ),

  [loadNewMessage.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ loading: false })
  ),

  [CLEAR_MESSAGES]: (state: State): State => (
    state.merge({ messagesGroups: [] })
  ),

  [updateLastReadMessage.SUCCESS]: (state: State, { payload }: Action<any>): State => (
    state.merge({ lastReadMessageId: payload })
  )
}, initialState);
