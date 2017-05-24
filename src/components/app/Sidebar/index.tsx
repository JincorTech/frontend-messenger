import * as React from 'react';
import { PureComponent, HTMLProps } from 'react';
import './styles.css';
import { InjectedCSSModuleProps } from 'react-css-modules';

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
    const { open, onClose, styles, children, ...divProps } = this.props;
    // const { link, active } = styles;

    return (
      <aside
        styleName={open ? 'sidebar-open' : 'sidebar-close'}
        ref={(aside) => this.aside = aside}
        {...divProps}>

        <Icon styleName="close-icon" name="close" onClick={onClose}/>

        <nav>
          {/*<Link className={link} activeClassName={active} to="/app/messenger">Мессенджер</Link>*/}
          {/*<Link className={link} activeClassName={active} to="/app/profile">Моя компания</Link>*/}
          {/*<Link className={link} activeClassName={active} to="/app/favorites">Избранное</Link>*/}
          {/*<Link className={link} activeClassName={active} to="/app/search">Поиск</Link>*/}
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
