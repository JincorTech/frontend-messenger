import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';

import { StateMap as StateProps, BottomView as BottomViewProps } from '../../../redux/modules/app/profileCard';
import { User as UserProps } from '../../../redux/modules/app/appLayout';
import { Props as PopupProps } from '../../../components/common/Popup';

import { closeProfileCard, changeView, fetchProfile, changePassword, updateProfile, logout } from '../../../redux/modules/app/profileCard';

import Popup from '../../../components/common/Popup';
import CompanyLogo from '../../../components/common/CompanyLogo';
import CardAvatar from '../../../components/app/CardAvatar';
import CardButtonsView from '../../../components/app/CardButtonsView';
import CardChangePassword from '../../../components/app/CardChangePassword';
import CardUpdateProfile from '../../../components/app/CardUpdateProfile';

/**
 * Types
 */

export type Props = StateProps & ComponentProps & DispatchProps;

export type ComponentProps = {
  user: UserProps
};

export type DispatchProps = {
  openProfileCard: () => void
  closeProfileCard: () => void
  changeView: (view: BottomViewProps) => void
  logout: () => void
  updateProfile: () => void
  changePassword: () => void
  fetchProfile: () => void
};

/**
 * Component
 */

class ProfileCard extends Component<Props, {}> {
  constructor(props) {
    super(props);

    this.fetchProfile = this.fetchProfile.bind(this);
  }

  private fetchProfile(): void {
    const { fetchProfile } = this.props;

    fetchProfile();
  }

  public render(): JSX.Element {
    const {
      open,
      spinner,
      user,
      src,
      bottomView,
      closeProfileCard,
      changeView,
      logout
    } = this.props;

    const {
      id,
      profile,
      company
    } = user;

    const {
      avatar,
      position,
      name,
      firstName,
      lastName
    } = profile;

    const {
      legalName,
      profile: { picture }
    } = company;

    const renderBottom = () => {
      switch (bottomView) {
        case 'buttons':
          return (
            <CardButtonsView
              changeView={changeView}
              logout={logout}/>
          );
        case 'profile-form':
          return (
            <CardUpdateProfile
              avatar={src}
              spinner={spinner}
              onMount={this.fetchProfile}
              onSubmit={updateProfile}
              onCancel={() => changeView('buttons')}/>
          );
        case 'password-form':
          return (
            <CardChangePassword
              spinner={spinner}
              onSubmit={changePassword}
              onCancel={() => changeView('buttons')}/>
          );
      }
    };

    return (
      <Popup
        styleName="profile-card"
        modalId="profile-card-popup"
        open={open}
        onClose={closeProfileCard}>

          <div styleName="top">
            <CardAvatar
              avatar={avatar}
              id={id}
              name={name}
              firstName={firstName}
              lastName={lastName}
              bottomView={bottomView}
              position={position}
              companyLogo={picture}
              companyName={legalName}/>
          </div>

          <div styleName="bottom">
            {renderBottom()}
          </div>

      </Popup>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.app.profileCard,
  {
    closeProfileCard,
    changeView,
    logout,
    fetchProfile
  }
)(ProfileCard);
