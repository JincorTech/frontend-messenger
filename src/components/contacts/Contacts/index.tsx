import * as React from 'react';
import { SFC, MouseEvent } from 'react';
import { translate } from 'react-i18next';

import './styles.css';

import {
  Contact as ContactProps,
  Pagination as PaginationProps
} from '../../../redux/modules/contacts/contacts';

import Scrollbars from 'react-custom-scrollbars';
import SearchInput from '../../messenger/SearchInput';
import Contact from '../Contact';

import { filterContacts } from '../../../helpers/contacts/filter';

/**
 * Types
 */

export type Props = {
  contacts: ContactProps[]
  pagination: PaginationProps
  search: string
  onClickNewContact: () => void
  removeContact: (e: MouseEvent<HTMLSpanElement>, userId: string) => void
  onContactClick: (matrixId: string) => void
  onChangeSearchQuery: (value: string) => void
  onResetSearchQuery: () => void,
  t: Function
};

/**
 * Component
 */

const Contacts: SFC<Props> = (props) => {
  const {
    t,
    contacts,
    search,
    onClickNewContact,
    removeContact,
    onContactClick,
    onChangeSearchQuery,
    onResetSearchQuery
  } = props;

  const filteredContacts = filterContacts(contacts, search, ['firstName', 'lastName', 'companyName', 'position']);

  return (
    <div styleName="contacts">
      <div styleName="wrapper">
        <div styleName="title">{t('contacts')}</div>

        <div styleName="add">
          <a onClick={() => onClickNewContact()}>
            <span styleName="plus-icon"/> {t('newContact')}
          </a>
        </div>

        <div styleName="search">
          <SearchInput
            placeholder="Поиск"
            value={search}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            onRemove={onResetSearchQuery}
            hideRemoveIfValueEmpty/>
        </div>

        <div>
          <Scrollbars style={{height: 'calc(100vh - 250px)'}}>
            {filteredContacts.map((c) =>
              <Contact
                key={c.id}
                {...c}
                onRemove={removeContact}
                onContactClick={onContactClick}/>)}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

/**
 * Export
 */

const TranslatedComponent = translate('contacts')(Contacts);

export default TranslatedComponent;
