import * as React from 'react';
import { SFC, HTMLProps } from 'react';
const { container, line, caption } = require('./styles.css');

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
};

/**
 * Component
 * @param props
 */
const UnreadSeparator: SFC<Props> = (props) => {
  const { ...divProps } = props;

  return (
    <div className={container} {...divProps}>
      <hr className={line}/><span className={caption}>New messages</span>
    </div>
  );
};

export default UnreadSeparator;
