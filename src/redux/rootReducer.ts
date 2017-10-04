import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as notificationsReducer } from 'react-notification-system-redux';

import app from './modules/app/app';
import appLayout from './modules/app/appLayout';
import profileCard from './modules/app/profileCard';
import employeeCard from './modules/app/employeeCard';

import contacts from './modules/contacts/contacts';
import newContact from './modules/contacts/newContact';

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
  loadingBar: loadingBarReducer,
  notifications: notificationsReducer,

  app: combineReducers({
    app,
    appLayout,
    profileCard,
    employeeCard
  }),

  contacts: combineReducers({
    contacts,
    newContact
  }),

  messenger: combineReducers({
    messenger,
    rooms,
    emojiSelect
  })
});
