import { createFormAction as createFormSagaAction } from 'redux-form-saga';
import { SubmitHandler } from 'redux-form';

/**
 * Types
 */
export type Action<Payload> = {
  type: string
  payload?: Payload
  error?: boolean
};

export type ActionMeta<Meta, Payload> = {
  type: string
  payload?: Payload
  meta?: Meta
  error?: boolean
};

export type ActionCreator<Payload> = (payload?: Payload) => Action<Payload>;

export type ActionMetaCreator<Meta, Payload> = (meta: Meta, payload?: Payload) => ActionMeta<Meta, Payload>;

export type AsyncActionCreator<R, S> = ActionCreator<R> & {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
  success: ActionCreator<S>
  failure: ActionCreator<Error>
  type: string
};

export type SubmitActionCreator<FormData, S> = SubmitHandler<FormData, any, any> & {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
  success: ActionCreator<S>
  failure: ActionCreator<Error>
  type: string
};

export type Reducer<State, Payload> = (state: State, action: Action<Payload>) => State;

export type HandlersMap<State, Payload> = {
  [actionType: string]: Reducer<State, Payload>
};

/**
 * Create Action creator
 */
export function createAction<Payload>(type: string): ActionCreator<Payload> {
  return (payload: Payload): Action<Payload> => ({
    type,
    payload
  });
}

export function createMetaAction<Meta, Payload>(type: string): ActionMetaCreator<Meta, Payload> {
  return (meta: Meta, payload?: Payload): ActionMeta<Meta, Payload> => ({
    type,
    payload,
    meta
  });
}

/**
 * Create Async action creator
 */
export function createAsyncAction<R, S>(type: string): AsyncActionCreator<R, S> {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return Object.assign(createAction<R>(REQUEST), {
    success: createAction<S>(SUCCESS),
    failure: createAction<Error>(FAILURE),
    REQUEST,
    SUCCESS,
    FAILURE,
    type
  });
}

/**
 * Create Submit action creator
 */
export function createSubmitAction<FormData, S>(type: string): SubmitActionCreator<FormData, S> {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  const formActionCreator: SubmitHandler<FormData, any, any> = createFormSagaAction(type);

  return Object.assign(formActionCreator, {
    success: createAction<S>(SUCCESS),
    failure: createAction<Error>(FAILURE),
    REQUEST,
    SUCCESS,
    FAILURE,
    type
  });
}

/**
 * Create Reducer
 */
export function createReducer<State>(handlers: HandlersMap<State, any>, initialState: State): Reducer<State, any> {
  return (state: State = initialState, action: Action<any> = null) => {
    return handlers[action.type] ?
      handlers[action.type](state, action) :
      state;
  };
}
