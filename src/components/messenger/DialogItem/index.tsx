import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';

import Icon from '../../../components/common/Icon';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  name: string
  preview: string
  avatar: JSX.Element
  writeable?: boolean
};

/**
 * Component
 */
const UserDialog: SFC<Props> = (props) => {
  const { name, preview, avatar, writeable } = props;

  return (
    <div styleName="dialog">
      <div styleName="avatar">
        {avatar}
      </div>

      <div styleName="body">
        <b styleName="fullname">{name}</b>

        <div styleName="preview">
          <p styleName="messege">
            {writeable && <span styleName="you">Вы:</span>}
            {preview}
          </p>
        </div>
      </div>

      <Icon styleName="new-messege" name="new"/>

      <span styleName="date">
        {writeable && <Icon styleName="unread" name="unread"/>}
        15/03/2017
      </span>
    </div>
  );
};

UserDialog.defaultProps = {
  writeable: false
};

export default UserDialog;
