import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { checkAuth, StateMap as StateProps } from '../../../redux/modules/app/app';

import AppLayout from '../AppLayout';

/**
 * Types
 */
export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  checkAuth: () => void
};

/**
 * Component
 */
class App extends Component<Props, StateProps> {
  public componentWillMount(): void {
    this.props.checkAuth();
  }

  render() {
    return (
      <div styleName="app">
        <AppLayout/>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, {}>(
  state => state.app.app,
  { checkAuth }
)(App);
