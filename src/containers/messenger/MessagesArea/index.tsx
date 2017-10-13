import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as equal from 'shallowequal';
import Matrix from 'matrix-js-sdk';
import { Trans, translate } from 'react-i18next';
import matrix from '../../../utils/matrix';
import { removeDomain } from '../../../helpers/matrix';
import { messagesService } from '../../../utils/matrix/messagesService';

import './styles.css';

import { StateObj as MessengerState, Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';
import { StateObj as MessagesAreaState, MessagesGroup } from '../../../redux/modules/messenger/messagesArea';
import { loadPreviousPage } from '../../../redux/modules/messenger/messagesArea';

import Scrollbars from 'react-custom-scrollbars';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../../../components/messenger/MessagesHeader';
import MessageGroup from '../../../components/messenger/MessageGroup';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../../../components/messenger/Textarea';
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
  loadPreviousPage: (roomId: string) => void
};

export type ComponentProps = {
  height: any
};

/**
 * Component
 */

class MessagesArea extends Component<Props, {}> {
  private scrollbars: Scrollbars;

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  public componentWillReceiveProps(nextProps): void {
    if (!equal(this.props.openedRoom, nextProps.openedRoom)) {
      this.props.loadPreviousPage(nextProps.openedRoom.roomId);
    }
  }

  private scrollToBottom(): void {
    this.scrollbars.scrollToBottom();
  }

  // private loadMsgs(): void {
  //   this.setState({ loading: true });

  //   const prevHeight = this.scrollbars.getScrollHeight();
  //   this.timelineWindow.paginate(Matrix.EventTimeline.BACKWARDS, 30).then(() => {
  //     this.setState({ messages: this.getGroupedMessages() }, () => {
  //       const currHeight = this.scrollbars.getScrollHeight();
  //       this.scrollbars.scrollTop(currHeight - prevHeight);
  //       this.setState({ loading: false });
  //     });
  //   });
  // }

  // /test

  private sendMessage(e): void {
    e.preventDefault();
    this.props.sendMessage();
    // this.showNewMessage(removeDomain(matrix.getUserId()), Date.now(), this.props.textarea);
  }

  private renderWaypoint(): JSX.Element {
    if (!this.props.loading && messagesService.isInitialized() && messagesService.canLoadMore()) {
      return <Waypoint onEnter={() => this.props.loadPreviousPage(this.props.openedRoom.roomId)}/>;
    }
  }

  private renderMessagesArea(): JSX.Element {
    const {
      t,
      height,
      openedRoom,
      textarea,
      changeTextarea,
      openEmployeeCard
    } = this.props;

    const { members } = openedRoom;
    const { messages } = this.props;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div>
        <MessagesHeader {...openedRoom}/>

        <Scrollbars autoHide ref={(scrollbars) => { this.scrollbars = scrollbars; }} style={{ height: messagesAreaHeight }}>
          {this.renderWaypoint()}
          {messages.map(({ sender, messages }, i) => (
            <MessageGroup
              key={messages[0].timestamp}
              author={members[sender]}
              messages={messages}
              openEmployeeCard={openEmployeeCard}/>
          ))}
        </Scrollbars>

        <Textarea
          placeholder={t('writeMessage')}
          sendMessage={this.sendMessage}
          onChange={(e) => changeTextarea(e.target.value)}
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
    }
  },
  {
    loadPreviousPage
  }
)(TranslatedComponent);
