import * as React from 'react';
import { SFC } from 'react';
import './styles.css';

import Input, { Props as InputProps } from '../../common/Input';
import Icon from '../../common/Icon';

/**
 * Types
 */
export type Props = InputProps & JSX.IntrinsicClassAttributes<InputProps> & {
  value?: string
  onRemove?: () => void
  onChange?: (value: string) => void
  hideRemoveIfValueEmpty?: boolean
};

/**
 * Component
 */
const SearchInput: SFC<Props> = ({ onRemove, value, hideRemoveIfValueEmpty, className, ...props}) => (
  <div styleName="search">
    <Icon
      styleName="search-icon"
      name="search-light"/>

    <Input styleName="search-field" value={value} className={className} {...props}/>

    {!(hideRemoveIfValueEmpty && !Boolean(value.length))
      && <div
        styleName="clear-value"
        onClick={() => onRemove()}/>}
  </div>
);

SearchInput.defaultProps = {
  hideRemoveIfValueEmpty: false
};

export default SearchInput;
