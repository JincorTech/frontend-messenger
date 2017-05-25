import * as React from 'react';
import { SFC } from 'react';
import { WrappedFieldProps } from 'redux-form';
import * as CSSModules from 'react-css-modules';

import Input from '../../common/Input';
import FieldError from '../../common/FieldError';

export type InputProps = WrappedFieldProps<any> & {
  type: 'text' | 'email'
  placeholder?: string
};

const RenderInput: SFC<InputProps> = (props) => {
  const { type, placeholder, input, meta, ...inputProps } = props;

  return (
    <FieldError meta={meta}>
      <Input
        type={type}
        placeholder={placeholder}
        {...input}
        {...inputProps}/>
    </FieldError>
  );
};

export default RenderInput;
