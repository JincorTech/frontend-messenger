import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import Icon from '../../common/Icon';
import SearchInput from '../SearchInput';

/**
 * Types
 */

export type Props = {
  searchable: boolean
  showSearchInput: () => void
  hideSearchInput: () => void
  showSearchResults: () => void
  hideSearchResults: () => void
};

/**
 * Component
 */

const RoomsHeader: SFC<Props> = (props) => {
  const {
    searchable,
    showSearchInput,
    hideSearchInput
  } = props;

  return (
    <header styleName="header">
      {!searchable && <div styleName="menu">
        <button styleName="button" type="button">
          <Icon name="user"/>
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
          <SearchInput placeholder="Поиск по диалогам" onRemove={hideSearchInput}/>
        </div>}
    </header>
  );
};

export default RoomsHeader;
