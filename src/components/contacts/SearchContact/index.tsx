import * as React from 'react';
import { SFC } from 'react';
import { translate } from 'react-i18next';

import './styles.css';

import {
  User as UserProps,
  AddContactReq as AddContactReqProps
 } from '../../../redux/modules/contacts/newContact';

import CardAvatar from '../../app/CardAvatar';

/**
 * Types
 */

export type Props = UserProps & DispatchProps & {
  t: Function
};

export type DispatchProps = {
  onAddToContacts: (user: AddContactReqProps) => void
  onRemoveFromContacts: (userId: string) => void
  onOpenRoom: (matrixId: string) => void
};

/**
 * Component
 */

const SearchContact: SFC<Props> = (props) => {
  const {
    t,
    avatar,
    id,
    matrixId,
    name,
    firstName,
    lastName,
    email,
    position,
    companyName,
    companyLogo,
    companyId,
    added,
    onAddToContacts,
    onRemoveFromContacts,
    onOpenRoom
  } = props;

  return (
    <div styleName="employee-card">
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
          <button type="button" onClick={() => onOpenRoom(matrixId)}>{t('message')}</button>
          {added
            ? <button type="button" onClick={() => onRemoveFromContacts(id)}>{t('removeFromContacts')}</button>
            : <button type="button" onClick={() => onAddToContacts({ email, companyId })}>{t('addToContacts')}</button>}
        </div>
      </CardAvatar>
    </div>
  );
};

/**
 * Export
 */

const TranslatedComponent = translate('contacts')(SearchContact);

export default TranslatedComponent;
