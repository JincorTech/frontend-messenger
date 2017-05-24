import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

export type ToggleProps = HTMLProps<HTMLDivElement>;

const MenuToggle: SFC<ToggleProps> = ({ children, ...props }) => {
  return (
    <div styleName="menu-toggle" {...props}>
      <span styleName="stripe" />
      <span styleName="stripe" />
      <span styleName="stripe" />
    </div>
  );
};

export default MenuToggle;
