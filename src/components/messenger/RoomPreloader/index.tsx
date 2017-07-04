import * as React from 'react';

import './styles.css';

/**
 * Component
 */

const RoomPreloader = () => (
  <div styleName="dialog">
    <div styleName="avatar"/>

    <div styleName="body">
      <div styleName="fullname"/>

      <div styleName="preview">
        <div styleName="message"/>
        <div styleName="message"/>
      </div>
    </div>

    <span styleName="date"/>
  </div>
);

/**
 * Export
 */

export default RoomPreloader;
