import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/messenger';

// import { sendTestMessage } from '../../../redux/modules/messenger/messenger';

import Rooms from '../Rooms';
import MessagesHeader from '../../../components/messenger/MessagesHeader';
import Textarea from '../../../components/messenger/Textarea';
import Messages from '../Messages';

/**
 * Types
 */

export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = {
  height?: number
};

export type DispatchProps = {
  // sendTestMessage: () => void
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
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  private updateDimensions(): void {
    this.setState({
      height: window.innerHeight - 50 // Header height
    });
  }

  public render(): JSX.Element {
    const { height } = this.state;

    const messagesAreaHeight = height - 65 - 90; // messages-height and textarea-height

    return (
      <div styleName="messenger">
        <div styleName="rooms-wrapper">
          <Rooms height={height}/>
        </div>

        <div styleName="messages-wrapper">
          <MessagesHeader/>

          <div styleName="messages-area" style={{height: messagesAreaHeight, backgroundColor: '#f9f9f9'}}>

          </div>

          <Textarea/>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, {}>(
  state => state.messenger.messenger,
  {
    // sendTestMessage
  }
)(Messenger);
