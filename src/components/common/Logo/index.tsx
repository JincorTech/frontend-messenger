import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type LogoProps = HTMLProps<HTMLAnchorElement>;

const Logo: SFC<LogoProps> = (props) => (
  <a href="javascript:void(0);" styleName="logo" {...props}/>
);

export default Logo;
