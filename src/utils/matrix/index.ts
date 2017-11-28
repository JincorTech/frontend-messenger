import Matrix from 'matrix-js-sdk';

import { getToken, getUserId } from '../../utils/auth';
import { messengerConfig } from '../../config';

const localStorage = window.localStorage;

const opts = {
  baseUrl: messengerConfig.baseUrl,
  accessToken: getToken(),
  userId: getUserId()
};

const createMatrixClient = (opts) => {
  const storeOpts = {
    sessionStore: {},
    store: {}
  };

  if (localStorage) {
    storeOpts.sessionStore = new Matrix.WebStorageSessionStore(localStorage);
  }

  if (window.indexedDB && localStorage) {
    storeOpts.store = new Matrix.IndexedDBStore({
      indexedDB: window.indexedDB,
      dbName: 'jincor-web-sync',
      localStorage: localStorage
    });
  }

  return Matrix.createClient(Object.assign(storeOpts, opts));
};

// create the client
const matrix = createMatrixClient(opts);

// set max listners
matrix.setMaxListeners(500);

// set timeline
const notifTimelineSet = new Matrix.EventTimelineSet(null, { timelineSupport: true });
notifTimelineSet.getLiveTimeline().setPaginationToken('', Matrix.EventTimeline.BACKWARDS);
matrix.setNotifTimelineSet(notifTimelineSet);

// up indexeddb and start client
const rmPromise = matrix.store.deleteAllData();
rmPromise.finally(() => {
  const promise = matrix.store.startup();
  promise.catch((err) => { console.error(err); });
  promise.finally(() => matrix.startClient(opts));
});

export default matrix;
