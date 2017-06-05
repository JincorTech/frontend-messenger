import * as React from 'react';
import { SFC } from 'react';

import Room from '../Room';

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

const Rooms: SFC<Props> = (props) => {
  return (
    <div>
      <Room
        type="channel"
        id="1"
        title="Альфа-Банк"
        preview="Завтра состоится капустник, поэтому просим всех быть на работе не позже..."
        time="12:00"
        unreadIn={true}
        unreadOut={false}/>

      <Room
        type="inquiry"
        id="2"
        title="Обращения"
        preview="Всякий раз, когда вы в отчаянии или на грани отчаяния, когда..."
        time="11:50"
        last="Иосиф Бродский"
        unreadIn={true}
        unreadOut={false}/>

      <Room
        type="dialog"
        id="3"
        title="Александр Пушкин"
        preview="Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько..."
        time="11:40"
        last="Вы"
        unreadIn={false}
        unreadOut={false}/>

      <Room
        type="group"
        id="4"
        title="Общество мертвых поэтов"
        preview="Работаем дальше. Ко вторнику мне нужно иметь на руках..."
        time="11:30"
        last="Валерий Леонтьев"
        unreadIn={false}
        unreadOut={false}/>

      <Room
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
        unreadOut={false}/>
    </div>
  );
};

/**
 * Export
 */

export default Rooms;
