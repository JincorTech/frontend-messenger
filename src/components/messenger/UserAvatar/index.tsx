import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  src: string
  fullName: string
  id: string
};

/**
 * Component
 * @param props
 */
const UserAvatar: SFC<Props> = (props) => {
  const { src, fullName, id, children, ...divProps } = props;

  return (
    <div styleName="avatar" {...divProps}>
      {src
        ? <img src={src}/>
        : <div styleName="empty" style={getBackgroundColor(id)}>
            {getInitials(fullName)}
          </div>}
    </div>
  );
};

export default UserAvatar;
