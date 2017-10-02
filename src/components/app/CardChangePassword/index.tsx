import * as React from 'react';
import { Component } from 'react';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

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
  spinner: boolean,
  t: Function
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
      t,
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
              required(t('fieldCantBeEmpty')),
              password()
            ]}
            warn={password(t('passwordMustBeStrong'))}
            name="oldPassword"
            type="password"
            placeholder={t('oldPassword')}/>

          <Field
            component={RenderPassword}
            validate={[
              required(t('fieldCantBeEmpty')),
              password()
            ]}
            warn={password(t('passwordMustBeStrong'))}
            name="password"
            type="password"
            placeholder={t('newPassword')}/>

          <div styleName="form-buttons">
            <Button type="button" styleName="form-cancel-button" onClick={onCancel}>{t('cancel')}</Button>
            <Button type="submit" styleName="form-submit-button" disabled={pristine || invalid} spinner={spinner}>{t('save')}</Button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Export
 */

const TranslatedComponent = translate('app')(CardChangePassword);

export default reduxForm<FormFields, ComponentProps>({
  form: 'cardChangePassword',
  initialValues: {
    oldPassword: '',
    password: ''
  }
})(TranslatedComponent);
