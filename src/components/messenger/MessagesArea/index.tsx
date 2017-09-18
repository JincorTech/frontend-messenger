import * as React from 'react';
import { Component } from 'react';
import * as equal from 'shallowequal';
import Matrix from 'matrix-js-sdk';
import matrix from '../../../utils/matrix';
import { removeDomain } from '../../../helpers/matrix';

import './styles.css';

import { StateObj as StateProps, Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';

import Scrollbars from 'react-custom-scrollbars';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../MessagesHeader';
import MessageGroup from '../MessageGroup';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../Textarea';
import * as Waypoint from 'react-waypoint';

/**
 * Types
 */

export type Props = StateProps & DispatchProps & ComponentProps;

export type DispatchProps = {
  changeTextarea: (text: string) => void
  sendMessage: () => void
  openEmployeeCard: (employee: EmployeeProps) => void
};

type ComponentProps = {
  loading?: boolean
  timelineSet?: any
  messages?: any[]
};

/**
 * Component
 */

class MessagesArea extends Component<Props, ComponentProps> {
  private scrollbars: Scrollbars;
  private timelineWindow: any;
  private unmounted: boolean = true;

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.loadMsgs = this.loadMsgs.bind(this);
    this.onRoomTimeline = this.onRoomTimeline.bind(this);
    this.loadTimeline = this.loadTimeline.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.state = {
      loading: false,
      timelineSet: {},
      messages: []
    };
  }

  public componentWillMount(): void {
    matrix.on('Room.timeline', this.onRoomTimeline);
    this.unmounted = false;
  }

  public componentWillReceiveProps(nextProps): void {
    if (!equal(this.props.openedRoom, nextProps.openedRoom)) {
      this.loadTimeline(nextProps.openedRoom.roomId);
    }
  }

  private scrollToBottom(): void {
    this.scrollbars.scrollToBottom();
  }

  private loadTimeline(roomId): void {
    if (!roomId) return;

    const room = matrix.getRoom(roomId);
    const timelineSet = room.getUnfilteredTimelineSet();
    this.timelineWindow = new Matrix.TimelineWindow(matrix, timelineSet);

    this.timelineWindow.load(undefined, 30);
    this.setState({ messages: this.getMessages() }, () => {
      this.scrollToBottom();
    });
  }

  private loadMsgs(): void {
    this.setState({ loading: true });

    const prevHeight = this.scrollbars.getScrollHeight();
    this.timelineWindow.paginate(Matrix.EventTimeline.BACKWARDS, 30).then(() => {
      this.setState({ messages: this.getMessages() }, () => {
        const currHeight = this.scrollbars.getScrollHeight();
        this.scrollbars.scrollTop(currHeight - prevHeight);
        this.setState({ loading: false });
      });
    });
  }

  private onRoomTimeline(ev, room, toStartOfTimeline, removed, data): any {
    if (data.timeline.getTimelineSet() !== this.state.timelineSet) return;

    this.timelineWindow.paginate(Matrix.EventTimeline.FORWARDS, 1, false).done(() => {
      if (this.unmounted) return;
      this.setState({ messages: this.getMessages() });
    });
  }

  private getMessages(): any {
    const events = this.timelineWindow.getEvents();

    if (this.timelineWindow.canPaginate(Matrix.EventTimeline.FORWARDS)) {
      events.push(...this.state.timelineSet.getPendingEvents());
    }

    const messages = events.reduce((acc, event) => {
      if (event.getType() === 'm.room.message') {
        return acc.concat([{
          sender: removeDomain(event.getSender()),
          timestamp: event.getTs(),
          content: event.getContent().body
        }]);
      } else {
        return acc;
      }
    }, []);

    const result = messages.reduce((acc, d) => {
      if (acc.length === 0) {
        return new Array({
          sender: d.sender,
          messages: [{
            timestamp: d.timestamp,
            content: d.content
          }]
        });
      }

      if (acc[0].sender === d.sender && d.timestamp - acc[0].messages[acc[0].messages.length - 1].timestamp < 60000) {
        const item = {
          ...acc[0],
          messages: acc[0].messages.concat([{
            timestamp: d.timestamp,
            content: d.content
          }])
        };

        const newArr = acc.slice(1);
        return Array.from([item, ...newArr]);
      }

      const item = {
        sender: d.sender,
        messages: [{
          timestamp: d.timestamp,
          content: d.content
        }]
      };

      return [item, ...acc];
    }, []);

    const res = result.reverse();

    return res;
  }

  // /test

  private sendMessage(e): void {
    e.preventDefault();
    this.props.sendMessage();
    this.scrollToBottom();
  }

  private renderWaypoint(): JSX.Element {
    if (!this.state.loading && this.timelineWindow.canPaginate(Matrix.EventTimeline.BACKWARDS)) {
      return <Waypoint onEnter={() => this.loadMsgs()}/>;
    }
  }

  private renderMessagesArea(): JSX.Element {
    const {
      height,
      openedRoom,
      textarea,
      changeTextarea,
      openEmployeeCard
    } = this.props;

    const { members } = openedRoom;
    const { messages } = this.state;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div>
        <MessagesHeader {...openedRoom}/>

        <Scrollbars autoHide ref={(scrollbars) => { this.scrollbars = scrollbars; }} style={{height: messagesAreaHeight}}>
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
