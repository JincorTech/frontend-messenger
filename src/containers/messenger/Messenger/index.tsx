import * as React from 'react';
import { Component } from 'react';
import './styles.css';

import Dialogs from '../Dialogs';
import Messages from '../Messages';
import ContactsPopup from '../../../components/contacts/ContactsPopup';
import NewContactPopup from '../../../components/contacts/NewContactPopup';

export type State = {
  height: number
};

class Messenger extends Component<{}, State> {
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
      height: window.innerHeight - 65 // Header height
    });
  }

  public render(): JSX.Element {
    const { height } = this.state;

    return (
      <div styleName="messenger">
        <Dialogs
          height={height}
          styleName="dialogs-block"/>

        <Messages
          search={false}
          height={height}
          name="Александр Пушкин"
          company="Альфа-Банк"
          styleName="messeges-block"/>

        <ContactsPopup open={false}/>
        <NewContactPopup open={false} step={4}/>
      </div>
    );
  }
}

export default Messenger;
