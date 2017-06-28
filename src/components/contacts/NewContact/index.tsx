import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import {
  Step as StepProps,
  User as UserProps,
  AddContactReq as AddContactReqProps
} from '../../../redux/modules/contacts/newContact';

import SearchInput from '../SearchInput';
import SearchContact from '../SearchContact';
import Spinner from '../../common/Spinner';

/**
 * Types
 */

export type Props = {
  step: StepProps
  search: string
  loadingBar: number
  users: UserProps[]
  onBackFromFirstStep: () => void
  onChangeSearchQuery: (query: string) => void
  onAddToContacts: (request: AddContactReqProps) => void
  onRemoveFromContacts: (userId: string) => void
};

/**
 * Component
 */

const NewContact: SFC<Props> = (props) => {
  const {
    step,
    search,
    loadingBar,
    users,
    onBackFromFirstStep,
    onChangeSearchQuery,
    onAddToContacts,
    onRemoveFromContacts
  } = props;

  const renderComponent = (step) => {
    switch (step) {
      case 'not-found':
        return (
          <div styleName="message">
            <div styleName="not-found">Пользователь с данным Email не зарегистрирован на Jincor</div>
            <div styleName="button">
              <button type="button" styleName="invite">Пригласить <span styleName="invite-icon"/></button>
            </div>
          </div>
        );

      case 'spinner':
        return (
          <div styleName="message">
            <div styleName="not-found">Пользователь с данным Email не зарегистрирован на Jincor</div>
            <div styleName="spinner"><Spinner color="#333"/></div>
          </div>
        );

      case 'invite-success':
        return (
          <div styleName="message">
            <div>Приглашение отправлено!<br/>Когда пользователь зарегистрируется на Jincor, он будет автоматически добавлен в Ваш раздел Контакты.</div>
          </div>
        );

      case 'results':
        return (
          <div styleName="result">
            {users.map((c) => <SearchContact
              key={c.id}
              {...c}
              onAddToContacts={onAddToContacts}
              onRemoveFromContacts={onRemoveFromContacts}/>)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div styleName="new-contact">
      <button type="button" styleName="back-button" onClick={() => onBackFromFirstStep()}/>

      <div>
        <div styleName="title">Добавить новый контакт</div>

        <div styleName="search">
          <SearchInput
            search={search}
            loadingBar={loadingBar}
            onChangeSearchQuery={onChangeSearchQuery}/>
        </div>

        {renderComponent(step)}
      </div>
    </div>
  );
};

/**
 * Export
 */

export default NewContact;
