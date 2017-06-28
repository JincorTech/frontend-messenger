import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

/**
 * Types
 */

export type Props = {

};

/**
 * Constants
 */

export const HEIGHT = 65;

/**
 * Component
 */

const MessagesHeader: SFC<Props> = (props) => {
  return (
    <div styleName="header">
      <div styleName="pull-left">
        <div styleName="name">Steve Jobs</div>
        <div styleName="position">Chief Executive Officer @ Apple inc.</div>
      </div>
      <div styleName="pull-right">
        <button styleName="loupe" type="button"/>
        <button styleName="cog" type="button"/>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default MessagesHeader;
