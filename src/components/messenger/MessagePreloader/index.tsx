import * as React from 'react';

import './styles.css';

/**
 * Component
 */

const MessagePreloader = () => (
  <div styleName="message-group">
      <div styleName="message">
        <div styleName="avatar"/>
        <div styleName="head">
          <div styleName="name"/>
          <div styleName="date"/>
        </div>
        <div styleName="content">
          <div styleName="mock1"/>
          <div styleName="mock2"/>
        </div>
      </div>
    </div>
);

/**
 * Export
 */

export default MessagePreloader;
