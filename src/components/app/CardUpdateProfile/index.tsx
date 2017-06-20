import * as React from 'react';
import { Component } from 'react';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';

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
  spinner: boolean
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
      invalid,
      pristine,
      handleSubmit,
      onCancel,
      avatar,
      spinner
    } = this.props;

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
              required('Поле не может быть пустым'),
              maxLength(36, 'Максимум 36 символов')
            ]}
            name="firstName"
            type="text"
            placeholder="Имя"/>

          <Field
            component={RenderInput}
            validate={[
              required('Поле не может быть пустым'),
              maxLength(36, 'Максимум 36 символов')
            ]}
            name="lastName"
            type="text"
            placeholder="Фамилия"/>

          <Field
            component={RenderInput}
            validate={[
              required(),
              minLength(2, 'Минимум 2 символа'),
              maxLength(60, 'Максимум 60 символов')
            ]}
            name="position"
            type="text"
            placeholder="Должность"/>

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
  form: 'cardUpdateProfile'
})(CardUpdateProfile);
