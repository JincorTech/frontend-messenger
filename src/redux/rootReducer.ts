import { combineReducers } from 'redux-seamless-immutable';

import app from './modules/app/app';
import appLayout from './modules/app/appLayout';
import profileCard from './modules/app/profileCard';

import emojiSelect from './modules/messenger/emojiSelect';

/**
 * Global App state
 */
export type State = {};

/**
 * Root reducer
 */
export default combineReducers({
  app: combineReducers({
    app,
    appLayout,
    profileCard
  }),

  messenger: combineReducers({
    emojiSelect
  })
});
