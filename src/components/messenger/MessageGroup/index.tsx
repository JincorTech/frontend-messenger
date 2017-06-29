import * as React from 'react';
import { SFC } from 'react';
import { format } from 'date-fns';

import './styles.css';

import Avatar from '../Avatar';
import { Props as MessageProps } from '../Message';

/**
 * Types
 */

export type Props = {
  id: string
  avatar: string
  fullName: string
  firstName: string
  message: MessageProps
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
    message
  } = props;

  // const [firstMsg, ...msgs] = messages;
  // const { timestamp, content } = firstMsg;
  const { timestamp, content } = message;

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

        <div styleName="head" data-timestamp={format(timestamp, 'HH:mm')}>
          <b styleName="name">{firstName}</b>
        </div>

        <div styleName="content">
          {content}
        </div>
      </div>

      {/*{msgs.map((msg, i) => (
        <Message key={i} {...msg}/>
      ))}*/}
    </div>
  );
};

/**
 * Export
 */

export default MessageGroup;
