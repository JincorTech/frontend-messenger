import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';

import app from './modules/app/app';
import appLayout from './modules/app/appLayout';
import profileCard from './modules/app/profileCard';

import messenger from './modules/messenger/messenger';
import rooms from './modules/messenger/rooms';
import emojiSelect from './modules/messenger/emojiSelect';

/**
 * Global App state
 */

export type State = {};

/**
 * Root reducer
 */

export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  app: combineReducers({
    app,
    appLayout,
    profileCard
  }),

  messenger: combineReducers({
    messenger,
    rooms,
    emojiSelect
  })
});
