import * as React from 'react';
import { SFC } from 'react';

import FullscreenPopup from '../../common/FullscreenPopup';
import Contacts from '../Contacts';

/**
 * Types
 */

export type Props = {
  open: boolean
};

/**
 * Component
 */

const ContactsPopup: SFC<Props> = (props) => {
  const { open } = props;

  return (
    <FullscreenPopup
      open={open}
      modalId="contacts-popup"
      onClose={() => void(0)}>

      <Contacts/>

    </FullscreenPopup>
  );
};

/**
 * Export
 */

export default ContactsPopup;
