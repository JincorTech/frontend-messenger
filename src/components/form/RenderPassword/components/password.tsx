import * as React from 'react';
import { Component, HTMLProps, MouseEvent } from 'react';
import '../styles.css';

import InputComponent, { Input } from '../../../common/Input';
import Icon from '../../../common/Icon';

export type PasswordProps = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
  visible: boolean,
  onChangeVisibility: (visible: boolean) => void
};

class Password extends Component<PasswordProps, {}> {
  private input: Input;

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidUpdate(): void {
    if (this.input.inputElement === document.activeElement) {
      const { length } = this.input.inputElement.value;

      this.input.inputElement.focus();
      this.input.inputElement.setSelectionRange(length, length);
    }
  }

  private handleClick(e: MouseEvent<HTMLSpanElement>): void {
    const { onChangeVisibility, visible } = this.props;

    e.preventDefault();
    onChangeVisibility(!visible);
  }

  public render(): JSX.Element {
    const { visible, onChangeVisibility, ref, ...inputProps } = this.props;

    return (
      <div styleName="password-input-wrap">
        { visible
          ? <InputComponent styleName="password-input" type="text" ref={(input) => this.input = input} {...inputProps}/>
          : <InputComponent styleName="password-input" type="password" ref={(input) => this.input = input} {...inputProps}/>
        }

        <Icon
          styleName="password-icon"
          name={visible ? 'eye-active' : 'eye'}
          onMouseDown={this.handleClick}/>
      </div>
    );
  }
}

export default Password;
