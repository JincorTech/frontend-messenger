import * as React from 'react';
import { SFC } from 'react';

import { ts } from '../../../utils/timestamp';

import './styles.css';

import Avatar from '../Avatar';
import Message, { Props as MessageProps } from '../Message';

/**
 * Types
 */

export type Props = {
  id: string
  avatar: string
  fullName: string
  firstName: string
  messages: MessageProps[]
};

/**
 * Component
 */

const MessageGroup: SFC<Props> = (props) => {
  const {
    id,
    avatar,
    fullName,
    firstName,
    messages
  } = props;

  const [firstMsg, ...msgs] = messages;
  const { timestamp, content } = firstMsg;

  return (
    <div styleName="message-group">
      <div styleName="message">
        <div styleName="avatar">
          <Avatar
            id={id}
            size={44}
            src={avatar}
            fullName={fullName}/>
        </div>

        <div styleName="head" data-timestamp={ts(timestamp)}>
          <b styleName="name">{firstName}</b>
        </div>

        <div styleName="content">
          {content}
        </div>
      </div>

       {msgs.map((msg, i) => (
        <Message key={i} {...msg}/>
      ))}
    </div>
  );
};

/**
 * Export
 */

export default MessageGroup;
