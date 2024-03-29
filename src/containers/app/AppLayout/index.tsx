import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
import EmployeeCard from '../EmployeeCard';
import ContactsPopup from '../../contacts/ContactsPopup';
import NewContactPopup from '../../contacts/NewContactPopup';
import Messenger from '../../messenger/Messenger';

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps;

export type ComponentProps = {
  t: Function
};

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
 * Contants
 */

export const HEIGHT = 50;

/**
 * Component
 */

class AppLayout extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchUser();
  }

  render() {
    const { t, sidebarOpen, user, isAuth } = this.props;
    const { id, profile } = user;
    const {
      openSidebar,
      closeSidebar,
      openProfileCard
    } = this.props;

    return (
      <div styleName="app-layout">
        <Sidebar open={sidebarOpen} onClose={closeSidebar}/>

        <header styleName="header">
          <Toggle onClick={openSidebar}/>

          <div styleName="container">
            <div styleName="pull-left">
              {isAuth
                ? <Logo styleName="logo" href="/cmp/app/profile"/>
                : <Logo styleName="logo" href="/cmp/auth/signin"/>}

              <PageName
                styleName="module-name"
                pathname={t('messenger')}/>
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
        <ContactsPopup/>
        <NewContactPopup/>
        <EmployeeCard/>
      </div>
    );
  }
}

const TranslatedComponent = translate('app')(AppLayout);

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
)(TranslatedComponent);
