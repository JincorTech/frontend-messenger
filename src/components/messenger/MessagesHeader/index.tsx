import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import { User } from '../../../redux/modules/messenger/messenger';

/**
 * Constants
 */

export const HEIGHT = 65;

/**
 * Component
 */

const MessagesHeader: SFC<User> = (props) => {
  const {
    name,
    position,
    companyName
  } = props;

  return (
    <div styleName="header">
      <div styleName="pull-left">
        <div styleName="name">{name}</div>
        <div styleName="position">{position} @ {companyName}</div>
      </div>
      <div styleName="pull-right"></div>
    </div>
  );
};

/**
 * Export
 */

export default MessagesHeader;
