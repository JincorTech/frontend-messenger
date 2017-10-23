import * as React from 'react';
import { SFC } from 'react';

import { Room as RoomProps } from '../../../redux/modules/messenger/rooms';

import Room from '../Room';

import { filterContacts } from '../../../helpers/contacts/filter';

/**
 * Types
 */

export type Props = {
  list: RoomProps[]
  search: string
  openedRoomId: string
  openRoom: (roomId: string) => void
};

/**
 * Component
 */

const RoomsList: SFC<Props> = (props) => {
  const {
    list,
    search,
    openedRoomId,
    openRoom
  } = props;

  const filteredList = filterContacts(list, search, ['title', 'preview']);

  const isOpened = (roomId) => {
    return openedRoomId === roomId;
  };

  return (
    <div>
      {filteredList.map((room) => <Room key={room.id} openRoom={openRoom} isOpened={isOpened(room.id)} {...room}/>)}
    </div>
  );
};

/**
 * Export
 */

export default RoomsList;
