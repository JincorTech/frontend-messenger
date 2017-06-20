import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

/**
 * Types
 */

export type Props = {
  title: string
  count: number
};

/**
 * Component
 */

const SearchGroup: SFC<Props> = (props) => {
  const {
    title,
    count,
    children
  } = props;

  return (
    <div>
      <div styleName="header">{title} ({count})</div>
      <div>{children}</div>
    </div>
  );
};

/**
 * Export
 */

export default SearchGroup;
