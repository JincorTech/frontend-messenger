import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  height: number
  openedRoom: OpenedRoom
  members: {
    [matrixId: string]: Member
  }
  messages: MessageGroup[]
  textarea: string
};

export type OpenedRoom = {
  roomId: string
  name: string
  position: string
  companyName: string
};

export type Member = {
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

export type OpenRoomRes = {
  openedRoom: OpenedRoom
  members: Member[]
  messages: MessageGroup[]
};

/**
 * Constants
 */

export const UPDATE_DEMENSIONS = 'messenger/messenger/UPDATE_DEMENSIONS';
export const OPEN_ROOM = 'messenger/messenger/OPEN_ROOM';
export const SEND_MESSAGE = 'messenger/messenger/SEND_MESSAGE';

export const FETCH_MESSAGES = 'messenger/messenger/FETCH_MESSAGES';
export const FETCH_MEMBERS = 'messenger/messenger/FETCH_MEMBERS';
export const FETCH_ROOM_DATA = 'messenger/messenger/FETCH_ROOM_DATA';

export const CHANGE_TEXTAREA = 'messenger/messenger/CHANGE_TEXTAREA';
export const RESET_TEXTAREA = 'messenger/messenger/RESET_TEXTAREA';

/**
 * Action creators
 */

export const updateDemensions = createAction<number>(UPDATE_DEMENSIONS);
export const openRoom = createAsyncAction<string, any>(OPEN_ROOM);
export const sendMessage = createAction<void>(SEND_MESSAGE);

export const fetchMessages = createAsyncAction<string, MessageGroup[]>(FETCH_MESSAGES);
export const fetchMembers = createAsyncAction<string, any>(FETCH_MEMBERS);
export const fetchRoomData = createAsyncAction<any, OpenedRoom>(FETCH_ROOM_DATA);

export const changeTextarea = createAction<string>(CHANGE_TEXTAREA);
export const resetTextarea = createAction<void>(RESET_TEXTAREA);

/**
 * Reducer
 */

const initialState = from<StateObj>({
  height: 0,
  openedRoom: {
    roomId: '',
    name: '',
    position: '',
    companyName: ''
  },
  members: {},
  messages: [],
  textarea: ''
});

export default createReducer<State>({
  [UPDATE_DEMENSIONS]: (state: State, { payload }: Action<number>): State => (
    state.merge({ height: payload })
  ),

  [openRoom.SUCCESS]: (state: State, { payload }: Action<any>): State => (
    state.merge({ members: payload })
  ),

  [fetchMessages.SUCCESS]: (state: State, { payload }: Action<MessageGroup[]>): State => (
    state.merge({ messages: payload })
  ),

  [fetchRoomData.SUCCESS]: (state: State, { payload }: Action<OpenedRoom>): State => (
    state.merge({ openedRoom: payload })
  ),

  [CHANGE_TEXTAREA]: (state: State, { payload }: Action<string>): State => (
    state.merge({ textarea: payload })
  ),

  [RESET_TEXTAREA]: (state: State): State => (
    state.merge({ textarea: '' })
  )
}, initialState);
