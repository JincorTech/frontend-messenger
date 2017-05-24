import { createReducer, createAction, createSubmitAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  open: boolean
  bottomView: BottomView
  spinner: false
  src: string
  editProfileForm: ProfileFields
  changePasswordForm: PasswordFields
};

export type BottomView = 'buttons' | 'password-form' | 'profile-form';

export type ProfileFields = {
  firstName: string
  lastName: string
  position: string
  avatar: string
};

export type PasswordFields = {
  oldPassword: string
  password: string
};

/**
 * Constants
 */

export const OPEN_PROFILE_CARD = 'app/profileCard/OPEN_PROFILE_CARD';
export const CLOSE_PROFILE_CARD = 'app/profileCard/CLOSE_PROFILE_CARD';
export const CHANGE_VIEW = 'app/profileCard/CHANGE_VIEW';
export const FETCH_PROFILE = 'app/profileCard/FETCH_PROFILE';
export const SET_AVATAR = 'app/profileCard/SET_AVATAR';
export const UPDATE_PROFILE = 'app/profileCard/UPDATE_PROFILE';
export const CHANGE_PASSWORD = 'app/profileCard/CHANGE_PASSWORD';
export const LOGOUT = 'app/profileCard/LOGOUT';

/**
 * Action creators
 */

export const openProfileCard = createAction<void>(OPEN_PROFILE_CARD);
export const closeProfileCard = createAction<void>(CLOSE_PROFILE_CARD);
export const changeView = createAction<BottomView>(CHANGE_VIEW);
export const fetchProfile = createAction<void>(FETCH_PROFILE);
export const setAvatar = createAction<string>(SET_AVATAR);
export const updateProfile = createSubmitAction<ProfileFields, void>(UPDATE_PROFILE);
export const changePassword = createSubmitAction<PasswordFields, void>(CHANGE_PASSWORD);
export const logout = createAction<void>(LOGOUT);

/**
 * Reducer
 */

const initialState: State = from<StateMap>({
  open: false,
  bottomView: 'buttons',
  spinner: false,
  src: '',
  editProfileForm: {
    firstName: '',
    lastName: '',
    position: '',
    avatar: ''
  },
  changePasswordForm: {
    oldPassword: '',
    password: ''
  }
});

export default createReducer<State>({
  [OPEN_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: false, bottomView: 'buttons' })
  ),

  [CHANGE_VIEW]: (state: State, { payload }: Action<BottomView>): State => (
    state.merge({ bottomView: payload })
  ),

  [SET_AVATAR]: (state: State, { payload: src }: Action<string>): State => (
    state.merge({ src })
  ),

  [updateProfile.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [updateProfile.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  ),

  [changePassword.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [changePassword.SUCCESS]: (state: State): State => (
    state.merge({ spinner: false })
  )
}, initialState);
