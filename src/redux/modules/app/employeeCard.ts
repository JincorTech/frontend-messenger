import { createReducer, createAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

import { Member as Employee } from '../messenger/messenger';

/**
 * Types
 */

export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  open: boolean
  employee: Employee
};

/**
 * Constants
 */

export const OPEN_EMPLOYEE_CARD = 'app/employeeCard/OPEN_EMPLOYEE_CARD';
export const CLOSE_EMPLOYEE_CARD = 'app/employeeCard/CLOSE_EMPLOYEE_CARD';

/**
 * Action creators
 */

export const openEmployeeCard = createAction<Employee>(OPEN_EMPLOYEE_CARD);
export const closeEmployeeCard = createAction<void>(CLOSE_EMPLOYEE_CARD);

/**
 * Reducer
 */

const initialState: State = from<StateMap>({
  open: false,
  employee: {
    id: '',
    email: '',
    name: '',
    firstName: '',
    lastName: '',
    avatar: '',
    position: '',
    companyId: '',
    companyName: '',
    companyLogo: ''
  }
});

export default createReducer({
  [OPEN_EMPLOYEE_CARD]: (state: State, { payload }: Action<Employee>): State => (
    state.merge({
      open: true,
      employee: payload
    })
  ),

  [CLOSE_EMPLOYEE_CARD]: (state: State): State => (
    state.merge({
      open: false,
      employee: initialState.employee
    })
  )
}, initialState);
