import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import CardAvatar from '../../app/CardAvatar';

/**
 * Types
 */

export type Props = {
  avatar: string
  id: string
  name: string
  firstName: string
  lastName: string
  position: string
  companyName: string
  companyLogo: string
};

/**
 * Component
 */

const SearchContact: SFC<Props> = (props) => {
  const {
    avatar,
    id,
    name,
    firstName,
    lastName,
    position,
    companyName,
    companyLogo
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
          <button type="button">Сообщение</button>
          <button type="button">Добавить в контакты</button>
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
