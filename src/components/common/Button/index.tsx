import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import Spinner from '../Spinner';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  spinner?: boolean
  bStyle?: 'default' | 'outline'
};

const Button: SFC<ButtonProps> = (props) => {
  const {spinner, disabled, children, className, bStyle = 'default', ...btnProps} = props;

  return (
    <button
      styleName={spinner ? `${bStyle}-loaded` : bStyle}
      className={className}
      disabled={spinner || disabled}
      {...btnProps}>
      {spinner ? <Spinner /> : children}
    </button>
  );
};

export default Button;
