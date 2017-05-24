import * as React from 'react';
import { Component } from 'react';
import '../styles.css';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';

import { required, maxLength } from '../../../../utils/validators';

import Button from '../../../../components/common/Button';
import RenderInput from '../../../../components/form/RenderInput';
import RenderImageUpload from '../../../../components/form/RenderImageUpload';

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

class ProfileEdit extends Component<Props, {}> {
  public componentWillMount(): void {
    const { onMount } = this.props;

    onMount();
  }

  private renderBlackout(): JSX.Element {
    const { avatar } = this.props;

    const blackout = {
      // position: 'absolute', // TODO types error
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundImage: avatar
        ? `linear-gradient(to bottom,
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.15) 32%,
          rgba(0, 0, 0, 0.15) 66%,
          rgba(0, 0, 0, 0.4))`
        : 'rgba(0, 0, 0, .2)'
    };

    const camera = {
      top: '20px',
      left: '20px',
      right: 'auto',
      bottom: 'auto'
    };

    return (
      <div style={blackout}>
        <div styleName="camera" style={camera}/>
      </div>
    );
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit, onCancel, avatar, spinner } = this.props;

    return (
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
            maxLength(15, 'Максимум 15 символов')
          ]}
          name="firstName"
          type="text"
          placeholder="Имя"/>

        <Field
          component={RenderInput}
          validate={[
            required('Поле не может быть пустым'),
            maxLength(15, 'Максимум 15 символов')
          ]}
          name="lastName"
          type="text"
          placeholder="Фамилия"/>

        <Field
          component={RenderInput}
          validate={[
            maxLength(20, 'Максимум 20 символов')
          ]}
          name="position"
          type="text"
          placeholder="Должность"/>

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
})(ProfileEdit);
