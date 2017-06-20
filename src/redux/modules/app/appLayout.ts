import { createReducer, createAction, Action, createAsyncAction } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  user: User
  sidebarOpen: boolean
};

export type User = {
  id: string
  profile: UserProfile
  contacts: UserContacts
  company: UserCompany
};

export type UserProfile = {
  name: string
  firstName: string
  lastName: string
  position: string
  avatar?: string
};

export type UserContacts = {
  email: string
  phone?: string
};

export type UserCompany = {
  id: string
  legalName: string
  profile: {
    country: {
      id: string
      name: string
    },
    formattedAddress: string
    type: string
    picture: string
  }
};

/**
 * Constants
 */
export const OPEN_SIDEBAR = 'app/appLayout/OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'app/appLayout/CLOSE_SIDEBAR';
export const FETCH_USER = 'app/appLayout/FETCH_USER';

/**
 * Action creators
 */
export const openSidebar = createAction<void>(OPEN_SIDEBAR);
export const closeSidebar = createAction<void>(CLOSE_SIDEBAR);
export const fetchUser = createAsyncAction<void, User>(FETCH_USER);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  sidebarOpen: false,
  user: {
    id: '',
    profile: {
      name: '',
      firstName: '',
      lastName: '',
      position: '',
      avatar: ''
    },
    contacts: {
      email: '',
      phone: ''
    },
    company: {
      id: '',
      legalName: '',
      profile: {
        country: {
          id: '',
          name: ''
        },
        formattedAddress: '',
        type: '',
        picture: ''
      }
    }
  }
});

export default createReducer<State>({
  [OPEN_SIDEBAR]: (state: State): State => (
    state.merge({ sidebarOpen: true })
  ),

  [CLOSE_SIDEBAR]: (state: State): State => (
    state.merge({ sidebarOpen: false })
  ),

  [LOCATION_CHANGE]: (state: State): State => (
    state.merge({ sidebarOpen: false })
  ),

  [fetchUser.SUCCESS]: (state: State, { payload }: Action<User>): State => (
    state.merge({ user: payload })
  )
}, initialState);
