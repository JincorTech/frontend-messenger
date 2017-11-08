import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { translate } from 'react-i18next';

const { container, line, caption } = require('./styles.css');

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  t: Function
};

/**
 * Component
 * @param props
 */
const UnreadSeparator: SFC<Props> = (props) => {
  const { t } = props;

  return (
    <div className={container}>
      <hr className={line}/><span className={caption}>{t('newMessages')}</span>
    </div>
  );
};

const TranslatedComponent = translate('messenger')(UnreadSeparator);

export default TranslatedComponent;
