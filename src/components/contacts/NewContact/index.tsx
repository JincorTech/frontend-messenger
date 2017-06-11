import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import SearchInput from '../SearchInput';
import SearchContact from '../SearchContact';
import Spinner from '../../common/Spinner';

/**
 * Types
 */

export type Props = {
  step: number
};

const contacts = [
  {
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    id: '1',
    name: 'Lauren Mayberry',
    firstName: 'Lauren',
    lastName: 'Mayberry',
    position: 'Singer',
    companyName: 'Netflix',
    companyLogo: 'https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/06/Netflix-Old-Logo.png'
  },
  {
    avatar: 'http://i.imgur.com/kJUdCE6.png',
    id: '2',
    name: 'Harold Payne',
    firstName: 'Harold',
    lastName: 'Payne',
    position: 'Pain hidder',
    companyName: 'R Generation',
    companyLogo: 'https://s-media-cache-ak0.pinimg.com/736x/5f/1d/54/5f1d547fceeae7a1a49d30f4f053dd0b.jpg'
  },
  {
    avatar: 'https://static.gigwise.com/artists/alex325turnerglast.jpg',
    id: '3',
    name: 'Alex Turner',
    firstName: 'Alex',
    lastName: 'Turner',
    position: 'HTML Developer',
    companyName: '99 degrees',
    companyLogo: 'https://99designs.com/og-image.png'
  },
  {
    avatar: 'https://s-media-cache-ak0.pinimg.com/736x/32/90/09/32900935b8b61b23b7417294286798a0.jpg',
    id: '4',
    name: 'Lana Del Rey',
    firstName: 'Lana',
    lastName: 'Del Rey',
    position: 'CEO',
    companyName: 'Flovely',
    companyLogo: 'https://99designs-start-assets.imgix.net/images/examples/attachment_63980519-880097bc.png?auto=format&ch=Width%2CDPR&w=250&h=250'
  },
  {
    avatar: 'https://static.gigwise.com/artists/cyrilhahn325.jpg',
    id: '5',
    name: 'Albert Hammond Jr',
    firstName: 'Albert',
    lastName: 'Hammond',
    position: 'CEO',
    companyName: 'Netflix',
    companyLogo: 'https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/06/Netflix-Old-Logo.png'
  },
  {
    avatar: '',
    id: '6',
    name: 'Space Invader',
    firstName: 'Space',
    lastName: 'Invader',
    position: 'CEO',
    companyName: 'Flovely',
    companyLogo: 'https://99designs-start-assets.imgix.net/images/examples/attachment_63980519-880097bc.png?auto=format&ch=Width%2CDPR&w=250&h=250'
  },
  {
    avatar: 'https://s-media-cache-ak0.pinimg.com/736x/9b/bc/79/9bbc79cc6aadb16dca9331daacbb256f.jpg',
    id: '7',
    name: 'John Lennon',
    firstName: 'John',
    lastName: 'Lennon',
    position: 'Guirats',
    companyName: 'R Generation',
    companyLogo: 'https://s-media-cache-ak0.pinimg.com/736x/5f/1d/54/5f1d547fceeae7a1a49d30f4f053dd0b.jpg'
  }
];

/**
 * Component
 */

const NewContact: SFC<Props> = (props) => {
  const { step } = props;

  const renderComponent = (step) => {
    switch (step) {
      case 1:
        return (
          <div styleName="message">
            <div styleName="not-found">Пользователь с данным Email не зарегистрирован на Jincor</div>
            <div styleName="button">
              <button type="button" styleName="invite">Пригласить <span styleName="invite-icon"/></button>
            </div>
          </div>
        );

      case 2:
        return (
          <div styleName="message">
            <div styleName="not-found">Пользователь с данным Email не зарегистрирован на Jincor</div>
            <div styleName="spinner"><Spinner color="#333"/></div>
          </div>
        );

      case 3:
        return (
          <div styleName="message">
            <div>Приглашение отправлено!<br/>Когда пользователь зарегистрируется на Jincor, он будет автоматически добавлен в Ваш раздел Контакты.</div>
          </div>
        );

      case 4:
        return (
          <div styleName="result">
            {contacts.map((c) => <SearchContact key={c.id} {...c}/>)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div styleName="new-contact">
      <button type="button" styleName="back-button"/>

      <div>
        <div styleName="title">Добавить новый контакт</div>

        <div styleName="search">
          <SearchInput/>
        </div>

        {renderComponent(step)}

        {/*<div styleName="message">
          <div styleName="not-found">Пользователь с данным Email не зарегестрирован на Jincor</div>
          <div styleName="button">
            <button type="button" styleName="invite">Пригласить <span styleName="invite-icon"/></button>
          </div>
        </div>*/}

        {/*<div styleName="message">
          <div styleName="not-found">Пользователь с данным Email не зарегестрирован на Jincor</div>
          <div styleName="spinner"><Spinner color="#333"/></div>
        </div>*/}

        {/*<div styleName="message">
          <div>Приглашение отправлено!<br/>Когда пользователь зарегистрируется на Jincor, он будет автоматически добавлен в Ваш раздел Контакты.</div>
        </div>

        <div styleName="result">
          {contacts.map((c) => <SearchContact key={c.id} {...c}/>)}
        </div>*/}
      </div>
    </div>
  );
};

/**
 * Export
 */

export default NewContact;
