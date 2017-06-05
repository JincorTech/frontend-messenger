import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import { connect } from 'react-redux';

import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/dialogs';

import {
  showSearchInput,
  hideSearchInput,
  showSearchResults,
  hideSearchResults
} from '../../../redux/modules/messenger/dialogs';

import Scrollbars from 'react-custom-scrollbars';
import RoomsHeader from '../../../components/messenger/RoomsHeader';
import Rooms from '../../../components/messenger/Rooms';
import SearchRooms from '../../../components/messenger/SearchRooms';

/**
 * Types
 */

export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = HTMLProps<HTMLDivElement> & {
  height?: number
};

export type DispatchProps = {
  showSearchInput: () => void
  hideSearchInput: () => void
  showSearchResults: () => void
  hideSearchResults: () => void
};

/**
 * Component
 */

const Dialogs: SFC<Props> = (props) => {
  const {
    height,
    children,
    className,
    searchable,
    resultsVisible,
    rooms,
    searchResults,
    showSearchInput,
    hideSearchInput,
    showSearchResults,
    hideSearchResults,
    ...divProps
  } = props;

  const contentHeight = height - 65;

  return (
    <div className={className} {...divProps}>
      <RoomsHeader
        showSearchInput={showSearchInput}
        hideSearchInput={hideSearchInput}
        showSearchResults={showSearchResults}
        hideSearchResults={hideSearchResults}
        searchable={searchable}/>

      <Scrollbars
        autoHide
        styleName="custom-scrollbar"
        style={{height: contentHeight, width: 'calc(100% + 25px)'}}>
        <div styleName="dialog-list">
          {resultsVisible
            ? <SearchRooms
                searchable={searchable}
                resultsVisible={resultsVisible}
                rooms={rooms}
                searchResults={searchResults}/>
            : <Rooms
                searchable={searchable}
                resultsVisible={resultsVisible}
                rooms={rooms}
                searchResults={searchResults}/>}
        </div>
      </Scrollbars>
    </div>
  );
};

/**
 * Export
 */

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.messenger.dialogs,
  {
    showSearchInput,
    hideSearchInput,
    showSearchResults,
    hideSearchResults
  }
)(Dialogs);
