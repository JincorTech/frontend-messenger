import * as React from 'react';
import { cloneElement, SFC, HTMLProps } from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import './styles.css';

export type Props = HTMLProps<HTMLDivElement> & {
  meta: WrappedFieldMetaProps<any>
  children?: JSX.Element
};

const FieldHint: SFC<Props> = ({ meta, children }) => {
  const { active, warning } = meta;

  return (
    <div styleName="field-element">
      {active && warning && <div styleName="hint">{warning}</div>}
      {cloneElement(children)}
    </div>
  );
};

export default FieldHint;
