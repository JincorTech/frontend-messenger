import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type ButtonProps = HTMLProps<HTMLDivElement>;

const DEGREES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const Spinner: SFC<ButtonProps> = ({ children, className, ...props }) => (
  <div styleName="spinner" className={className} {...props}>
    {DEGREES.map((deg) => <div key={deg} styleName={`stick-${deg}`}/>)}
  </div>
);

export default Spinner;
