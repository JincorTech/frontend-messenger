import * as React from 'react';
import { Component } from 'react';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';

import './styles.css';

import { required, password } from '../../../utils/validators';

import Button from '../../common/Button';
import RenderPassword from '../../form/RenderPassword';

/**
 * Types
 */

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

/**
 * Component
 */

class CardChangePassword extends Component<Props, {}> {
  public render(): JSX.Element {
    const {
      pristine,
      invalid,
      handleSubmit,
      onCancel,
      spinner
    } = this.props;

    return (
      <div styleName="change-password">
        <form
          onSubmit={handleSubmit}
          styleName="profile-bottom-form">

          <Field
            component={RenderPassword}
            validate={[
              required('Поле не может быть пустым'),
              password()
            ]}
            warn={password('Пароль должен состоять как минимум из 6 символов, содержать буквы разного регистра и цифры.')}
            name="oldPassword"
            type="password"
            placeholder="Старый пароль"/>

          <Field
            component={RenderPassword}
            validate={[
              required('Поле не может быть пустым'),
              password()
            ]}
            warn={password('Пароль должен состоять как минимум из 6 символов, содержать буквы разного регистра и цифры.')}
            name="password"
            type="password"
            placeholder="Новый пароль"/>

          <div styleName="form-buttons">
            <Button type="button" styleName="form-cancel-button" onClick={onCancel}>отменить</Button>
            <Button type="submit" styleName="form-submit-button" disabled={pristine || invalid} spinner={spinner}>Сохранить</Button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Export
 */

export default reduxForm<FormFields, ComponentProps>({
  form: 'cardChangePassword',
  initialValues: {
    oldPassword: '',
    password: ''
  }
})(CardChangePassword);
