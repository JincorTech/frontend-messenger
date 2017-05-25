import * as React from 'react';
import { SFC, Component } from 'react';
import { WrappedFieldProps } from 'redux-form';

import Password from './components/Password';
import FieldError from '../../common/FieldError';
import FieldHint from '../../common/FieldHint';

/**
 * Types
 */
export type Props = WrappedFieldProps<any> & {
  placeholder?: string
};

export type State = {
  visible: boolean
};

/**
 * Component
 */
class RenderPassword extends Component<Props, State> {
  public state: State = {
    visible: false
  };

  constructor(props) {
    super(props);

    this.handleChangeVisibility = this.handleChangeVisibility.bind(this);
  }

  private handleChangeVisibility(visible: boolean): void {
    this.setState({ visible });
  }

  public render(): JSX.Element {
    const { visible } = this.state;
    const { placeholder, input, meta } = this.props;

    return (
      <FieldHint meta={meta}>
        <FieldError meta={meta}>
          <Password
            visible={visible}
            placeholder={placeholder}
            onChangeVisibility={this.handleChangeVisibility}
            {...input}/>
        </FieldError>
      </FieldHint>
    );
  }
}

export default RenderPassword;
