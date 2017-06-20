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

export const START_MATRIX = 'messenger/messenger/START_MATRIX';

/**
 * Action creators
 */

export const startMatrix = createAction<void>(START_MATRIX);

/**
 * Reducer
 */

const initialState = from<StateObj>({

});

export default createReducer<State>({}, initialState);
