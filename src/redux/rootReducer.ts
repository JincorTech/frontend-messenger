import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';

import app from './modules/app/app';
import appLayout from './modules/app/appLayout';
import profileCard from './modules/app/profileCard';

import emojiSelect from './modules/messenger/emojiSelect';
import dialogs from './modules/messenger/dialogs';

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
    emojiSelect,
    dialogs
  })
});
