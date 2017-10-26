import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, translate } from 'react-i18next';
import matrix from '../../../utils/matrix';
import { messagesService } from '../../../utils/matrix/messagesService';

import './styles.css';

import { StateObj as MessengerState, Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';
import { StateObj as MessagesAreaState } from '../../../redux/modules/messenger/messagesArea';
import { loadFirstPage, loadNextPage, loadNewMessage, updateLastReadMessage } from '../../../redux/modules/messenger/messagesArea';

import Scrollbars from 'react-custom-scrollbars';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../../../components/messenger/MessagesHeader';
import MessageGroup from '../../../components/messenger/MessageGroup';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../../../components/messenger/Textarea';
import UnreadSeparator from '../../../components/messenger/UnreadSeparator';
import * as Waypoint from 'react-waypoint';

/**
 * Types
 */

export type StateProps = MessengerState & MessagesAreaState;

export type Props = StateProps & DispatchProps & ComponentProps & {
  t: Function
};

export type DispatchProps = {
  changeTextarea: (text: string) => void
  sendMessage: () => void
  openEmployeeCard: (employee: EmployeeProps) => void,
  loadFirstPage: (roomId: string) => void,
  loadNextPage: () => void,
  loadNewMessage: () => void,
  updateLastReadMessage: () => void
};

export type ComponentProps = {
  height: any
};

export type ComponentState = {
  scrollHeight: number
};

/**
 * Component
 */

class MessagesArea extends Component<Props, ComponentState> {
  private scrollbars: Scrollbars;

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.changeTextarea = this.changeTextarea.bind(this);

    this.state = {
      scrollHeight: 0
    };
  }

  public componentWillReceiveProps(nextProps): void {
    if (this.props.openedRoom.roomId !== nextProps.openedRoom.roomId) {
      this.props.loadFirstPage(nextProps.openedRoom.roomId);
    }
  }

  public componentWillMount(): void {
    matrix.on('Room.timeline', () => {
      if (messagesService.canLoadNewMessage()) {
        this.props.loadNewMessage();
      }
      this.props.updateLastReadMessage();
    });
  }

  public componentDidUpdate(prevProps, prevState): void {
    if (this.messageAdded(prevProps.messagesGroups, this.props.messagesGroups)) {
      this.scrollToBottom();
      return;
    }

    if (this.scrollbars && this.state.scrollHeight) {
      const currHeight = this.scrollbars.getScrollHeight();
      this.scrollbars.scrollTop(currHeight - prevState.scrollHeight);
    }
  }

  private messageAdded(oldMessageGroups, newMessageGroups): boolean {
    if (!oldMessageGroups.length && !newMessageGroups.length) {
      return false;
    }

    if (!oldMessageGroups.length || !newMessageGroups.length) {
      return true;
    }

    const oldLastMessageGroup = oldMessageGroups[oldMessageGroups.length - 1].messages;
    const newLastMessageGroup = newMessageGroups[newMessageGroups.length - 1].messages;

    return oldLastMessageGroup[oldLastMessageGroup.length - 1].timestamp
      !== newLastMessageGroup[newLastMessageGroup.length - 1].timestamp;
  }

  private scrollToBottom(): void {
    if (this.scrollbars) {
      this.setState({ scrollHeight: 0 });
      this.scrollbars.scrollToBottom();
    }
  }

  private sendMessage(e): void {
    e.preventDefault();
    this.props.sendMessage();
  }

  private changeTextarea(e): void {
    this.setState({ scrollHeight: 0 });
    this.props.changeTextarea(e.target.value);
  }

  private renderWaypoint(): JSX.Element {
    if (!this.props.loading && messagesService.canLoadMore()) {
      return <Waypoint onEnter={() => {
        if (!this.scrollbars) {
          return;
        }
        this.setState({ scrollHeight: this.scrollbars.getScrollHeight() }, () => {
          this.props.loadNextPage();
        });
      }}/>;
    }
  }

  private renderMessagesArea(): JSX.Element {
    const {
      t,
      height,
      openedRoom,
      textarea,
      openEmployeeCard
    } = this.props;

    const { members } = openedRoom;
    const { messagesGroups, lastReadMessageId } = this.props;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div>
        <MessagesHeader {...openedRoom}/>

        <Scrollbars autoHide ref={(scrollbars) => { this.scrollbars = scrollbars; }} style={{ height: messagesAreaHeight }}>
          {this.renderWaypoint()}
          {messagesGroups.map(({ sender, messages }, i) => {
            const messageGroup = <MessageGroup
              key={messages[0].timestamp}
              author={members[sender]}
              messages={messages}
              openEmployeeCard={openEmployeeCard}
              lastReadMessageId={lastReadMessageId} />

            const lastMessage = messages[messages.length - 1];
            const isLastRead = lastMessage.id === lastReadMessageId && i < messagesGroups.length - 1;

            if (isLastRead) {
              return [
                messageGroup,
                <UnreadSeparator key={'unread_separator'}/>
              ]
            } else {
              return messageGroup;
            }
          })}
        </Scrollbars>

        <Textarea
          placeholder={t('writeMessage')}
          sendMessage={this.sendMessage}
          onChange={this.changeTextarea}
          value={textarea}/>
      </div>
    );
  }

  private renderMock(): JSX.Element {
    return (
      <div styleName="mock-wrap">
        <div styleName="mock"><Trans i18nKey="selectConversation">Select dialog<br/>for start a conversation</Trans></div>
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

const TranslatedComponent = translate('messenger')(MessagesArea);

export default connect<StateProps, DispatchProps, ComponentProps>(
  state => {
    return {
      ...state.messenger.messenger,
      ...state.messenger.messagesArea
    };
  },
  {
    loadFirstPage,
    loadNextPage,
    loadNewMessage,
    updateLastReadMessage
  }
)(TranslatedComponent);
