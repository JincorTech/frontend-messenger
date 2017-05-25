import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import Icon from '../../common/Icon';

/**
 * Type
 */
export type Props = HTMLProps<HTMLDivElement> & {
  date: string
  content: string
  favorite: boolean
  unread: boolean
};

/**
 * Component
 */
const Message: SFC<Props> = (props) => {
  const { date, content, favorite, unread } = props;

  return (
    <div styleName="message">
      <span styleName="date">{date}</span>
      <div styleName={unread ? 'unread' : 'content'}>
        {content}
      </div>
      {favorite
        ? <Icon styleName="favorite" name="favorite-active"/>
        : <Icon styleName="favorite" name="favorite"/>}
    </div>
  );
};

export default Message;
