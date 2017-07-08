import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';

import './styles.css';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & {
  type?: string
  src: string
  fullName?: string
  id: string
  size?: number
};

/**
 * Component
 */

const RoomAvatar: SFC<Props> = (props) => {
  const {
    type,
    src,
    fullName,
    id,
    size
  } = props;

  const empty = () => {
    switch (type) {
      case 'dialog':
        return (
          <div styleName="empty-dialog">
            {getInitials(fullName)}
          </div>
        );

      case 'group':
        return <div styleName="empty-group"/>;

      case 'channel':
        return <div styleName="empty-channel"/>;

      case 'inquiry':
        return <div styleName="empty-inquiry"/>;
    }
  };

  const sizeStyles = {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`
  };

  const avatarStyle = src
    ? sizeStyles
    : Object.assign(sizeStyles, getBackgroundColor(id));

  return (
    <div styleName="avatar" style={avatarStyle}>
      {src
        ? <img src={src}/>
        : empty()}
    </div>
  );
};

RoomAvatar.defaultProps = {
  type: 'dialog',
  fullName: '',
  size: 60
};

/**
 * Export
 */

export default RoomAvatar;
