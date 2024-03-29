import * as React from 'react';
import { SFC, HTMLProps } from 'react';

import { ts } from '../../../utils/timestamp';

import './styles.css';

import { Room as RoomProps } from '../../../redux/modules/messenger/messenger';

import Avatar from '../Avatar';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & RoomProps & DispatchProps & ComponentProps;

export type DispatchProps = {
  openRoom: (roomId: string) => void
};

export type ComponentProps = {
  isOpened: boolean
};

/**
 * Component
 */

const Room: SFC<Props> = (props) => {
  const {
    id,
    userId,
    type,
    src,
    title,
    timestamp,
    unreadIn,
    unreadOut,
    last,
    preview,
    isOpened
  } = props;

  const maxchars = 45;
  const previewlen = maxchars - last.length;
  const previewSubstring = preview.length < previewlen ? preview : `${preview.substring(0, previewlen)}...`;

  const openRoom = () => {
    if (!isOpened) {
      props.openRoom(id);
    }
  };

  return (
    <div styleName={`dialog ${isOpened ? 'selected' : ''}`} onClick={openRoom}>
      <div styleName="avatar">
        <Avatar type={type} src={src} fullName={title} id={userId}/>
      </div>

      <div styleName="body">
        <div styleName="fullname">{title}</div>

        <div styleName="preview">
          <p styleName="message">
            {last && <span styleName="you">{last}:</span>}
            {previewSubstring}
          </p>
        </div>
      </div>

      {unreadIn && <div styleName="new-message"/>}

      <span styleName="date">
        {unreadOut && <div styleName="unread"/>}
        {timestamp ? ts(timestamp) : null}
      </span>
    </div>
  );
};

/**
 * Export
 */

export default Room;
