import * as React from 'react';

import './styles.css';

/**
 * Component
 */

const MessagesHeaderPreloader = (props) => (
  <div styleName="header">
    <div styleName="pull-left">
      <div styleName="name"/>
      <div styleName="position"/>
    </div>
    <div styleName="pull-right">
      <div styleName="button-mock"/>
      <div styleName="button-mock"/>
    </div>
  </div>
);

/**
 * Export
 */

export default MessagesHeaderPreloader;
