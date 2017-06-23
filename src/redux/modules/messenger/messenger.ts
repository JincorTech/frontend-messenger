import { createReducer, createAction } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>;

export type StateObj = {

};

/**
 * Constants
 */

export const SEND_TEST_MESSAGE = 'SEND_TEXT_MESSAGE';

/**
 * Action creators
 */

export const sendTestMessage = createAction<string>(SEND_TEST_MESSAGE);

/**
 * Reducer
 */

const initialState = from<StateObj>({

});

export default createReducer<State>({}, initialState);
