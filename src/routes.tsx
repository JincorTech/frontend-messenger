import * as React from 'react';
import { Route } from 'react-router';

import App from './containers/app/App';

export default (
  <Route path="/" component={App}>
    <Route path="/room/:matrixId"/>
  </Route>
);
