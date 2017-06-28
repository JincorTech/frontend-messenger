import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/messenger';

// import { sendTestMessage } from '../../../redux/modules/messenger/messenger';

import Scrollbars from 'react-custom-scrollbars';
import Rooms from '../Rooms';
import MessagesHeader, { HEIGHT as MESSAGES_HEADER_HEIGHT } from '../../../components/messenger/MessagesHeader';
import Textarea, { HEIGHT as TEXTAREA_HEIGHT } from '../../../components/messenger/Textarea';
import MessageGroup from '../../../components/messenger/MessageGroup';
import { HEIGHT as LAYOUT_HEADER_HEIGHT } from '../../app/AppLayout';

/**
 * Types
 */

export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = {
  height?: number
};

export type DispatchProps = {
  // sendTestMessage: () => void
};

/**
 * Temporary data
 */

const msgs = [
  {
    id: '12312991923',
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    fullName: 'Lauren Mayberry',
    firstName: 'Lauren',
    messages: [
      {
        timestamp: '13:29',
        content: 'От души душевно в душу. На сегодняшний день мы прикладываем максимум усилий для для энергичного продвижения нашего коллектива к стратегическим рубежам и каждый вносит свой посильный вклад в общее дело.'
      },
      {
        timestamp: '13:30',
        content: 'В то же время, моя душа по-прежнему довольно неспокойна касательно долгосрочных перспектив наших совместных начинаний и если находит сердце умиротворение, ты лишь в мысли о том, что путь наш в этом мире - мгновение.'
      }
    ]
  },
  {
    id: '12312931913',
    avatar: '',
    fullName: 'John Doe',
    firstName: 'John',
    messages: [
      {
        timestamp: '13:31',
        content: 'Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько не гнули в бараний рог, не сдался, свою честь блюдешь и других помнишь: если кто-то к тебе с уважением, то ты для него в лепешку разобьешься, будь ты хоть сто раз русский. Люблю тебя и рядом с тобой человеком начинаю себя чувствовать'
      }
    ]
  },
  {
    id: '12312991923',
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    fullName: 'Lauren Mayberry',
    firstName: 'Lauren',
    messages: [
      {
        timestamp: '13:29',
        content: 'От души душевно в душу. На сегодняшний день мы прикладываем максимум усилий для для энергичного продвижения нашего коллектива к стратегическим рубежам и каждый вносит свой посильный вклад в общее дело.'
      },
      {
        timestamp: '13:30',
        content: 'В то же время, моя душа по-прежнему довольно неспокойна касательно долгосрочных перспектив наших совместных начинаний и если находит сердце умиротворение, ты лишь в мысли о том, что путь наш в этом мире - мгновение.'
      }
    ]
  },
  {
    id: '12312931913',
    avatar: '',
    fullName: 'John Doe',
    firstName: 'John',
    messages: [
      {
        timestamp: '13:31',
        content: 'Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько не гнули в бараний рог, не сдался, свою честь блюдешь и других помнишь: если кто-то к тебе с уважением, то ты для него в лепешку разобьешься, будь ты хоть сто раз русский. Люблю тебя и рядом с тобой человеком начинаю себя чувствовать'
      }
    ]
  },
  {
    id: '12312991923',
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    fullName: 'Lauren Mayberry',
    firstName: 'Lauren',
    messages: [
      {
        timestamp: '13:29',
        content: 'От души душевно в душу. На сегодняшний день мы прикладываем максимум усилий для для энергичного продвижения нашего коллектива к стратегическим рубежам и каждый вносит свой посильный вклад в общее дело.'
      },
      {
        timestamp: '13:30',
        content: 'В то же время, моя душа по-прежнему довольно неспокойна касательно долгосрочных перспектив наших совместных начинаний и если находит сердце умиротворение, ты лишь в мысли о том, что путь наш в этом мире - мгновение.'
      }
    ]
  },
  {
    id: '12312931913',
    avatar: '',
    fullName: 'John Doe',
    firstName: 'John',
    messages: [
      {
        timestamp: '13:31',
        content: 'Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько не гнули в бараний рог, не сдался, свою честь блюдешь и других помнишь: если кто-то к тебе с уважением, то ты для него в лепешку разобьешься, будь ты хоть сто раз русский. Люблю тебя и рядом с тобой человеком начинаю себя чувствовать'
      }
    ]
  },
  {
    id: '12312991923',
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    fullName: 'Lauren Mayberry',
    firstName: 'Lauren',
    messages: [
      {
        timestamp: '13:29',
        content: 'От души душевно в душу. На сегодняшний день мы прикладываем максимум усилий для для энергичного продвижения нашего коллектива к стратегическим рубежам и каждый вносит свой посильный вклад в общее дело.'
      },
      {
        timestamp: '13:30',
        content: 'В то же время, моя душа по-прежнему довольно неспокойна касательно долгосрочных перспектив наших совместных начинаний и если находит сердце умиротворение, ты лишь в мысли о том, что путь наш в этом мире - мгновение.'
      }
    ]
  },
  {
    id: '12312931913',
    avatar: '',
    fullName: 'John Doe',
    firstName: 'John',
    messages: [
      {
        timestamp: '13:31',
        content: 'Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько не гнули в бараний рог, не сдался, свою честь блюдешь и других помнишь: если кто-то к тебе с уважением, то ты для него в лепешку разобьешься, будь ты хоть сто раз русский. Люблю тебя и рядом с тобой человеком начинаю себя чувствовать'
      }
    ]
  },
  {
    id: '12312991923',
    avatar: 'http://i.imgur.com/QKHJ3Zs.png',
    fullName: 'Lauren Mayberry',
    firstName: 'Lauren',
    messages: [
      {
        timestamp: '13:29',
        content: 'От души душевно в душу. На сегодняшний день мы прикладываем максимум усилий для для энергичного продвижения нашего коллектива к стратегическим рубежам и каждый вносит свой посильный вклад в общее дело.'
      },
      {
        timestamp: '13:30',
        content: 'В то же время, моя душа по-прежнему довольно неспокойна касательно долгосрочных перспектив наших совместных начинаний и если находит сердце умиротворение, ты лишь в мысли о том, что путь наш в этом мире - мгновение.'
      }
    ]
  },
  {
    id: '12312931913',
    avatar: '',
    fullName: 'John Doe',
    firstName: 'John',
    messages: [
      {
        timestamp: '13:31',
        content: 'Уважаю, Мага! Сколько тебя по тюрьмам и ссылкам не таскали, сколько не гнули в бараний рог, не сдался, свою честь блюдешь и других помнишь: если кто-то к тебе с уважением, то ты для него в лепешку разобьешься, будь ты хоть сто раз русский. Люблю тебя и рядом с тобой человеком начинаю себя чувствовать'
      }
    ]
  }
];

/**
 * Component
 */

class Messenger extends Component<Props, StateProps> {
  public state = {
    height: 0
  };

  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  public componentWillMount(): void {
    this.updateDimensions();
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.updateDimensions);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateDimensions);
  }

  private updateDimensions(): void {
    this.setState({
      height: window.innerHeight - LAYOUT_HEADER_HEIGHT
    });
  }

  public render(): JSX.Element {
    const { height } = this.state;

    const messagesAreaHeight = height - MESSAGES_HEADER_HEIGHT - TEXTAREA_HEIGHT;

    return (
      <div styleName="messenger">
        <div styleName="rooms-wrapper">
          <Rooms height={height}/>
        </div>

        <div styleName="messages-wrapper">
          <MessagesHeader/>

          <Scrollbars autoHide style={{height: messagesAreaHeight}}>
            {msgs.map((msg, i) => <MessageGroup key={i} {...msg}/>)}
          </Scrollbars>

          <Textarea placeholder="Написать сообщение..."/>
        </div>
      </div>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, {}>(
  state => state.messenger.messenger,
  {
    // sendTestMessage
  }
)(Messenger);
