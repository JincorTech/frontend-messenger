import * as React from 'react';
import { SFC, HTMLProps } from 'react';

import UserAvatar from '../UserAvatar';
import DialogItem from '../DialogItem';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  src: string
  id: string
  fullName: string
  preview: string
};

/**
 * Component
 */
const UserDialog: SFC<Props> = (props) => {
  const { fullName, id, src, preview, ...divProps } = props;
  const avatar = <UserAvatar
    id={id}
    src={src}
    fullName={fullName}/>;

  return <DialogItem
    name={fullName}
    avatar={avatar}
    preview={preview}
    writeable
    {...divProps}/>;
};

export default UserDialog;
