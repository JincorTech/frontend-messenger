import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';
import {
  changeView,
  closeProfileCard,
  openProfileCard,
  changePassword,
  fetchProfile,
  updateProfile,
  logout
} from '../../../redux/modules/app/profileCard';
import { User as UserProps } from '../../../redux/modules/app/appLayout';
import { StateMap as StateProps, BottomView as BottomViewProps } from '../../../redux/modules/app/profileCard';

import ProfileEdit from './components/ProfileEdit';
import ChangePassword from './components/ChangePassword';
import Popup, { Props as PopupProps } from '../../../components/common/Popup';
import Icon from '../../../components/common/Icon';
import CompanyLogo from '../../../components/common/CompanyLogo';

type Props = JSX.IntrinsicAttributes
  & JSX.IntrinsicClassAttributes<any>
  & PopupProps
  & DispatchProps
  & ComponentProps
  & StateProps;

export type ComponentProps = {
  user: UserProps
};

export type DispatchProps = {
  openProfileCard: () => void,
  closeProfileCard: () => void,
  changeView: (view: BottomViewProps) => void,
  logout: () => void
  fetchProfile: () => void
};

class ProfileCard extends Component<Props, {}> {
  constructor(props) {
    super(props);

    this.renderView = this.renderView.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
  }

  private fetchProfile(): void {
    const { fetchProfile } = this.props;

    fetchProfile();
  }

  private renderView(view: BottomViewProps) {
    const { changeView, logout, src, spinner } = this.props;

    switch (view) {
      case 'buttons':
        return (
          <div styleName="control-buttons">
            <button
              type="button"
              onClick={() => changeView('profile-form')}>
              <Icon name="pencil" styleName="icon"/> Редактировать профиль
            </button>

            <button
              type="button"
              onClick={() => changeView('password-form')}>
              <Icon name="lock" styleName="icon"/> Изменить пароль
            </button>

            <button
              type="button"
              onClick={() => logout()}>
              <Icon name="logout" styleName="icon"/> Выйти
            </button>
          </div>
        );

      case 'profile-form':
        return (
          <div styleName="edit-profile">
            <ProfileEdit
              avatar={src}
              spinner={spinner}
              onMount={this.fetchProfile}
              onSubmit={updateProfile}
              onCancel={() => changeView('buttons')}/>
          </div>
        );

      case 'password-form':
        return (
          <div styleName="change-password">
            <ChangePassword
              spinner={spinner}
              onSubmit={changePassword}
              onCancel={() => changeView('buttons')}/>
          </div>
        );
    }
  }

  public render(): JSX.Element {
    const { user, open, bottomView, closeProfileCard } = this.props;
    const { id, profile, company } = user;
    const backgroundColor = getBackgroundColor(id);
    const initials = getInitials(profile.name);

    return (
      <Popup
        styleName="profile-card"
        modalId="profile-card-popup"
        open={open}
        onClose={closeProfileCard}>
        <div styleName={profile.avatar ? 'top' : 'top-avatar-empty'}>
          {
            profile.avatar
              ? <img styleName="avatar" src={profile.avatar}/>
              : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
          }

          <div styleName={bottomView !== 'profile-form' ? 'company' : 'company-hidden'}>
            <div styleName="company-name">{company.legalName}</div>
            <div styleName={ company.profile.picture ? 'company-logo' : 'company-logo-empty' }>
              <CompanyLogo src={company.profile.picture} borderRadius="0 4px"/>
            </div>
          </div>

          <div styleName={bottomView !== 'profile-form' ? 'info' : 'info-hidden'}>
            <div styleName="full-name">{profile.name}</div>
            <div styleName="position">{profile.position}</div>
          </div>
        </div>

        <div styleName="bottom">
          {this.renderView(bottomView)}
        </div>
      </Popup>
    );
  }
}

export default connect<StateProps, DispatchProps, ComponentProps>(
  state => state.app.profileCard,
  { openProfileCard, closeProfileCard, changeView, logout, fetchProfile }
)(ProfileCard);
