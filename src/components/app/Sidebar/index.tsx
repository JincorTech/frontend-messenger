import * as React from 'react';
import { PureComponent, HTMLProps } from 'react';
import { InjectedCSSModuleProps } from 'react-css-modules';
import './styles.css';

import Icon from '../../common/Icon';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & InjectedCSSModuleProps & {
  open?: boolean
  onClose: () => void
};

/**
 * Component
 */
class Sidebar extends PureComponent<Props, {}> {
  private aside: HTMLElement;

  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const { open } = this.props;

    if (!open && nextProps.open) {
      document.addEventListener('click', this.handleOutsideClick);
    }

    if (open && !nextProps.open) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  private handleOutsideClick(e: any): void {
    if (!this.aside.contains(e.target)) {
      this.props.onClose();
    }
  }

  public render(): JSX.Element {
    const { open, onClose, styles, children, className, ...divProps } = this.props;
    // const { link, active } = styles;

    return (
      <aside
        styleName={open ? 'sidebar-open' : 'sidebar-close'}
        className={className}
        ref={(aside) => this.aside = aside}
        {...divProps}>

        <Icon styleName="close-icon" name="close" onClick={onClose}/>

        <nav>
          <a styleName="active" href="/msg">Мессенджер</a>
          <a styleName="link" href="/cmp/app/profile">Моя компания</a>
          <a styleName="link" href="/cmp/app/search">Поиск</a>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
