import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as equal from 'shallowequal';
import matrix from '../../../utils/matrix';
import { removeDomain } from '../../../helpers/matrix';

import './styles.css';

import {
  StateObj as StateProps,
  Member as EmployeeProps,
  NewMessageNotification as NotificationProps
} from '../../../redux/modules/messenger/messenger';

import {
  updateDemensions,
  sendMessage,
  changeTextarea,
  fetchRoom,
  showNotification
} from '../../../redux/modules/messenger/messenger';
import { openEmployeeCard } from '../../../redux/modules/app/employeeCard';

import Scrollbars from 'react-custom-scrollbars';
import Rooms from '../Rooms';
import MessagesArea from '../../../components/messenger/MessagesArea';
import { HEIGHT as LAYOUT_HEADER_HEIGHT } from '../../app/AppLayout';

/**
 * Types
 */

export type Props = DispatchProps & StateProps;

export type DispatchProps = {
  updateDemensions: (height: number) => void
  sendMessage: () => void
  changeTextarea: (text: string) => void
  fetchRoom: (roomId: string) => void
  openEmployeeCard: (employee: EmployeeProps) => void
  showNotification: (notification: NotificationProps) => void
};

/**
 * Component
 */

class Messenger extends Component<Props, StateProps> {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  public componentWillMount(): void {
    this.updateDimensions();
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions);

    matrix.on('event', (event) => {
      if (event.getType() === 'm.room.message') {
        this.props.fetchRoom(this.props.openedRoom.roomId);
        if (event.sender) {
          this.props.showNotification({
            userId: event.sender.userId,
            title: 'New message from <%= name %>',
            message: event.event.content.body,
            position: 'tr',
            autoDismiss: 5
          });
        }
      }
    });
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  private updateDimensions(): void {
    this.props.updateDemensions(window.innerHeight - LAYOUT_HEADER_HEIGHT);
  }

  public render(): JSX.Element {
    const { height } = this.props;

    return (
      <div styleName="messenger">
        <div styleName="rooms-wrapper">
          <Rooms height={height}/>
        </div>

        <div styleName="messages-wrapper">
          <MessagesArea height={height} {...this.props}/>
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
    fetchRoom,
    openEmployeeCard,
    showNotification
  }
)(Messenger);
