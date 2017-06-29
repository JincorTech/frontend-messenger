import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as equal from 'shallowequal';
import matrix from '../../../utils/matrix';

import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/messenger';

import {
  updateDemensions,
  sendMessage,
  changeTextarea,
  fetchMessages
} from '../../../redux/modules/messenger/messenger';

import Scrollbars from 'react-custom-scrollbars';
import Rooms from '../Rooms';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../../../components/messenger/MessagesHeader';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../../../components/messenger/Textarea';
import MessageGroup from '../../../components/messenger/MessageGroup';
import { HEIGHT as LAYOUT_HEADER_HEIGHT } from '../../app/AppLayout';

/**
 * Types
 */

export type Props = DispatchProps & StateProps;

export type DispatchProps = {
  updateDemensions: (height: number) => void
  sendMessage: () => void
  changeTextarea: (text: string) => void
  fetchMessages: () => void
};

/**
 * Component
 */

class Messenger extends Component<Props, StateProps> {
  private scrollbars: Scrollbars;

  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  public componentWillMount(): void {
    this.updateDimensions();
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions);
    this.scrollbars.scrollToBottom();

    matrix.on('event', (event) => {
      if (event.getType() === 'm.room.message') {
        this.props.fetchMessages();
      }
    });
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  public componentDidUpdate(prevProps): void {
    if (!equal(prevProps.messages, this.props.messages)) {
      this.scrollbars.scrollToBottom();
      console.log('updated');
    }
  }

  private updateDimensions(): void {
    this.props.updateDemensions(window.innerHeight - LAYOUT_HEADER_HEIGHT);
  }

  private sendMessage(e): void {
    e.preventDefault();
    this.props.sendMessage();
  }

  private scrollDown(): void {
    this.scrollbars.scrollToBottom();
  }

  public render(): JSX.Element {
    const {
      height,
      members,
      messages,
      openedRoom,
      changeTextarea,
      textarea
     } = this.props;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div styleName="messenger">
        <div styleName="rooms-wrapper">
          <Rooms height={height}/>
        </div>

        <div styleName="messages-wrapper">
          <MessagesHeader {...openedRoom}/>

          <Scrollbars autoHide ref={(scrollbars) => { this.scrollbars = scrollbars; }} style={{height: messagesAreaHeight}}>
            {messages.map(({ sender, timestamp, content }, i) => (
              <MessageGroup
                key={timestamp}
                id={members[sender].id}
                avatar={members[sender].avatar}
                firstName={members[sender].firstName}
                fullName={members[sender].name}
                message={{ timestamp, content }}/>
            ))}
          </Scrollbars>

          <Textarea
            placeholder="Написать сообщение..."
            sendMessage={this.sendMessage}
            onChange={(e) => changeTextarea(e.target.value)}
            value={textarea}/>
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
    updateDemensions,
    sendMessage,
    changeTextarea,
    fetchMessages
  }
)(Messenger);
