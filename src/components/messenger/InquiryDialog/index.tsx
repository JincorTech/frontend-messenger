import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { getBackgroundColor } from '../../../utils/colorFunction';
import './styles.css';

import DialogItem from '../DialogItem';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  src?: string
  id: string
  name: string
  preview: string
};

/**
 * Component
 */
const InquiryDialog: SFC<Props> = (props) => {
  const { src, id } = props;
  const avatar = src
    ? <img src={src}/>
    : <div styleName="empty" style={getBackgroundColor(id)}/>;

  return <DialogItem avatar={avatar} {...props}/>;
};

export default InquiryDialog;
