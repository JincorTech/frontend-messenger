// TODO need types

import * as React from 'react';
import { SFC } from 'react';
import { connect } from 'react-redux';
import * as Notifications from 'react-notification-system-redux';

const NotificationsComponent: SFC<any> = (props) => {
  const { notifications } = props;

  const style = {
    NotificationItem: {
      DefaultStyle: {
        padding: '10px 15px',
        font: 'normal 14px Roboto',
        color: '#fff',
        backgroundColor: '#efefef',
        borderRadius: '2px',
        border: 'none',
        textAlign: 'left',
        boxShadow: 'none',
        margin: '5px 0'
      },

      success: {
        backgroundColor: '#00DC85'
      },

      error: {
        backgroundColor: '#FF4C4C'
      },

      warning: {
        backgroundColor: '#FFD203'
      },

      info: {
        color: '#222',
        backgroundColor: '#efefef'
      }
    }
  };

  return (
    <Notifications
      style={style}
      notifications={notifications}/>
  );
};

export default connect<any, any, any>(
  (state) => ({
    notifications: state.notifications
  })
)(NotificationsComponent);
