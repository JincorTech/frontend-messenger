import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

/**
 * Types
 */

export type Props = {
  sendMessage: () => void
};

/**
 * Constants
 */

export const HEIGHT = 90;

/**
 * Component
 */

const Textarea = (props) => {
  const { sendMessage, ...inputProps } = props;

  return (
    <div styleName="wrapper">
      <div styleName="icon">
        <button styleName="add" type="button"/>
      </div>

      <div styleName="input">
        <form onSubmit={(e) => sendMessage(e)}>
          <input styleName="textarea" type="text" {...inputProps}/>
        </form>
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
