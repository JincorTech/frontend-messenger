// TODO need types

import { success, error, warning, info } from 'react-notification-system-redux';

/**
 * @param type string 'success' | 'error' | 'waringn' | info
 * @param message string
 * @param autoDismiss number
 */

const notify = (type = 'success', message, title, autoDismiss = 10) => {
  const config = {
    title,
    message,
    position: 'bl',
    autoDismiss
  };

  switch (type) {
    case 'success':
      return success(config);
    case 'error':
      return error(config);
    case 'warning':
      return warning(config);
    case 'info':
      return info(config);
    default:
      return info(config);
  }
};

export default notify;
