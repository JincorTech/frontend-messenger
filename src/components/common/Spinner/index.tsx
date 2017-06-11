import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type ButtonProps = HTMLProps<HTMLDivElement> & {
  color?: string
};

const DEGREES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

const Spinner: SFC<ButtonProps> = ({ children, color, ...props }) => (
  <div styleName="spinner" {...props}>
    {DEGREES.map((deg) => <div key={deg} styleName={`stick-${deg}`} style={{ backgroundColor: color }}/>)}
  </div>
);

Spinner.defaultProps = {
  color: '#fff'
};

export default Spinner;
