import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import {
  openSidebar,
  closeSidebar,
  fetchUser,
  User
} from '../../../redux/modules/app/appLayout';

import { openProfileCard } from '../../../redux/modules/app/profileCard';

import Logo from '../../../components/common/Logo';
import Toggle from '../../../components/app/Toggle';
import UserAvatar from '../../../components/app/UserAvatar';
import Sidebar from '../../../components/app/Sidebar';
import PageName from '../../../components/app/PageName';
import ProfileCard from '../ProfileCard';

import Messenger from '../../messenger/Messenger';

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps;

export type ComponentProps = {};

export type StateProps = {
  user: User
  sidebarOpen: boolean
  isAuth: boolean
};

export type DispatchProps = {
  openSidebar: () => void
  closeSidebar: () => void
  openProfileCard: () => void
  closeProfileCard: () => void
  changeView: () => void
  fetchUser: () => void
};

/**
 * Component
 */
class AppLayout extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchUser();
  }

  render() {
    const { sidebarOpen, user, isAuth } = this.props;
    const { openSidebar, closeSidebar, openProfileCard } = this.props;
    const { id, profile } = user;

    return (
      <div styleName="app-layout">
        <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

        <header styleName="header">
          <Toggle onClick={openSidebar}/>

          <div styleName="container">
            <div styleName="pull-left">
              {isAuth
                ? <Logo styleName="logo" href="/app/profile"/>
                : <Logo styleName="logo" href="/auth/signin"/>}

              <PageName
                styleName="module-name"
                pathname="Messanger"/>
            </div>

            <UserAvatar
              styleName="pull-right"
              onClick={openProfileCard}
              src={profile.avatar}
              alt={profile.name}
              id={id}
              name={profile.name}/>
          </div>
        </header>

        <section>
          <div styleName="container">
            <Messenger/>
          </div>
        </section>

        <ProfileCard user={user}/>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, any>(
  (state) => ({
    ...state.app.appLayout,
    isAuth: state.app.app.authorized
  }),
  {
    openSidebar,
    closeSidebar,
    openProfileCard,
    fetchUser
  }
)(AppLayout);
