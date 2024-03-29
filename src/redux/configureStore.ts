import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { stateTransformer } from 'redux-seamless-immutable';

import rootReducer, { State } from './rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  stateTransformer,
  collapsed: false
});

/**
 * Create store for production env
 * @param initialState - redux init state
 */
function configureStoreProd(initialState: State): Store<State> {
  const middlewares = [
    routerMiddleware(browserHistory),
    sagaMiddleware
  ];

  const store = createStore<State>(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

/**
 * Create store for development env
 * @param initialState - redux init state
 */
function configureStoreDev(initialState: State): Store<State> {
  const middlewares = [
    routerMiddleware(browserHistory),
    sagaMiddleware,
    loggerMiddleware
  ];

  const store = createStore(
    rootReducer,
    initialState,
    // composeWithDevTools(applyMiddleware(...middlewares))
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'development'
  ? configureStoreDev
  : configureStoreProd;

export default configureStore;
