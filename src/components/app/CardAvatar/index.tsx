import * as React from 'react';
import { SFC } from 'react';
import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';

import './styles.css';

import { BottomView as BottomViewProps } from '../../../redux/modules/app/profileCard';

import CompanyLogo from '../../common/CompanyLogo';

/**
 * Types
 */

export type Props = {
  type?: 'employee' | 'user'
  avatar: string
  id: string
  name: string
  firstName: string
  lastName: string
  position: string
  bottomView?: BottomViewProps
  companyName: string
  companyLogo: string
};

/**
 * Component
 */

const CardAvatar: SFC<Props> = (props) => {
  const {
    type,
    avatar,
    id,
    name,
    firstName,
    lastName,
    position,
    bottomView,
    companyName,
    companyLogo,
    children
  } = props;

  return (
    <div styleName={type}>
      {avatar
        ? <div styleName="wrapper">
            <div styleName="blackout"/>
            <img styleName="avatar" src={avatar}/>
          </div>
        : <div styleName="wrapper">
            <div styleName="blackout-empty"/>
            <div styleName="avatar-empty" style={getBackgroundColor(id)}>{getInitials(name)}</div>
          </div>}

      <div styleName={bottomView !== 'profile-form' ? 'company' : 'company-hidden'}>
        <div styleName="company-name">{companyName}</div>
        <div styleName={companyLogo ? 'company-logo' : 'company-logo-empty'}>
          <CompanyLogo src={companyLogo} borderRadius="0 4px"/>
        </div>
      </div>

      <div styleName={bottomView !== 'profile-form' ? 'info' : 'info-hidden'}>
        <div styleName="name">{firstName}</div>
        <div styleName="name">{lastName}</div>
        <div styleName="position">{position}</div>
      </div>

      {children}
    </div>
  );
};

CardAvatar.defaultProps = {
  type: 'user'
};

/**
 * Export
 */

export default CardAvatar;
