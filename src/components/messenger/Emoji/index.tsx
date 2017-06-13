import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import Emojify from 'react-emojione';
import './styles.css';

export type Props = HTMLProps<HTMLImageElement> & {
  name: string
  small?: boolean
};

const Emoji: SFC<Props> = ({ name, small, className, ...imgProps }) => (
  <span className={className} styleName="emoji">
    <Emojify children={`:${name}:`}/>
  </span>
);

Emoji.defaultProps = {
  small: false
};

export default Emoji;
