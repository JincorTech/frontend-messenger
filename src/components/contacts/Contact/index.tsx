import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import Avatar from '../../messenger/Avatar';
import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = {
  id: string
  src?: string
  fullName: string
  role: string
  company: string
};

/**
 * Component
 */

const Contact: SFC<Props> = (props) => {
  const {
    id,
    src,
    fullName,
    role,
    company
  } = props;

  return (
    <div styleName="contact" title={`${fullName} | ${company} - ${role}`}>
      <div styleName="avatar">
        <Avatar styleName="avatar-component" type="dialog" src={src} fullName={fullName} id={id}/>
      </div>

      <div styleName="body">
        <div styleName="wrapper">
          <div styleName="fullname">{fullName}</div>
          <div styleName="info">
            <div styleName="company">{company}</div>
            <div styleName="role">{role}</div>
          </div>
        </div>

        <Icon styleName="icon" name="remove"/>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Contact;
