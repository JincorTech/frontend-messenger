import * as React from 'react';
import { Component, HTMLProps, MouseEvent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import * as classnames from 'classnames';
const { popup, overlay, close } = require('./styles.css');

// TODO don't forget about dat
import { Provider } from 'react-redux';
import { store } from '../../../index';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & ComponentProps;

export type ComponentProps = {
  modalId: string
  open?: boolean
  hideClose?: boolean
  onClose?: () => void
};

/**
 * Component
 */
class FullscreenPopup extends Component<Props, {}> {
  private portal: HTMLDivElement;

  /**
   * Create portal element
   */
  public componentDidMount(): void {
    const { modalId, open } = this.props;
    const element = document.getElementById(modalId);

    if (element) {
      throw new Error('modalId parameter must be unique for each Popup component');
    }

    this.portal = document.createElement('div');
    this.portal.id = this.props.modalId;

    document.body.appendChild(this.portal);

    this.renderModal();

    if (open) {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Remove portal element
   */
  public componentWillUnmount(): void {
    unmountComponentAtNode(this.portal);
    document.body.removeChild(this.portal);
    document.body.style.overflow = '';
  }

  /**
   * Pass props to portal element
   */
  public componentDidUpdate(): void {
    const { open } = this.props;

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    this.renderModal();
  }

  private handleClick(e: MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();
  }

  /**
   * Render popup content
   */
  private renderModal(): void {
    const {
      open,
      onClose,
      hideClose,
      children,
      modalId,
      className,
      ...divProps
    } = this.props;

    render (
      <Provider store={store}>
        <div className="portal">
          {open && <div className={overlay} onClick={onClose}>
            {!hideClose && <button type="button" className={close}/>}

            <div className={classnames(popup, className)} onClick={this.handleClick} {...divProps}>
              {children}
            </div>
          </div>}
        </div>
      </Provider>,
      document.getElementById(modalId)
    );
  }

  /**
   * Stop render
   */
  public render(): JSX.Element {
    return null;
  }
}

export default FullscreenPopup;
