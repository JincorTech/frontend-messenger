import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  height: number
  openedRoom: OpenedRoom
  textarea: string,
  membersCache: {
    [matrixId: string]: Member
  }
};

export type OpenedRoom = {
  roomId: string
  name: string
  position: string
  companyName: string
  members: {
    [matrixId: string]: Member
  }
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
};

export type NewMessageNotification = {
  userId: string
  content: string
};

/**
 * Constants
 */

export const UPDATE_DEMENSIONS = 'messenger/messenger/UPDATE_DEMENSIONS';
export const OPEN_ROOM = 'messenger/messenger/OPEN_ROOM';
export const SEND_MESSAGE = 'messenger/messenger/SEND_MESSAGE';
export const FETCH_ROOM = 'messenger/messenger/FETCH_ROOM';
export const FETCH_MEMBER = 'messenger/messenger/FETCH_MEMBER';
export const CHANGE_TEXTAREA = 'messenger/messenger/CHANGE_TEXTAREA';
export const RESET_TEXTAREA = 'messenger/messenger/RESET_TEXTAREA';
export const SHOW_NOTIFICATION = 'messenger/messenger/SHOW_NOTIFICATION';

/**
 * Action creators
 */

export const updateDemensions = createAction<number>(UPDATE_DEMENSIONS);
export const openRoom = createAction<string>(OPEN_ROOM);
export const sendMessage = createAction<void>(SEND_MESSAGE);
export const fetchRoom = createAsyncAction<string, OpenedRoom>(FETCH_ROOM);
export const changeTextarea = createAction<string>(CHANGE_TEXTAREA);
export const resetTextarea = createAction<void>(RESET_TEXTAREA);
export const showNotification = createAction<NewMessageNotification>(SHOW_NOTIFICATION);

/**
 * Reducer
 */

const initialState = from<StateObj>({
  height: 0,
  openedRoom: {
    roomId: '',
    name: '',
    position: '',
    companyName: '',
    members: {}
  },
  textarea: '',
  membersCache: {}
});

export default createReducer<State>({
  [UPDATE_DEMENSIONS]: (state: State, { payload }: Action<number>): State => (
    state.merge({ height: payload })
  ),

  [fetchRoom.SUCCESS]: (state: State, { payload }: Action<any>): State => (
    state.merge({ openedRoom: payload })
  ),

  [SHOW_NOTIFICATION]: (state: State, { payload }: Action<any>): State => {
    return state.merge({ membersCache: payload });
  },

  [CHANGE_TEXTAREA]: (state: State, { payload }: Action<string>): State => (
    state.merge({ textarea: payload })
  ),

  [RESET_TEXTAREA]: (state: State): State => (
    state.merge({ textarea: '' })
  )
}, initialState);
