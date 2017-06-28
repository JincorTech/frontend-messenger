import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';

import { StateObj as StateProps } from '../../../redux/modules/contacts/contacts';

import {
  fetchContacts,
  closeContacts,
  closeAndOpenNewContact,
  changeSearchQuery,
  resetSearchQuery
} from '../../../redux/modules/contacts/contacts';
import { removeContact } from '../../../redux/modules/contacts/newContact';
import { openRoom } from '../../../redux/modules/messenger/rooms';

import FullscreenPopup from '../../../components/common/FullscreenPopup';
import Contacts from '../../../components/contacts/Contacts';

/**
 * Types
 */

export type Props = StateProps & DispatchProps;

export type DispatchProps = {
  fetchContacts: () => void
  closeContacts: () => void
  closeAndOpenNewContact: () => void
  removeContact: (userId: string) => void
  changeSearchQuery: (value: string) => void
  resetSearchQuery: () => void
  openRoom: (matrixId: string) => void
};

/**
 * Component
 */

class ContactsPopup extends Component<Props, {}> {
  constructor(props) {
    super(props);

    this.onRemoveContact = this.onRemoveContact.bind(this);
  }

  public componentDidMount(): void {
    this.props.fetchContacts();
  }

  private onRemoveContact(e: MouseEvent<HTMLSpanElement>, userId: string): void {
    this.props.removeContact(userId);
    e.stopPropagation();
  }

  public render(): JSX.Element {
    const {
      open,
      contacts,
      pagination,
      search,
      closeContacts,
      closeAndOpenNewContact,
      changeSearchQuery,
      resetSearchQuery,
      openRoom
     } = this.props;

    return (
      <FullscreenPopup
        modalId="contacts-popup"
        open={open}
        onClose={closeContacts}>

        <Contacts
          contacts={contacts}
          pagination={pagination}
          search={search}
          onClickNewContact={closeAndOpenNewContact}
          removeContact={this.onRemoveContact}
          onContactClick={openRoom}
          onChangeSearchQuery={changeSearchQuery}
          onResetSearchQuery={resetSearchQuery}/>

      </FullscreenPopup>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, {}>(
  (state) => state.contacts.contacts,
  {
    fetchContacts,
    closeContacts,
    closeAndOpenNewContact,
    removeContact,
    changeSearchQuery,
    resetSearchQuery,
    openRoom
  }
)(ContactsPopup);
