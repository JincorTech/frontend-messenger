import * as React from 'react';
import { Component, HTMLProps } from 'react';
import { connect } from 'react-redux';
import matrix from '../../../utils/matrix';

import './styles.css';

import { StateObj as RoomsStateProps } from '../../../redux/modules/messenger/rooms';
import { StateObj as MessengerStateProps } from '../../../redux/modules/messenger/messenger';

import {
  showSearchInput,
  hideSearchInput,
  changeSearchQuery,
  resetSearchQuery
} from '../../../redux/modules/messenger/rooms';
import {
  fetchRooms,
  openRoom
} from '../../../redux/modules/messenger/messenger';
import { openContacts } from '../../../redux/modules/contacts/contacts';

import Scrollbars from 'react-custom-scrollbars';
import RoomsHeader, { HEIGHT as ROOM_HEADER_HEIGHT } from '../../../components/messenger/RoomsHeader';
import RoomsList from '../../../components/messenger/RoomsList';

/**
 * Types
 */

export type StateProps = RoomsStateProps & MessengerStateProps;

export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = HTMLProps<HTMLDivElement> & {
  height?: number
};

export type DispatchProps = {
  showSearchInput: () => void
  hideSearchInput: () => void
  changeSearchQuery: (query: string) => void
  resetSearchQuery: () => void
  openContacts: () => void
  fetchRooms: () => void
  openRoom: (roomId: string) => void
};

/**
 * Component
 */

class Rooms extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchRooms();

    matrix.on('RoomState.events', (event) => {
      if (event.getType() === 'm.room.create') {
        this.props.fetchRooms();
      }
    });
    // matrix.on('RoomState.events', () => this.props.fetchRooms());
    matrix.on('event', (event) => {
      if (event.getType() === 'm.room.message') {
        this.props.fetchRooms();
      }
    });

    // auto join room
    matrix.on('RoomMember.membership', (event, member) => {
      if (member.membership === 'invite' && member.userId === matrix.credentials.userId) {
        matrix.joinRoom(member.roomId).done();
      }
    });
  }

  public render(): JSX.Element {
    const {
      height,
      rooms,
      search,
      searchable,
      showSearchInput,
      hideSearchInput,
      changeSearchQuery,
      resetSearchQuery,
      openContacts,
      openRoom
    } = this.props;

    const contentHeight = height - ROOM_HEADER_HEIGHT;

    return (
      <div>
        <RoomsHeader
          search={search}
          searchable={searchable}
          showSearchInput={showSearchInput}
          hideSearchInput={hideSearchInput}
          changeSearchQuery={changeSearchQuery}
          resetSearchQuery={resetSearchQuery}
          openContacts={openContacts}/>

        <Scrollbars
          autoHide
          styleName="custom-scrollbar"
          style={{height: contentHeight, width: 'calc(100% + 25px)'}}>
          <div styleName="dialog-list">
            <RoomsList
              list={rooms}
              search={search}
              openedRoomId={this.props.openedRoomId}
              openRoom={openRoom}/>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => {
    return {
      ...state.messenger.messenger,
      ...state.messenger.rooms
    };
  },
  {
    showSearchInput,
    hideSearchInput,
    changeSearchQuery,
    resetSearchQuery,
    openContacts,
    fetchRooms,
    openRoom
  }
)(Rooms);
