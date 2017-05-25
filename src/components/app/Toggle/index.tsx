import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type ToggleProps = HTMLProps<HTMLDivElement>;

const MenuToggle: SFC<ToggleProps> = ({ children, className, ...props }) => {
  return (
    <div styleName="menu-toggle" className={className} {...props}>
      <span styleName="stripe" />
      <span styleName="stripe" />
      <span styleName="stripe" />
    </div>
  );
};

export default MenuToggle;
