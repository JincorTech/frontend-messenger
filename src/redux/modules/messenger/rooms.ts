import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  searchable: boolean
  resultsVisible: boolean
  list: any[]
  searchResults: any[]
};

export type Room = {
  type: 'dialog' | 'group' | 'channel' | 'inquiry'
  id: string
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
export const SHOW_SEARCH_RESULTS = 'messenger/dialogs/SHOW_SEARCH_RESULTS';
export const HIDE_SEARCH_RESULTS = 'messenger/dialogs/HIDE_SEARCH_RESULTS';

export const FETCH_ROOMS = 'messenger/dialogs/FETCH_ROOMS';

/**
 * Action creators
 */

export const showSearchInput = createAction<void>(SHOW_SEARCH_INPUT);
export const hideSearchInput = createAction<void>(HIDE_SEARCH_INPUT);
export const showSearchResults = createAction<void>(SHOW_SEARCH_RESULTS);
export const hideSearchResults = createAction<void>(HIDE_SEARCH_RESULTS);

export const fetchRooms = createAsyncAction<void, void>(FETCH_ROOMS);

/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  searchable: false,
  resultsVisible: false,
  list: [],
  searchResults: []
});

// Потом здесь нужно отчистить resultsVisible.
// Чтобы точно не потерять я использую
// наше особоe стоп-слово - console.log() :)

export default createReducer<State>({
  [SHOW_SEARCH_INPUT]: (state: State): State => (
    state.merge({ searchable: true, resultsVisible: true })
  ),

  [HIDE_SEARCH_INPUT]: (state: State): State => (
    state.merge({ searchable: false, resultsVisible: false })
  ),

  [SHOW_SEARCH_RESULTS]: (state: State): State => (
    state.merge({ resultsVisible: true })
  ),

  [HIDE_SEARCH_RESULTS]: (state: State): State => (
    state.merge({ resultsVisible: false })
  ),

  [fetchRooms.SUCCESS]: (state: State, { payload }: Action<string>): State => (
    state.merge({ list: payload })
  )
}, initialState);
