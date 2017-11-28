import * as React from 'react';
import { Component } from 'react';

import './styles.css';

import TextareaResizable from 'react-textarea-autosize';

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

class Textarea extends Component<any, {}> {
  private form: any;

  render() {
    const { sendMessage, ...inputProps } = this.props;

    return (
      <div styleName="wrapper">
        <div styleName="input">
          <form
            onSubmit={(e: any) => sendMessage(e)}
            ref={(form: any) => { this.form = form; }}>
            <TextareaResizable
              styleName="textarea"
              type="text"
              onKeyDown={(e) => e.keyCode === 13 ? sendMessage(e) : null}
              {...inputProps}/>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */

export default Textarea;
