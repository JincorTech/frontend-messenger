import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { format } from 'date-fns';

import './styles.css';

import { Room as RoomProps } from '../../../redux/modules/messenger/rooms';

import Avatar from '../Avatar';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & RoomProps & DispatchProps;

export type DispatchProps = {
  openRoom: (roomId: string) => void
};

/**
 * Component
 */

// console.log preview overflow
// maxchars - preview.len + last.len + 2;

const Room: SFC<Props> = (props) => {
  const {
    id,
    type,
    src,
    title,
    timestamp,
    unreadIn,
    unreadOut,
    last,
    preview,
    openRoom
  } = props;

  return (
    <div styleName="dialog" onClick={() => openRoom(id)}>
      <div styleName="avatar">
        <Avatar type={type} src={src} fullName={title} id={id}/>
      </div>

      <div styleName="body">
        <div styleName="fullname">{title}</div>

        <div styleName="preview">
          <p styleName="message">
            {last && <span styleName="you">{last}:</span>}
            {preview}
          </p>
        </div>
      </div>

      {unreadIn && <div styleName="new-message"/>}

      <span styleName="date">
        {unreadOut && <div styleName="unread"/>}
        {format(timestamp, 'HH:mm')}
      </span>
    </div>
  );
};

/**
 * Export
 */

export default Room;
