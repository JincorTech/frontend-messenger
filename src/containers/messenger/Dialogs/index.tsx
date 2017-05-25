import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import './styles.css';
import Scrollbars from 'react-custom-scrollbars';

import Icon from '../../../components/common/Icon';
import SearchInput from '../../../components/messenger/SearchInput';
import Dialog from '../../../components/messenger/UserDialog';
import Channel from '../../../components/messenger/ChannelDialog';
import Inquiry from '../../../components/messenger/InquiryDialog';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  search: boolean
  height: number
};

/**
 * Component
 */
const Dialogs: SFC<Props> = (props) => {
  const { search, height, children, className, ...divProps } = props;
  const contentHeight = height - 65;

  return (
    <div styleName="dialogs" className={className} {...divProps}>
      <div styleName="header">
        {!search && <div styleName="menu">
          <Icon name="user"/>
          <Icon styleName="chat" name="chat"/>
          <Icon name="search"/>
        </div>}

        {search && <SearchInput placeholder="Поиск"/>}
      </div>

      <Scrollbars
        autoHide
        styleName="custom-scrollbar"
        style={{height: contentHeight, width: 'calc(100% + 25px)'}}>
        <div styleName="dialog-list">
          <Channel
            id="test0"
            name="Альфа Банг"
            preview="Завтра состоится капустник, поэтому просим всех быть на работе не позже…"/>

          <Inquiry
            id="test20"
            name="Обращения"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test1"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test2"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test3"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test4"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test5"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>

          <Dialog
            src=""
            id="test6"
            fullName="Александр Пушкин"
            preview="Добрый день. Вас беспокоит отдел продаж компании “Норникель”. Мы хот..."/>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Dialogs;
