import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import './styles.css';

import { checkAuth, StateMap as StateProps } from '../../../redux/modules/app/app';

import { outsideSelectRoom } from '../../../redux/modules/messenger/rooms';

import AppLayout from '../AppLayout';
import Notifications from '../Notifications';

/**
 * Types
 */

export type Props = StateProps & DispatchProps & ComponentProps & RouteComponentProps<ComponentProps, {}>;

export type ComponentProps = {
  matrixId: string
};

export type DispatchProps = {
  checkAuth: () => void
  outsideSelectRoom: (cMatrixId: string) => void
};

/**
 * Component
 */

class App extends Component<Props, StateProps> {
  public componentWillMount(): void {
    const {
      checkAuth,
      outsideSelectRoom,
      params
    } = this.props;

    checkAuth();

    if (params.matrixId) {
      outsideSelectRoom(params.matrixId);
    }
  }

  render() {
    return (
      <div styleName="app">
        <AppLayout/>
        <Notifications/>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, {}>(
  state => state.app.app,
  {
    checkAuth,
    outsideSelectRoom
  }
)(App);
