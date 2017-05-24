import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import UserAvatar from './components/UserAvatar';
import Message, { Props as MessageProps } from '../Message';
import Icon from '../../common/Icon';

export type Props = HTMLProps<HTMLDivElement> & {
  id: string
  src: string
  fullName: string
  company: string
  messages: MessageProps[]
};

const MessageWrapper: SFC<Props> = (props) => {
  const {
    id,
    src,
    fullName,
    company,
    messages
  } = props;

  const [firstMsg, ...msgs] = messages;
  const { date, unread, favorite, content } = firstMsg;

  return (
    <div styleName="messages-wrapper">
      <div styleName="message">
        <UserAvatar
          styleName="avatar"
          id={id}
          src={src}
          fullName={fullName}/>

        <div styleName={unread ? 'unread' : 'head'}>
          <b styleName="name">{fullName}</b>
          {company && <span styleName="company">{company}</span>}
          <span styleName="date">{date}</span>
        </div>

        <div styleName="content">
          {content}
        </div>

        {favorite
          ? <Icon styleName="favorite" name="favorite-active"/>
          : <Icon styleName="favorite" name="favorite"/>}
      </div>

      {msgs.map((msg, i) => (
        <Message key={i} {...msg}/>
      ))}
    </div>
  );
};

export default MessageWrapper;
