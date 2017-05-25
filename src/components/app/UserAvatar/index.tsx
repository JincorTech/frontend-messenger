import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import { getInitials, getBackgroundColor } from '../../../utils/colorFunction';

export type UserAvatarProps = HTMLProps<HTMLDivElement> & {
  src?: string,
  alt?: string,
  id: string,
  name: string
};

const UserAvatar: SFC<UserAvatarProps> = (props) => {
  const { src, alt, id, name, children, className, ...divProps } = props;
  const backgroundColor = getBackgroundColor(id);
  const initials = getInitials(name);

  return (
    <div styleName="user-avatar" className={className} {...divProps}>
      { src
        ? <img src={src} alt={alt}/>
        : <div styleName="user-avatar-empty" style={backgroundColor}>{initials}</div>}
    </div>
  );
};

export default UserAvatar;
