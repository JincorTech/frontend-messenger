import { createReducer, createAsyncAction, createAction, Action } from '../../../utils/actions';
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
    timestamp: number,
  }]
};

/**
 * Constants
 */

export const LOAD_PREVIOUS_PAGE = 'messenger/messagesArea/LOAD_PREVIOUS_PAGE';

/**
 * Action creators
 */

export const loadPreviousPage = createAsyncAction<string, MessagesGroup[]>(LOAD_PREVIOUS_PAGE);

/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  loading: false,
  messages: []
});

export default createReducer<State>({
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
