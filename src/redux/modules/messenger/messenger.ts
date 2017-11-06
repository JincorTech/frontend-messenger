import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  height: number
  rooms: Room[]
  users: User[]
  openedRoomId: string
  textarea: string
};

export type Room = {
  id: string
  type: string
  userId: string
  src?: string
  title: string
  timestamp: string
  unreadIn: boolean
  unreadOut: boolean
  last: string
  preview: string
};

export type User = {
  id: string
  email: string
  name: string
  firstName: string
  lastName: string
  avatar: string
  position: string
  companyId: string
  companyName: string
  companyLogo: string
};

export type MessageGroup = {
  sender: string
  timestamp: any
  content: string
};

/**
 * Constants
 */

export const UPDATE_DEMENSIONS = 'messenger/messenger/UPDATE_DEMENSIONS';
export const OPEN_ROOM = 'messenger/messenger/OPEN_ROOM';
export const SEND_MESSAGE = 'messenger/messenger/SEND_MESSAGE';
export const FETCH_ROOMS = 'messenger/messenger/FETCH_ROOMS';
export const CHANGE_TEXTAREA = 'messenger/messenger/CHANGE_TEXTAREA';
export const RESET_TEXTAREA = 'messenger/messenger/RESET_TEXTAREA';

/**
 * Action creators
 */

export const updateDemensions = createAction<number>(UPDATE_DEMENSIONS);
export const openRoom = createAction<string>(OPEN_ROOM);
export const sendMessage = createAction<void>(SEND_MESSAGE);
export const fetchRooms = createAsyncAction<void, { rooms: Room[], users: User[] }>(FETCH_ROOMS);
export const changeTextarea = createAction<string>(CHANGE_TEXTAREA);
export const resetTextarea = createAction<void>(RESET_TEXTAREA);

/**
 * Reducer
 */

const initialState = from<StateObj>({
  height: 0,
  rooms: [],
  users: [],
  openedRoomId: '',
  textarea: ''
});

export default createReducer<State>({
  [UPDATE_DEMENSIONS]: (state: State, { payload }: Action<number>): State => (
    state.merge({ height: payload })
  ),

  [fetchRooms.SUCCESS]: (state: State, { payload }: Action<{ rooms: Room[], users: User[] }>): State => (
    state.merge({
      rooms: payload.rooms,
      users: payload.users
    })
  ),

  [CHANGE_TEXTAREA]: (state: State, { payload }: Action<string>): State => (
    state.merge({ textarea: payload })
  ),

  [RESET_TEXTAREA]: (state: State): State => (
    state.merge({ textarea: '' })
  ),

  [OPEN_ROOM]: (state: State, { payload }: Action<string>): State => (
    state.merge({ openedRoomId: payload })
  )
}, initialState);
