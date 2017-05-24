import * as React from 'react';
import { Component, HTMLProps } from 'react';
import './styles.css';
import Scrollbars from 'react-custom-scrollbars';

import Icon from '../../../components/common/Icon';
import Emoji from '../../../components/messenger/Emoji';
import SearchInput from '../../../components/messenger/SearchInput';
import MessageWrapper from '../../../components/messenger/MessageWrapper';
import ContentEditable from '../../../components/messenger/ContentEditable';
import EmojiSelect from '../EmojiSelect';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  name: string
  company: string
  search: boolean
  height: number
};

export type State = {
  contentHeight: number
};

const messages = [{
  date: '11:00',
  content: 'Всякий раз, когда вы в отчаянии или на грани отчаяния, когда у вас неприятности или затруднения, помните: это жизнь говорит с вами на единственном хорошо ей известном языке.',
  unread: true,
  favorite: true
}, {
  date: '12:01',
  content: 'Всякий раз, когда вы в отчаянии или на грани отчаяния, когда у вас неприятности или затруднения, помните: это жизнь говорит с вами на единственном хорошо ей известном языке.',
  unread: true,
  favorite: true
}, {
  date: '14:01',
  content: 'Чувства, оттенки, мысли, восприятия, которые остаются неназванными, непроизнесенными и не довольствуются приблизительностью формулировок, скапливаются внутри индивидуума и могут привести к психологическому взрыву или срыву.',
  unread: false,
  favorite: false
}];

/**
 * Component
 */
class Messeges extends Component<Props, State> {
  private footer: HTMLDivElement;
  public state: State = {
    contentHeight: 0
  };

  constructor(props) {
    super(props);

    this.updateHeight = this.updateHeight.bind(this);
  }

  public componentDidMount(): void {
    const { height } = this.props;

    this.updateHeight(height);
  }

  public componentWillReceiveProps({ height }: Props): void {
    this.updateHeight(height);
  }

  private updateHeight(height: number): void {
    console.log(this.footer.clientHeight);
    const contentHeight = height - 65 - 50; // headerHeight

    this.setState({ contentHeight });
  }

  public render(): JSX.Element {
    const { name, company, search, children, ...divProps } = this.props;
    const { contentHeight } = this.state;

    return (
      <div styleName="messeges" {...divProps}>
        <div styleName="header">
          {!search && <div styleName="name">
            {name}
            <span styleName="company">@ {company}</span>
          </div>}

          {search && <div styleName="search-input">
            <SearchInput placeholder="Поиск по сообщениям"/>
          </div>}

          {!search && <Icon styleName="search" name="search"/>}
          <Icon styleName="settings" name="settings"/>
        </div>

        <div styleName="content">
          <Scrollbars autoHide style={{ height: contentHeight }}>
            <MessageWrapper
              id="test"
              company="David inc."
              fullName="David Totraev"
              src=""
              messages={messages}/>

            <MessageWrapper
              id="test"
              company="David inc."
              fullName="Vagan Abelyan"
              src=""
              messages={messages}/>
          </Scrollbars>
        </div>

        <div ref={(footer) => this.footer = footer} styleName="footer">
          <ContentEditable>sds <Emoji name="rage" small/></ContentEditable>
          <EmojiSelect open currentGroup="animals"/>
        </div>
      </div>
    );
  }
}

export default Messeges;
