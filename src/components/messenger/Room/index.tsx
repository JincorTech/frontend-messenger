import * as React from 'react';
import { SFC, HTMLProps } from 'react';

import './styles.css';

import Avatar from '../Avatar';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & {
  type: 'dialog' | 'group' | 'channel' | 'inquiry'
  id: string
  src?: string
  title: string
  time: string // todo change
  unreadIn: boolean // todo change
  unreadOut: boolean // todo change
  last?: string // todo change
  preview: string
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
    time,
    unreadIn,
    unreadOut,
    last,
    preview
  } = props;

  return (
    <div styleName="dialog">
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
        {time}
      </span>
    </div>
  );
};

/**
 * Export
 */

export default Room;
