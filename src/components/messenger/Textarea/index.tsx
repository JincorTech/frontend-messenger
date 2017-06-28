import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

/**
 * Types
 */

export type Props = {};

/**
 * Component
 */

const Textarea = (props) => {
  return (
    <div styleName="wrapper">
      <div styleName="icon">
        <button styleName="add" type="button"/>
      </div>

      <div styleName="input">
        <input styleName="textarea" type="text"/>
      </div>

      <div styleName="icon">
        <button styleName="smile" type="button"/>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Textarea;
