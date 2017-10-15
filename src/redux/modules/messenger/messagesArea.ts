import { createReducer, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  loading: boolean,
  messages: MessagesGroup[]
};

export type MessagesGroup = {
  sender: string,
  messages: [{
    content: string,
    timestamp: number
  }]
};

/**
 * Constants
 */

export const LOAD_PREVIOUS_PAGE = 'messenger/messagesArea/LOAD_PREVIOUS_PAGE';
export const LOAD_NEXT_MESSAGE = 'messenger/messagesArea/LOAD_NEXT_MESSAGE';

/**
 * Action creators
 */

export const loadPreviousPage = createAsyncAction<string, MessagesGroup[]>(LOAD_PREVIOUS_PAGE);
export const loadNextMessage = createAsyncAction<string, MessagesGroup[]>(LOAD_NEXT_MESSAGE);

/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  loading: false,
  messages: []
});

export default createReducer<State>({
  [loadNextMessage.REQUEST]: (state: State, { payload }: Action<string>): State => (
    state.merge({ loading: true })
  ),

  [loadNextMessage.SUCCESS]: (state: State, { payload }: Action<MessagesGroup[]>): State => (
    state.merge({ messages: payload, loading: false })
  ),

  [loadNextMessage.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ loading: false })
  ),

  [loadPreviousPage.REQUEST]: (state: State, { payload }: Action<string>): State => (
    state.merge({ loading: true })
  ),

  [loadPreviousPage.SUCCESS]: (state: State, { payload }: Action<MessagesGroup[]>): State => (
    state.merge({ messages: payload, loading: false })
  ),

  [loadPreviousPage.FAILURE]: (state: State, { payload }: Action<any>): State => (
    state.merge({ loading: false })
  )
}, initialState);
