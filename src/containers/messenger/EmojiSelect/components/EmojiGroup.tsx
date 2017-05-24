import * as React from 'react';
import { PureComponent, HTMLProps } from 'react';
import '../styles.css';

import { emojiList } from '../../../../utils/emoji';

import Emoji from '../../../../components/messenger/Emoji';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  name: string
};

/**
 * Components
 */
class EmojiGroup extends PureComponent<Props, {}> {
  private waypoint: any;

  public render(): JSX.Element {
    const { name } = this.props;

    return (
      <div styleName="group" ref={(wp) => this.waypoint = wp}>
        {emojiList(name).map((emojiName) => (
          <Emoji
            key={emojiName}
            styleName="emoji"
            name={emojiName}/>
        ))}
      </div>
    );
  }
}

/**
 * Decorators
 */
export default EmojiGroup;
