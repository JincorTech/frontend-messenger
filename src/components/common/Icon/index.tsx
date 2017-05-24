import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type Props = HTMLProps<HTMLSpanElement> & {
  name: string
};

const Icon: SFC<Props> = ({ name, ...spanProps }) => (
  <span styleName={name} {...spanProps}/>
);

export default Icon;
