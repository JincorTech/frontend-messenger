import * as React from 'react';
import { SFC } from 'react';
import { translate } from 'react-i18next';

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
  onOpenRoom: (matrixId: string) => void,
  t: Function
};

/**
 * Component
 */

const NewContact: SFC<Props> = (props) => {
  const {
    t,
    step,
    search,
    loadingBar,
    users,
    onBackFromFirstStep,
    onChangeSearchQuery,
    onAddToContacts,
    onRemoveFromContacts,
    onOpenRoom
  } = props;

  const renderComponent = (step) => {
    switch (step) {
      case 'not-found':
        return (
          <div styleName="message">
            <div styleName="not-found">{t('userNotFound')}</div>
            <div styleName="button">
              <button type="button" styleName="invite">{t('invite')} <span styleName="invite-icon"/></button>
            </div>
          </div>
        );

      case 'spinner':
        return (
          <div styleName="message">
            <div styleName="not-found">{t('userNotFound')}</div>
            <div styleName="spinner"><Spinner color="#333"/></div>
          </div>
        );

      case 'invite-success':
        return (
          <div styleName="message">
            <div>{t('invitationSent')}<br/>{t('inviteHint')}</div>
          </div>
        );

      case 'results':
        return (
          <div styleName="result">
            {users.map((c) => <SearchContact
              key={c.id}
              {...c}
              onAddToContacts={onAddToContacts}
              onRemoveFromContacts={onRemoveFromContacts}
              onOpenRoom={onOpenRoom}/>)}
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
        <div styleName="title">{t('addNewContact')}</div>

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

const TranslatedComponent = translate('contacts')(NewContact);

export default TranslatedComponent;
