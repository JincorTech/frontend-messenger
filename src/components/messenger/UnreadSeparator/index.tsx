import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

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
    <div {...divProps}>
      <hr/>
    </div>
  );
};

export default UnreadSeparator;
