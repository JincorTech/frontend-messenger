import * as React from 'react';
import { Component } from 'react';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import './styles.css';

import { required, minLength, maxLength } from '../../../utils/validators';

import Button from '../../common/Button';
import RenderInput from '../../form/RenderInput';
import RenderImageUpload from '../../form/RenderImageUpload';

/**
 * Types
 */

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onMount: () => void
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  onCancel: () => void
  avatar: string
  spinner: boolean,
  t: Function
};

export type FormFields = {
  avatar: string
  firstName: string
  lastName: string
  position: string
};

/**
 * Component
 */

class CardUpdateProfile extends Component<Props, {}> {
  public componentWillMount(): void {
    this.props.onMount();
  }

  private renderBlackout(): JSX.Element {
    const { avatar } = this.props;

    return (
      <div styleName={avatar ? 'blackout' : 'blackout-empty'}>
        <div styleName="camera"/>
      </div>
    );
  }

  public render(): JSX.Element {
    const {
      t,
      invalid,
      pristine,
      handleSubmit,
      onCancel,
      avatar,
      spinner
    } = this.props;

    const NameMaxLength = 36;
    const PositionMinLength = 2;
    const PositionMaxLength = 60;

    return (
      <div styleName="edit-profile">
        <form
          onSubmit={handleSubmit}
          styleName="profile-bottom-form">

          <div styleName="avatar-upload">
            <Field
              src={avatar}
              component={RenderImageUpload}
              overlay={this.renderBlackout()}
              styleName="upload-field"
              name="avatar"
              width={325}
              height={325}/>
          </div>

          <Field
            component={RenderInput}
            validate={[
              required(t('fieldCantBeEmpty')),
              maxLength(NameMaxLength, t('maxSymbols', { count: NameMaxLength }))
            ]}
            name="firstName"
            type="text"
            placeholder={t('firstName')}/>

          <Field
            component={RenderInput}
            validate={[
              required(t('fieldCantBeEmpty')),
              maxLength(NameMaxLength, t('maxSymbols', { count: NameMaxLength }))
            ]}
            name="lastName"
            type="text"
            placeholder={t('lastName')}/>

          <Field
            component={RenderInput}
            validate={[
              required(),
              minLength(PositionMinLength, t('minSymbols', { count: PositionMinLength })),
              maxLength(PositionMaxLength, t('maxSymbols', { count: PositionMaxLength }))
            ]}
            name="position"
            type="text"
            placeholder={t('position')}/>

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

const TranslatedComponent = translate('app')(CardUpdateProfile);

export default reduxForm<FormFields, ComponentProps>({
  form: 'cardUpdateProfile'
})(TranslatedComponent);
