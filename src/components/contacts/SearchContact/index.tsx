import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import {
  User as UserProps,
  AddContactReq as AddContactReqProps
 } from '../../../redux/modules/contacts/newContact';

import CardAvatar from '../../app/CardAvatar';

/**
 * Types
 */

export type Props = UserProps & DispatchProps;

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
          <button type="button" onClick={() => onOpenRoom(matrixId)}>Сообщение</button>
          {added
            ? <button type="button" onClick={() => onRemoveFromContacts(id)}>Удалить из контактов</button>
            : <button type="button" onClick={() => onAddToContacts({ email, companyId })}>Добавить в контакты</button>}
          <button type="button">Заблокировать</button>
        </div>
      </CardAvatar>
    </div>
  );
};

/**
 * Export
 */

export default SearchContact;
