import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';

import './styles.css';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & {
  type: 'dialog' | 'group' | 'channel' | 'inquiry'
  src: string
  fullName?: string
  id: string
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
    className
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

  return (
    <div styleName="avatar" style={getBackgroundColor(id)} className={className}>
      {src
        ? <img src={src}/>
        : empty()}
    </div>
  );
};

RoomAvatar.defaultProps = {
  type: 'dialog',
  fullName: ''
};

/**
 * Export
 */

export default RoomAvatar;
