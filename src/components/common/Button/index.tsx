import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import Spinner from '../Spinner';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  spinner?: boolean
};

const Button: SFC<ButtonProps> = (props) => {
  const {spinner, disabled, children, ...btnProps} = props;

  return (
    <button
      disabled={spinner || disabled}
      {...btnProps}>
      {spinner ? <Spinner/> : children}
    </button>
  );
};

export default Button;
