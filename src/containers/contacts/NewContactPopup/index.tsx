import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import {
  StateObj as StateProps,
  AddContactReq as AddContactReqProps
 } from '../../../redux/modules/contacts/newContact';

import {
  closeAndOpenContacts,
  closeNewContact,
  changeSearchQuery,
  addContact,
  removeContact
} from '../../../redux/modules/contacts/newContact';

import FullscreenPopup from '../../../components/common/FullscreenPopup';
import NewContact from '../../../components/contacts/NewContact';

/**
 * Types
 */

export type Props = StateProps & DispatchProps & {
  loadingBar: number
};

export type DispatchProps = {
  closeNewContact: () => void
  closeAndOpenContacts: () => void
  changeSearchQuery: (query: string) => void
  addContact: (user: AddContactReqProps) => void
  removeContact: (userId: string) => void
};

/**
 * Component
 */

class NewContactPopup extends Component<Props, {}> {
  public render(): JSX.Element {
    const {
      open,
      step,
      search,
      users,
      loadingBar,
      closeNewContact,
      closeAndOpenContacts,
      changeSearchQuery,
      addContact,
      removeContact
    } = this.props;

    return (
      <FullscreenPopup
        open={open}
        modalId="new-contact-popup"
        onClose={closeNewContact}>

        <NewContact
          step={step}
          search={search}
          users={users}
          loadingBar={loadingBar}
          onBackFromFirstStep={closeAndOpenContacts}
          onChangeSearchQuery={changeSearchQuery}
          onAddToContacts={addContact}
          onRemoveFromContacts={removeContact}/>

      </FullscreenPopup>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, {}>(
  (state) => ({
    loadingBar: state.loadingBar,
    ...state.contacts.newContact
  }),
  {
    closeNewContact,
    closeAndOpenContacts,
    changeSearchQuery,
    addContact,
    removeContact
  }
)(NewContactPopup);
