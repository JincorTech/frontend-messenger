import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  searchable: boolean
  search: string
  list: Room[]
};

export type Room = {
  type: string
  id: string
  userId: string
  src?: string
  title: string
  timestamp: string
  unreadIn: boolean
  unreadOut: boolean
  last: string
  preview: string
};

/**
 * Constants
 */

export const SHOW_SEARCH_INPUT = 'messenger/dialogs/SHOW_SEARCH_INPUT';
export const HIDE_SEARCH_INPUT = 'messenger/dialogs/HIDE_SEARCH_INPUT';
export const CHANGE_SEARCH_QUERY = 'messenger/dialogs/CHANGE_SEARCH_QUERY';
export const RESET_SEARCH_QUERY = 'messenger/dialogs/RESET_SEARCH_QUERY';

export const FETCH_ROOMS = 'messenger/dialogs/FETCH_ROOMS';
export const SELECT_ROOM = 'messenger/dialogs/SELECT_ROOM';
export const CREATE_ROOM = 'messenger/dialogs/CREATE_ROOM';
export const OPEN_ROOM = 'messenger/dialogs/OPEN_ROOM';

/**
 * Action creators
 */

export const showSearchInput = createAction<void>(SHOW_SEARCH_INPUT);
export const hideSearchInput = createAction<void>(HIDE_SEARCH_INPUT);
export const changeSearchQuery = createAction<string>(CHANGE_SEARCH_QUERY);
export const resetSearchQuery = createAction<void>(RESET_SEARCH_QUERY);

export const fetchRooms = createAsyncAction<void, Room[]>(FETCH_ROOMS);
export const selectRoom = createAction<string>(SELECT_ROOM);
export const createRoom = createAction<string>(CREATE_ROOM);
export const openRoom = createAction<string>(OPEN_ROOM);

/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  searchable: false,
  search: '',
  list: []
});

export default createReducer<State>({
  [SHOW_SEARCH_INPUT]: (state: State): State => (
    state.merge({ searchable: true })
  ),

  [HIDE_SEARCH_INPUT]: (state: State): State => (
    state.merge({ searchable: false })
  ),

  [CHANGE_SEARCH_QUERY]: (state: State, { payload }: Action<string>): State => (
    state.merge({ search: payload })
  ),

  [RESET_SEARCH_QUERY]: (state: State): State => (
    state.merge({ search: '', searchable: false })
  ),

  [fetchRooms.SUCCESS]: (state: State, { payload }: Action<Room[]>): State => (
    state.merge({ list: payload })
  )
}, initialState);
