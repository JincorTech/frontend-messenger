import * as React from 'react';
import { SFC } from 'react';
import { translate } from 'react-i18next';

import './styles.css';

import Icon from '../../common/Icon';
import SearchInput from '../SearchInput';

/**
 * Types
 */

export type Props = {
  search: string
  searchable: boolean
  showSearchInput: () => void
  hideSearchInput: () => void
  changeSearchQuery: (query: string) => void
  resetSearchQuery: () => void
  openContacts: () => void,
  t: Function
};

/**
 * Constants
 */

export const HEIGHT = 59;

/**
 * Component
 */

const RoomsHeader: SFC<Props> = (props) => {
  const {
    t,
    search,
    searchable,
    showSearchInput,
    changeSearchQuery,
    resetSearchQuery,
    openContacts
  } = props;

  return (
    <header styleName="header">
      {!searchable && <div styleName="menu">
        <button styleName="button" type="button">
          <Icon name="user" onClick={() => openContacts()}/>
        </button>

        <button styleName="chat-button" type="button">
          <Icon name="chat" title="Group chats coming soon"/>
        </button>

        <button styleName="button" type="button">
          <Icon name="search" onClick={() => showSearchInput()}/>
        </button>
      </div>}

      {searchable &&
        <div styleName="search">
          <SearchInput
            placeholder={t('searchInConversations')}
            value={search}
            onChange={(e) => changeSearchQuery(e.target.value)}
            onRemove={resetSearchQuery}/>
        </div>}
    </header>
  );
};

const TranslatedComponent = translate('messenger')(RoomsHeader);

export default TranslatedComponent;
