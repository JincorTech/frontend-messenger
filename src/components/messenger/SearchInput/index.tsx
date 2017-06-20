import * as React from 'react';
import { SFC } from 'react';
import './styles.css';

import Input, { Props as InputProps } from '../../common/Input';
import Icon from '../../common/Icon';

/**
 * Types
 */
export type Props = InputProps & JSX.IntrinsicClassAttributes<InputProps> & {
  onRemove?: Function
};

/**
 * Component
 */
const SearchInput: SFC<Props> = ({ onRemove, className, ...props}) => (
  <div styleName="search">
    <Icon
      styleName="search-icon"
      name="search-light"/>

    <Input styleName="search-field" className={className} {...props}/>

    <div
      styleName="clear-value"
      onClick={() => onRemove()}/>
  </div>
);

export default SearchInput;
