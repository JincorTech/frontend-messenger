import * as React from 'react';
import { SFC } from 'react';

import SearchGroup from '../SearchGroup';
// import Room from '../Room';
import Contact from '../Contact';

/**
 * Types
 */

export type Props = {
  searchable: boolean
  resultsVisible: boolean
  rooms: any[]
  searchResults: any[]
};

/**
 * Component
 */

const SearchRooms: SFC<Props> = (props) => {
  return (
    <div>
      <SearchGroup title="Чаты" count={4}>
        {/*<Room
          type="dialog"
          id="5"
          title="Николай Басков"
          preview="Pricelist-2017.docx"
          time="Yesterday"
          last="Вы"
          unreadIn={false}
          unreadOut={true}/>

        <Room
          type="dialog"
          id="6"
          title="Артур Пирожков"
          preview="Иконки присылай в бутылках. Шрифты отправь в банках. А банки в бутылках..."
          time="Yesterday"
          unreadIn={false}
          unreadOut={false}/>

        <Room
          type="dialog"
          id="7"
          title="Елена Ваенга"
          preview="Вино продаем, мы же банк. Кредиты не выдаем, мы не винодельня. И вообще..."
          time="15/03/2017"
          unreadIn={false}
          unreadOut={false}/>

        <Room
          type="dialog"
          id="8"
          title="Михаил Шуфутинский"
          preview="Тинькофф нас обгонит скоро. Нам надо что-то с этим делать. Как ты думаешь, к..."
          time="14/03/2017"
          unreadIn={false}
          unreadOut={false}/>*/}
      </SearchGroup>

      <SearchGroup title="Контакты" count={3}>
        <Contact
          id="11"
          fullName="Васька Кот"
          company="Рокет банк"
          role="CTO"/>

        <Contact
          id="22"
          fullName="Содомит Содомитыч Содомитовичаджаноченененко"
          company="Компания, которая может делать всякие непонтяные штуки и давайте мне тут не это самое ок да"
          role="Менеджер по развитию всяких крутых, но непонятных штук, швец, жнец и на дуде игрец"/>

        <Contact
          id="33"
          fullName="Космодесантник Хаоса"
          company="Хаос"
          role="Космодесантник"/>
      </SearchGroup>
    </div>
  );
};

/**
 * Export
 */

export default SearchRooms;
