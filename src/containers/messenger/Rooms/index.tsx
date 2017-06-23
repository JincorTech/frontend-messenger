import * as React from 'react';
import { Component, HTMLProps } from 'react';
import { connect } from 'react-redux';
import matrix from '../../../utils/matrix';

import './styles.css';

import { StateObj as StateProps } from '../../../redux/modules/messenger/rooms';

import {
  showSearchInput,
  hideSearchInput,
  showSearchResults,
  hideSearchResults,
  fetchRooms
} from '../../../redux/modules/messenger/rooms';

import Scrollbars from 'react-custom-scrollbars';
import RoomsHeader from '../../../components/messenger/RoomsHeader';
import RoomsList from '../../../components/messenger/RoomsList';
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
  fetchRooms: () => void
};

/**
 * Component
 */

class Rooms extends Component<Props, StateProps> {
  public componentDidMount(): void {
    this.props.fetchRooms();
    matrix.on('Room', () => this.props.fetchRooms());
    matrix.on('RoomState.events', () => this.props.fetchRooms());
    matrix.on('Room.timeline', () => this.props.fetchRooms());
  }

  public render(): JSX.Element {
    const {
      height,
      searchable,
      resultsVisible,
      list,
      searchResults,
      showSearchInput,
      hideSearchInput,
      showSearchResults,
      hideSearchResults
    } = this.props;

    const contentHeight = height - 65;

    return (
      <div>
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
                  rooms={list}
                  searchResults={searchResults}/>
              : <RoomsList
                  searchable={searchable}
                  resultsVisible={resultsVisible}
                  list={list}
                  searchResults={searchResults}/>}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

/**
 * Export
 */

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.messenger.rooms,
  {
    showSearchInput,
    hideSearchInput,
    showSearchResults,
    hideSearchResults,
    fetchRooms
  }
)(Rooms);
