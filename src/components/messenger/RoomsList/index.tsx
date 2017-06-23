import * as React from 'react';
import { SFC } from 'react';

import Room from '../Room';

/**
 * Types
 */

export type Props = {
  searchable: boolean
  resultsVisible: boolean
  list: any[]
  searchResults: any[]
};

/**
 * Component
 */

const RoomsList: SFC<Props> = (props) => {
  const {
    list
  } = props;

  return (
    <div>
      {list.map((room) => <Room key={room.id} {...room}/>)}
    </div>
  );
};

/**
 * Export
 */

export default RoomsList;
