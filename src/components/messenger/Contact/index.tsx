import * as React from 'react';
import { SFC, HTMLProps } from 'react';

import './styles.css';

import Avatar from '../Avatar';
import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = HTMLProps<HTMLDivElement> & {
  id: string
  src?: string
  fullName: string
  company: string
  role: string
};

/**
 * Component
 */

const Contact: SFC<Props> = (props) => {
  const {
    id,
    src,
    fullName,
    company,
    role
  } = props;

  return (
    <div styleName="contact" title={`${fullName} | ${company} - ${role}`}>
      <div styleName="avatar">
        <Avatar type="dialog" src={src} fullName={fullName} id={id}/>
      </div>

      <div styleName="body">
        <div styleName="wrapper">
          <div styleName="fullname">{fullName}</div>
          <div styleName="info">
            <div styleName="company">{company}</div>
            <div styleName="role">{role}</div>
          </div>
        </div>

        <Icon styleName="icon" name="contact-arrow"/>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Contact;
