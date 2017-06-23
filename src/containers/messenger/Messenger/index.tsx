import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/messenger';

import { startMatrix } from '../../../redux/modules/messenger/messenger';

import Rooms from '../Rooms';
import Messages from '../Messages';
import ContactsPopup from '../../../components/contacts/ContactsPopup';
import NewContactPopup from '../../../components/contacts/NewContactPopup';

/**
 * Types
 */

export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = {
  height?: number
};

export type DispatchProps = {
  startMatrix: () => void
};

/**
 * Component
 */

class Messenger extends Component<Props, StateProps> {
  public state = {
    height: 0
  };

  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  public componentWillMount(): void {
    this.updateDimensions();

    this.props.startMatrix();
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  private updateDimensions(): void {
    this.setState({
      height: window.innerHeight - 65 // Header height
    });
  }

  public render(): JSX.Element {
    const { height } = this.state;

    return (
      <div styleName="messenger">
        <div styleName="dialogs">
          <Rooms height={height}/>
        </div>

        <div styleName="messages">
          <Messages
            search={false}
            height={height}
            name="Александр Пушкин"
            company="Альфа-Банк"/>
        </div>

        <ContactsPopup open={false}/>
        <NewContactPopup open={false} step={1}/>
      </div>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, {}>(
  state => state.messenger.messenger,
  { startMatrix }
)(Messenger);
