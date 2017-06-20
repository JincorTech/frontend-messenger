import Matrix from 'matrix-js-sdk';

// import { getToken, getUserId } from '../../utils/auth';
// import { messengerConfig } from '../../config';

const localStorage = window.localStorage;

const opts = {
  baseUrl: 'https://matrix.org',
  accessToken: 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDJjY2lkIHVzZXJfaWQgPSBAc3BhY2UuaW52YWRlcjptYXRyaXgub3JnCjAwMTZjaWQgdHlwZSA9IGFjY2VzcwowMDIxY2lkIG5vbmNlID0gbTBQaElhNlY6K09GaFM4JgowMDJmc2lnbmF0dXJlIIpGa4jq_N5am0z3v3S1ANhL1KdbEBMG7ZJZw8sZHhpcCg',
  userId: '@space.invader:matrix.org'
};

// const opts = {
//   baseUrl: messengerConfig.baseUrl,
//   accessToken: getToken(),
//   userId: getUserId()
// };

const createMatrixClient = (opts) => {
  const storeOpts = {
    sessionStore: {},
    store: {}
  };

  if (localStorage) {
    storeOpts.sessionStore = new Matrix.WebStorageSessionStore(localStorage);
  }

  if (window.indexedDB && localStorage) {
    // FIXME: bodge to remove old database. Remove this after a few weeks.
    window.indexedDB.deleteDatabase('matrix-js-sdk:default');

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
const promise = matrix.store.startup();
promise.catch((err) => { console.error(err); });
promise.finally(() => matrix.startClient(opts));

export default matrix;
