import * as React from 'react';
import { Route } from 'react-router';

import App from './containers/app/App';

export default (
  <Route path="/msg" component={App}>
    <Route path="/msg/room/:matrixId"/>
  </Route>
);
