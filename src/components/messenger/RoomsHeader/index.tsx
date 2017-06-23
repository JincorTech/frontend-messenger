import * as React from 'react';
import { SFC } from 'react';

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
  openContacts: () => void
};

/**
 * Component
 */

const RoomsHeader: SFC<Props> = (props) => {
  const {
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

        <button styleName="button" type="button">
          <Icon name="chat"/>
        </button>

        <button styleName="button" type="button">
          <Icon name="search" onClick={() => showSearchInput()}/>
        </button>
      </div>}

      {searchable &&
        <div styleName="search">
          <SearchInput
            placeholder="Поиск по диалогам"
            value={search}
            onChange={(e) => changeSearchQuery(e.target.value)}
            onRemove={resetSearchQuery}/>
        </div>}
    </header>
  );
};

export default RoomsHeader;
