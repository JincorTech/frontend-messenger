/* tslint:disable:no-unused-variable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import matrix from './utils/matrix';
import { isAuth } from './utils/auth';

import routes from './routes';
import configureStore from './redux/configureStore';

import App from './containers/app/App';
import AppPreloader from './components/app/AppPreloader';

import './assets/normalize.css';
import './assets/fonts/OpenSans/stylesheet.css';
import './assets/main.css';

export const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

if (!isAuth()) window.location.replace('/cmp/auth/signin');

const renderApp = (routes: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

const renderPreloader = (Component: any) => {
  ReactDOM.render(
    <Component/>,
    document.getElementById('app')
  );
};

// render preloader until matrix load
renderPreloader(AppPreloader);

matrix.on('sync', (state, prevState, data) => {
  // render error component
  if (state === 'ERROR') {
    console.error(`SYNC ERROR ${state}`);
    return;
  }

  // matrix ready, render the app
  if (state === 'PREPARED') {
    renderApp(routes);
    return;
  }
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(require('./routes').default);
  });
}
