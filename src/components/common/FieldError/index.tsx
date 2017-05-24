import * as React from 'react';
import { cloneElement, SFC, HTMLProps } from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import './styles.css';

export type Props = HTMLProps<HTMLDivElement> & {
  meta: WrappedFieldMetaProps<any>
  children?: JSX.Element
};

const FieldError: SFC<Props> = ({ meta, children }) => {
  const { invalid, touched, active, dirty, error } = meta;
  const hasError = touched && !active && invalid && dirty;

  return (
    <div styleName="field-element">
      {hasError && <div styleName="error">{error}</div>}
      {cloneElement(children, { invalid: hasError })}
    </div>
  );
};

export default FieldError;
