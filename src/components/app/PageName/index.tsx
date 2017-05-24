import * as React from 'react';
import { SFC, HTMLProps } from 'react';

export type Props = HTMLProps<HTMLSpanElement> & {
  pathname: string
};

const PageName: SFC<Props> = ({ pathname, children, ...spanProps }) => (
  <span {...spanProps}>
    {pathname}
  </span>
);

export default PageName;
