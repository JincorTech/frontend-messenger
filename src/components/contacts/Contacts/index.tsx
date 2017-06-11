import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import Scrollbars from 'react-custom-scrollbars';
import SearchInput from '../../messenger/SearchInput';
import Contact from '../Contact';

/**
 * Types
 */

export type Props = {

};

/**
 * Temporary data mock
 */

const CONTACTS = [
  {
    id: '1',
    src: '',
    fullName: 'Космодесантник Хаоса',
    role: 'Космодесантник',
    company: 'Хаос'
  },
  {
    id: '2',
    src: '',
    fullName: 'Содомит Содомитыч',
    role: 'jQuery прогромист',
    company: 'ИП Содом и Гаморра'
  },
  {
    id: '3',
    src: '',
    fullName: 'Васька Кот',
    role: 'Кот простой',
    company: 'Google Russia'
  },
  {
    id: '4',
    src: '',
    fullName: 'Адский сотона, который все забивает до отказа',
    role: 'Проверятель интерфейсов на оверфлоу что поделать как жить',
    company: 'Свободный художник, фрилансер, гик, инстраграммер 2.0 из Барнаула алло'
  },
  {
    id: '11',
    src: '',
    fullName: 'Космодесантник Хаоса',
    role: 'Космодесантник',
    company: 'Хаос'
  },
  {
    id: '22',
    src: '',
    fullName: 'Содомит Содомитыч',
    role: 'jQuery прогромист',
    company: 'ИП Содом и Гаморра'
  },
  {
    id: '33',
    src: '',
    fullName: 'Васька Кот',
    role: 'Кот простой',
    company: 'Google Russia'
  },
  {
    id: '44',
    src: '',
    fullName: 'Адский сотона, который все забивает до отказа',
    role: 'Проверятель интерфейсов на оверфлоу что поделать как жить',
    company: 'Свободный художник, фрилансер, гик, инстраграммер 2.0 из Барнаула алло'
  },
  {
    id: '12',
    src: '',
    fullName: 'Космодесантник Хаоса',
    role: 'Космодесантник',
    company: 'Хаос'
  },
  {
    id: '23',
    src: '',
    fullName: 'Содомит Содомитыч',
    role: 'jQuery прогромист',
    company: 'ИП Содом и Гаморра'
  },
  {
    id: '34',
    src: '',
    fullName: 'Васька Кот',
    role: 'Кот простой',
    company: 'Google Russia'
  },
  {
    id: '45',
    src: '',
    fullName: 'Адский сотона, который все забивает до отказа',
    role: 'Проверятель интерфейсов на оверфлоу что поделать как жить',
    company: 'Свободный художник, фрилансер, гик, инстраграммер 2.0 из Барнаула алло'
  },
  {
    id: '134',
    src: '',
    fullName: 'Космодесантник Хаоса',
    role: 'Космодесантник',
    company: 'Хаос'
  },
  {
    id: '234',
    src: '',
    fullName: 'Содомит Содомитыч',
    role: 'jQuery прогромист',
    company: 'ИП Содом и Гаморра'
  },
  {
    id: '344',
    src: '',
    fullName: 'Васька Кот',
    role: 'Кот простой',
    company: 'Google Russia'
  },
  {
    id: '454',
    src: '',
    fullName: 'Адский сотона, который все забивает до отказа',
    role: 'Проверятель интерфейсов на оверфлоу что поделать как жить',
    company: 'Свободный художник, фрилансер, гик, инстраграммер 2.0 из Барнаула алло'
  }
];

/**
 * Component
 */

const Contacts: SFC<Props> = (props) => {
  return (
    <div styleName="contacts">
      <div styleName="wrapper">
        <div styleName="title">Контакты</div>

        <div styleName="add">
          <a href="javascript:void(0);">
            <span styleName="plus-icon"/> Новый контакт
          </a>
        </div>

        <div styleName="search">
          <SearchInput placeholder="Поиск"/>
        </div>

        <div>
          <Scrollbars style={{height: 'calc(100vh - 250px)'}}>
            {CONTACTS.map((c) => <Contact key={c.id} {...c}/>)}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

/**
 * Export
 */

export default Contacts;
