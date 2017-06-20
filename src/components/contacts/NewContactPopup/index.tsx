import * as React from 'react';
import { SFC } from 'react';

import FullscreenPopup from '../../common/FullscreenPopup';
import NewContact from '../NewContact';

/**
 * Types
 */

export type Props = {
  open: boolean
  step: number
};

/**
 * Component
 */

const NewContactPopup: SFC<Props> = (props) => {
  const { open, step } = props;

  return (
    <FullscreenPopup
      open={open}
      modalId="new-contact-popup"
      onClose={() => void(0)}>

      <NewContact step={step}/>

    </FullscreenPopup>
  );
};

/**
 * Export
 */

export default NewContactPopup;
