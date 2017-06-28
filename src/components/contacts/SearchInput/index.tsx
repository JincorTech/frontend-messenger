import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import ProgressBar from 'react-redux-loading-bar';

/**
 * Types
 */

export type Props = {
  search: string
  loadingBar: number
  onChangeSearchQuery: (query: string) => void
};

/**
 * Component
 */

const SearchInput: SFC<Props> = (props) => {
  const {
    search,
    loadingBar,
    onChangeSearchQuery
  } = props;

  return (
    <div styleName="search">
      <div styleName="icon"/>
      <input
        styleName="input"
        type="text"
        placeholder="Введите email пользователя"
        value={search}
        onChange={(e) => onChangeSearchQuery(e.target.value)}/>

      <div>
        {!!loadingBar
          && <ProgressBar
            style={{
              backgroundColor: '#0070e0',
              height: '2px',
              bottom: '-2px',
              transition: 'transform 500ms linear'
            }}/>
        }
      </div>
    </div>
  );
};

/**
 * Export
 */

export default SearchInput;
