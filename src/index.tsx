/* tslint:disable:no-unused-variable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './redux/configureStore';

import App from './containers/app/App';

import 'normalize.css';
import './assets/fonts/OpenSans/stylesheet.css';
import './assets/main.css';

const store = configureStore({});

export { store };

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

render(App);

if (module.hot) {
  module.hot.accept('./containers/app/App', () => {
    render(require('./containers/app/App').default);
  });
}
