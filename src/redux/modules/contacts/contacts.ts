import { createReducer, createAction, createAsyncAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {
  open: boolean
  search: string
  contacts: Contact[]
  pagination: Pagination
};

export type Response = {
  data: Contact[]
  meta: {
    pagination: Pagination
  }
};

export type Contact = {
  id: string
  matrixId: string
  email: string
  name: string
  firstName: string
  lastName: string
  avatar: string
  companyId: string
  companyName: string
  companyLogo: string
  position: string
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

/**
 * Constants
 */

export const OPEN_CONTACTS = 'contacts/contacts/OPEN_CONTACTS';
export const CLOSE_CONTACTS = 'contacts/contacts/CLOSE_CONTACTS';
export const CLOSE_AND_OPEN_NEW_CONTACT = 'contacts/contacts/CLOSE_AND_OPEN_NEW_CONTACT';
export const FETCH_CONTACTS = 'contacts/contacts/FETCH_CONTACTS';
export const REMOVE_CONTACT = 'contacts/contacts/REMOVE_CONTACT';
export const CHANGE_SEARCH_QUERY = 'contacts/contacts/CHANGE_SEARCH_QUERY';
export const RESET_SEARCH_QUERY = 'contacts/contacts/RESET_SEARCH_QUERY';

/**
 * Action creators
 */

export const openContacts = createAction<void>(OPEN_CONTACTS);
export const closeContacts = createAction<void>(CLOSE_CONTACTS);
export const closeAndOpenNewContact = createAction<void>(CLOSE_AND_OPEN_NEW_CONTACT);
export const fetchContacts = createAsyncAction<void, Response>(FETCH_CONTACTS);
export const removeContact = createAsyncAction<string, void>(REMOVE_CONTACT);
export const changeSearchQuery = createAction<string>(CHANGE_SEARCH_QUERY);
export const resetSearchQuery = createAction<void>(RESET_SEARCH_QUERY);

/**
 * Reducer
 */

const initialState = from<StateObj>({
  open: false,
  search: '',
  contacts: [],
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
  [OPEN_CONTACTS]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_CONTACTS]: (state: State): State => (
    state.merge({ open: false })
  ),

  [fetchContacts.SUCCESS]: (state: State, { payload }: Action<Response>): State => (
    state.merge({
      contacts: payload.data,
      pagination: payload.meta.pagination
    })
  ),

  [CHANGE_SEARCH_QUERY]: (state: State, { payload }: Action<string>): State => (
    state.merge({ search: payload })
  ),

  [RESET_SEARCH_QUERY]: (state: State): State => (
    state.merge({ search: '' })
  )
}, initialState);
