import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  open: boolean
  step: Step
  search: string
  users: User[]
  pagination: Pagination
};

export type Step = 'search' | 'not-found' | 'spinner' | 'invite-success' | 'results';

export type User = {
  id: string
  matrixId: string
  email: string
  name: string
  firstName: string
  lastName: string
  avatar: string
  position: string
  companyId: string
  companyName: string
  companyLogo: string
  added: boolean
};

export type Pagination = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  prevPageUrl: string
  nextPageUrl: string
  from: number
  to: number
};

export type Response = {
  data: User[]
  meta: {
    pagination: Pagination
  }
};

export type AddContactReq = {
  email: string
  companyId: string
};

/**
 * Constants
 */

export const OPEN_NEW_CONTACT = 'contacts/newContact/OPEN_NEW_CONTACT';
export const CLOSE_NEW_CONTACT = 'contacts/newContact/CLOSE_NEW_CONTACT';
export const CLOSE_AND_OPEN_CONTACTS = 'contacts/newContact/CLOSE_AND_OPEN_CONTACTS';
export const CHANGE_STEP = 'contacts/newContact/CHANGE_STEP';
export const CHANGE_SEARCH_QUERY = 'contacts/newContact/CHANGE_SEARCH_QUERY';
export const SEARCH_NEW_CONTACT = 'contacts/newContact/SEARCH_NEW_CONTACT';
export const ADD_CONTACT = 'contacts/newContact/ADD_CONTACT';
export const REMOVE_CONTACT = 'contacts/newContact/REMOVE_CONTACT';

/**
 * Action creators
 */

export const openNewContact = createAction<void>(OPEN_NEW_CONTACT);
export const closeNewContact = createAction<void>(CLOSE_NEW_CONTACT);
export const closeAndOpenContacts = createAction<void>(CLOSE_AND_OPEN_CONTACTS);
export const changeStep = createAction<Step>(CHANGE_STEP);
export const changeSearchQuery = createAction<string>(CHANGE_SEARCH_QUERY);
export const searchNewContact = createAsyncAction<string, Response>(SEARCH_NEW_CONTACT);
export const addContact = createAsyncAction<AddContactReq, string>(ADD_CONTACT);
export const removeContact = createAsyncAction<string, string>(REMOVE_CONTACT);

/**
 * Reducer
 */

const initialState = from<StateObj>({
  open: false,
  step: 'search',
  search: '',
  users: [],
  pagination: {
    total: 0,
    perPage: 0,
    currentPage: 0,
    lastPage: 0,
    prevPageUrl: '',
    nextPageUrl: '',
    from: 0,
    to: 0
  }
});

export default createReducer<State>({
  [OPEN_NEW_CONTACT]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_NEW_CONTACT]: (state: State): State => (
    state.merge({ open: false })
  ),

  [CHANGE_STEP]: (state: State, { payload }: Action<Step>): State => (
    state.merge({ step: payload })
  ),

  [CHANGE_SEARCH_QUERY]: (state: State, { payload }: Action<string>): State => (
    state.merge({ search: payload })
  ),

  [searchNewContact.SUCCESS]: (state: State, { payload }: Action<Response>): State => (
    state.merge({
      users: payload.data,
      pagination: payload.meta.pagination
    })
  ),

  [addContact.SUCCESS]: (state: State, { payload }: Action<string>): State => (
    state.merge({ users: from(state.users.map((user) => user.id === payload ? {...user, added: true} : user)) })
  ),

  [removeContact.SUCCESS]: (state: State, { payload }: Action<string>): State => (
    state.merge({ users: from(state.users.map((user) => user.id === payload ? {...user, added: false} : user)) })
  )
}, initialState);
