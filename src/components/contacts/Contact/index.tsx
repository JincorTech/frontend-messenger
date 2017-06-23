import * as React from 'react';
import { SFC, MouseEvent } from 'react';

import './styles.css';

import { Contact as ContactProps } from '../../../redux/modules/contacts/contacts';

import Avatar from '../../messenger/Avatar';
import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = ContactProps & DispatchProps;

export type DispatchProps = {
  onRemove: (e: MouseEvent<HTMLSpanElement>, userId: string) => void
  onContactClick: (matrixId: string) => void
};

/**
 * Component
 */

const Contact: SFC<Props> = (props) => {
  const {
    id,
    matrixId,
    avatar,
    name,
    companyName,
    position,
    onRemove,
    onContactClick
  } = props;

  return (
    <div styleName="contact" title={`${name} | ${companyName}`} onClick={() => onContactClick(matrixId)}>
      <div styleName="avatar">
        <Avatar
          styleName="avatar-component"
          type="dialog"
          src={avatar}
          fullName={name}
          id={id}
          size={50}/>
      </div>

      <div styleName="body">
        <div styleName="wrapper">
          <div styleName="fullname">{name}</div>
          <div styleName="info">
            <div styleName="company">{companyName}</div>
            <div styleName="role">{position}</div>
          </div>
        </div>

        <Icon styleName="icon" name="remove" onClick={(e) => onRemove(e, id)}/>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Contact;
