import * as React from 'react';
import { Component } from 'react';
import '../styles.css';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';

import { required, password } from '../../../../utils/validators';

import Button from '../../../../components/common/Button';
import RenderPassword from '../../../../components/form/RenderPassword';

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  onCancel: () => void
  spinner: boolean
};

export type FormFields = {
  oldPassword: string,
  password: string
};

class ChangePassword extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, handleSubmit, onCancel, spinner } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        <Field
          component={RenderPassword}
          validate={[
            required('Поле не может быть пустым'),
            password()
          ]}
          name="oldPassword"
          type="password"
          placeholder="Старый пароль"/>

        <Field
          component={RenderPassword}
          validate={[
            required('Поле не может быть пустым'),
            password()
          ]}
          name="password"
          type="password"
          placeholder="Новый пароль"/>

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button" onClick={onCancel}>отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid} spinner={spinner}>Сохранить</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm<FormFields, ComponentProps>({
  form: 'ProfileCardEdit'
})(ChangePassword);
