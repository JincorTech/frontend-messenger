import * as React from 'react';
import { SFC } from 'react';

import { ts } from '../../../utils/timestamp';

import './styles.css';

import { Member as EmployeeProps } from '../../../redux/modules/messenger/messenger';

import Avatar from '../Avatar';
import Message, { Props as MessageProps } from '../Message';

/**
 * Types
 */

export type Props = {
  author: EmployeeProps
  messages: MessageProps[]
  openEmployeeCard: (employee: EmployeeProps) => void
};

/**
 * Component
 */

const MessageGroup: SFC<Props> = (props) => {
  const {
    author,
    messages,
    openEmployeeCard
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
