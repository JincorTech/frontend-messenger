import * as React from 'react';
import { SFC } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './styles.css';

import { StateMap as StateProps } from '../../../redux/modules/app/employeeCard';
import { Props as PopupProps } from '../../../components/common/Popup';

import { closeEmployeeCard } from '../../../redux/modules/app/employeeCard';

import Popup from '../../../components/common/Popup';
import CardAvatar from '../../../components/app/CardAvatar';

/**
 * Types
 */

export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  StateProps &
  DispatchProps & {
    t: Function
  };

export type DispatchProps = {
  closeEmployeeCard: () => void
};

/**
 * Component
 */

const EmployeeCard: SFC<Props> = (props) => {
  const {
    t,
    open,
    closeEmployeeCard,
    employee
  } = props;

  const {
    id,
    avatar,
    name,
    firstName,
    lastName,
    position,
    companyName,
    companyLogo
  } = employee;

  return (
    <Popup
      styleName="employee-card"
      modalId="employee-card"
      open={open}
      onClose={closeEmployeeCard}>
      <CardAvatar
        type="employee"
        avatar={avatar}
        id={id}
        name={name}
        firstName={firstName}
        lastName={lastName}
        position={position}
        companyName={companyName}
        companyLogo={companyLogo}>
        <div styleName="buttons">
          <button type="button">{t('message')}</button>
          <button type="button">{t('addToContacts')}</button>
          <button type="button">{t('suspend')}</button>
        </div>
      </CardAvatar>
    </Popup>
  );
};

/**
 * Export
 */

const TranslatedComponent = translate('app')(EmployeeCard);

export default connect(
  (state) => state.app.employeeCard,
  {
    closeEmployeeCard
  }
)(TranslatedComponent);
