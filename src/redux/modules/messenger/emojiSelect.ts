import { createReducer, createAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  currentGroup: string
  open: boolean
  scrollPosition: string
};

/**
 * Constants
 */
export const OPEN_DROPDOWN = 'messenger/emojiSelect/OPEN_DROPDOWN';
export const CLOSE_DROPDOWN = 'messenger/emojiSelect/CLOSE_DROPDOWN';
export const SET_CURRENT_GROUP = 'messenger/emojiSelect/SET_CURRENT_GROUP';
export const SCROLL_TO = 'messenger/emojiSelect/SCROLL_TO';

/**
 * Action Creators
 */
export const openDropdown = createAction<void>(OPEN_DROPDOWN);
export const closeDropdown = createAction<void>(CLOSE_DROPDOWN);
export const setCurrentGroup = createAction<string>(SET_CURRENT_GROUP);
export const scrollTo = createAction<string>(SCROLL_TO);

/**
 * Create Reducer
 */
const initialState: State = from<StateObj>({
  currentGroup: 'nature',
  open: false,
  scrollPosition: ''
});

export default createReducer<State>({
  [SET_CURRENT_GROUP]: (state: State, { payload }: Action<string>): State => (
    state.merge({
      currentGroup: payload
    })
  ),

  [OPEN_DROPDOWN]: (state: State): State => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_DROPDOWN]: (state: State): State => (
    state.merge({
      open: false
    })
  ),

  [SCROLL_TO]: (state: State, { payload: groupName }: Action<string>): State => (
    state.merge({
      scrollPosition: groupName
    })
  )
}, initialState);
