import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

/**
 * Types
 */

export type Props = {

};

/**
 * Component
 */

const SearchInput: SFC<Props> = (props) => {
  return (
    <div styleName="search">
      <div styleName="icon"/>
      <input styleName="input" type="text" placeholder="Введите email пользователя"/>
    </div>
  );
};

/**
 * Export
 */

export default SearchInput;
