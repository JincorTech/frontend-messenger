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
  openRoom: (roomId: string) => void
};

/**
 * Component
 */

const RoomsList: SFC<Props> = (props) => {
  const {
    list,
    search,
    openRoom
  } = props;

  const filteredList = filterContacts(list, search, ['title', 'preview']);

  return (
    <div>
      {filteredList.map((room) => <Room key={room.id} openRoom={openRoom} {...room}/>)}
    </div>
  );
};

/**
 * Export
 */

export default RoomsList;
