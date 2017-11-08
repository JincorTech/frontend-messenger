import * as React from 'react';
import { SFC } from 'react';

import { ts } from '../../../utils/timestamp';

import './styles.css';

import { Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';
import { Message as MessageProps } from '../../../redux/modules/messenger/messagesArea';

import Avatar from '../Avatar';
import Message from '../Message';
import UnreadSeparator from '../UnreadSeparator';
import { isNewMessage } from '../../../helpers/matrix';

/**
 * Types
 */

export type Props = {
  author: EmployeeProps
  messages: MessageProps[]
  openEmployeeCard: (employee: EmployeeProps) => void
  lastReadMessageId: string
};

/**
 * Component
 */

const MessageGroup: SFC<Props> = (props) => {
  const {
    author,
    messages,
    openEmployeeCard,
    lastReadMessageId
  } = props;

  const {
    id,
    avatar,
    name
  } = author;

  const [firstMsg, ...msgs] = messages;
  const { timestamp, content } = firstMsg;

  return (
    <div styleName="message-group">
      <div styleName="message">
        <div styleName="avatar" onClick={() => openEmployeeCard(author)}>
          <Avatar
            id={id}
            size={44}
            src={avatar}
            fullName={name}/>
        </div>

        <div styleName="head" data-timestamp={ts(timestamp)}>
          <b styleName="name" onClick={() => openEmployeeCard(author)}>{name}</b>
        </div>

        <div styleName="content">
          {content}
        </div>
      </div>

      {msgs.map((msg, i) => {
        const message = <Message key={i} timestamp={msg.timestamp} content={msg.content}/>;
        const isLastRead = msg.id === lastReadMessageId && i < msgs.length - 1;
        const isNewMessageExists = isNewMessage(msgs[msgs.length - 1]);
        if (isLastRead && !isNewMessageExists) {
          return [
            message,
            <UnreadSeparator key={'unread_separator'}/>
          ];
        } else {
          return message;
        }
      })}
    </div>
  );
};

/**
 * Export
 */

export default MessageGroup;
