import * as React from 'react';
import { Component, HTMLProps } from 'react';
import './styles.css';

export type Props = HTMLProps<HTMLDivElement> & {
};

class ContentEditable extends Component<Props, {}> {
  public render(): JSX.Element {
    const { children } = this.props;

    return (
      <div styleName="textarea" contentEditable>{children}</div>
    );
  }
}

export default ContentEditable;
