import * as React from 'react';
import { SFC } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './styles.css';

import { StateMap as StateProps } from '../../../redux/modules/app/employeeCard';
import { Props as PopupProps } from '../../../components/common/Popup';
import { AddContactReq as AddContactReqProps } from '../../../redux/modules/contacts/newContact';

import { closeEmployeeCard } from '../../../redux/modules/app/employeeCard';
import { addContact, removeContact } from '../../../redux/modules/contacts/newContact';
import { selectRoom } from '../../../redux/modules/messenger/rooms';

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
  selectRoom: (matrixId: string) => void
  addContact: (user: AddContactReqProps) => void
  removeContact: (userId: string) => void
};

/**
 * Component
 */

const EmployeeCard: SFC<Props> = (props) => {
  const {
    t,
    open,
    closeEmployeeCard,
    selectRoom,
    addContact,
    removeContact,
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
    companyLogo,
    companyId,
    email,
    matrixId,
    added
  } = employee;

  const openRoom = () => {
    selectRoom(matrixId);
    closeEmployeeCard();
  };

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
          <button type="button" onClick={() => openRoom()}>{t('message')}</button>
          {added
            ? <button type="button" onClick={() => removeContact(id)}>{t('removeFromContacts')}</button>
            : <button type="button" onClick={() => addContact({ email, companyId })}>{t('addToContacts')}</button>}
        </div>
      </CardAvatar>
    </Popup>
  );
};

/**
 * Export
 */

const TranslatedComponent = translate('app', 'contacts')(EmployeeCard);

export default connect(
  (state) => state.app.employeeCard,
  {
    closeEmployeeCard,
    addContact,
    removeContact,
    selectRoom
  }
)(TranslatedComponent);
