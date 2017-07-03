/* tslint:disable:no-unused-variable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import matrix from './utils/matrix';

import configureStore from './redux/configureStore';

import App from './containers/app/App';
import AppPreloader from './components/app/AppPreloader';

import 'normalize.css';
import './assets/fonts/OpenSans/stylesheet.css';
import './assets/main.css';

export const store = configureStore({});

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

// render preloader until matrix load
render(AppPreloader);

matrix.on('sync', (state, prevState, data) => {
  // render error component
  if (state === 'ERROR') {
    console.error(`SYNC ERROR ${state}`);
    return;
  }

  // matrix ready, render the app
  if (state === 'PREPARED') {
    render(App);
    return;
  }
});

if (module.hot) {
  module.hot.accept('./containers/app/App', () => {
    render(require('./containers/app/App').default);
  });
}
