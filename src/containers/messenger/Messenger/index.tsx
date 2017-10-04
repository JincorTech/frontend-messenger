import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as equal from 'shallowequal';
import { success } from 'react-notification-system-redux';
import matrix from '../../../utils/matrix';

import './styles.css';

import { StateObj as StateProps, Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';

import {
  updateDemensions,
  sendMessage,
  changeTextarea,
  fetchRoom
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
  success: (notificationOpts: Object) => void
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
        // this.sendNotification();
      }
    });
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  private updateDimensions(): void {
    this.props.updateDemensions(window.innerHeight - LAYOUT_HEADER_HEIGHT);
  }

  private sendNotification(): void {
    const notificationOpts = {
      // uid: 'once-please', // you can specify your own uid if required
      title: 'Hey, it\'s good to see you!',
      message: 'Now you can see how easy it is to use notifications in React!',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'Click me!!',
        callback: () => alert('clicked!')
      }
    };

    this.props.success(notificationOpts);
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
    success
  }
)(Messenger);
