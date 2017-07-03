import * as React from 'react';
import { Component } from 'react';
import * as equal from 'shallowequal';

import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/messenger';

import Scrollbars from 'react-custom-scrollbars';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../MessagesHeader';
import MessageGroup from '../MessageGroup';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../Textarea';

/**
 * Types
 */

export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  changeTextarea: (text: string) => void
  sendMessage: () => void
};

/**
 * Component
 */

class MessagesArea extends Component<Props, {}> {
  private scrollbars: Scrollbars;

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  public componentDidUpdate(prevProps): void {
    if (!equal(prevProps.messages, this.props.messages)) {
      this.scrollbars.scrollToBottom();
      console.log('updated');
    }
  }

  private sendMessage(e): void {
    e.preventDefault();
    this.props.sendMessage();
  }

  private renderMessagesArea(): JSX.Element {
    const {
      height,
      messages,
      members,
      openedRoom,
      textarea,
      changeTextarea
    } = this.props;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div>
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
    );
  }

  private renderMock(): JSX.Element {
    return (
      <div styleName="mock-wrap">
        <div styleName="mock">Выберите диалог<br/>чтобы начать общение</div>
      </div>
    );
  }

  public render(): JSX.Element {
    const { openedRoom } = this.props;

    return openedRoom.roomId ? this.renderMessagesArea() : this.renderMock();
  }
}

/**
 * Export
 */

export default MessagesArea;
