import * as React from 'react';

import './styles.css';

import PageName from '../PageName';
import Logo from '../../common/Logo';

import RoomsHeaderPreloader from '../../messenger/RoomsHeaderPreloader';
import RoomPreloader from '../../messenger/RoomPreloader';
import MessagesHeaderPreloader from '../../messenger/MessagesHeaderPreloader';
import MessagePreloader from '../../messenger/MessagePreloader';

/**
 * Component
 */

const AppPreloader = () => (
  <div styleName="app-layout">
    <header styleName="header">
      <div styleName="container">
        <div styleName="pull-left">
          <Logo styleName="logo"/>
          <PageName styleName="module-name" pathname="Messenger"/>
        </div>
        <div styleName="avatar-mock"/>
      </div>
    </header>

    <section>
      <div styleName="container">
        <div styleName="messenger">
          <div styleName="rooms-wrapper">
            <RoomsHeaderPreloader/>
            <div>
              <RoomPreloader/>
              <RoomPreloader/>
              <RoomPreloader/>
            </div>
          </div>
          <div styleName="messages-wrapper">
            <MessagesHeaderPreloader/>
            <MessagePreloader/>
            <MessagePreloader/>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/**
 * Export
 */

export default AppPreloader;
