import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import { getTime } from '../../../utils/timestamp';

import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = {
  timestamp: any // TODO
  content: string
};

/**
 * Component
 */

const Message: SFC<Props> = (props) => {
  const {
    timestamp,
    content
  } = props;

  return (
    <div styleName="message" data-timestamp={getTime(timestamp)}>
      <div styleName="content">
        {content}
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Message;
