import { createReducer, createAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  authorized: boolean
  token: string
};

export type AuthProps = {
  authorized: boolean
  token: string
};

/**
 * Constants
 */
export const SET_AUTH_STATE = 'app/app/SET_AUTH_STATE';
export const LOGOUT = 'app/app/LOGOUT';
export const LOGIN = 'app/app/LOGIN';
export const CHECK_AUTH = 'app/app/CHECK_AUTH';

/**
 * Action creators
 */
export const setAuthState = createAction<AuthProps>(SET_AUTH_STATE);
export const login = createAction<string>(LOGIN);
export const logout = createAction<void>(LOGOUT);
export const checkAuth = createAction<void>(CHECK_AUTH);

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  authorized: false,
  token: ''
});

export default createReducer<State>({
  [SET_AUTH_STATE]: (state: State, { payload }: Action<boolean>): State => (
    state.merge(payload)
  )
}, initialState);
