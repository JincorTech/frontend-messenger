import * as React from 'react';
import { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import * as Waypoint from 'react-waypoint';

import { emojiGroups } from '../../../utils/emoji';

import {
  setCurrentGroup,
  openDropdown,
  scrollTo,
  closeDropdown,
  StateObj as StateProps
} from '../../../redux/modules/messenger/emojiSelect';

import EmojiGroup from './components/EmojiGroup';

/**
 * Types
 */
export type Props = ComponentProps & DispatchProps & StateProps;

export type ComponentProps = {
  open: boolean
  currentGroup: string
};

export type DispatchProps = {
  setCurrentGroup: (name: string) => void
  openDropdown: () => void
  closeDropdown: () => void
  scrollTo: (groupName: string) => void
};

type WaypointMap = {
  [groupName: string]: any
};

/**
 * Component
 */
class EmojiSelect extends Component<Props, {}> {
  private scrollInnerWrap: HTMLDivElement;
  private scrollbar: Scrollbars;
  private groups: string[];
  private waypoints: WaypointMap = {};

  constructor(props) {
    super(props);

    this.groups = emojiGroups();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  public componentDidUpdate(): void {
    const { scrollPosition } = this.props;

    if (scrollPosition !== '') {
      this.scrollTo(scrollPosition);
    }
  }

  private handleOpen(): void {
    this.props.openDropdown();
  }

  private handleClose(): void {
    this.props.closeDropdown();
    this.scrollTo('nature');
  }

  private handleLeave(name: string): Function {
    const { setCurrentGroup } = this.props;

    return ({ previousPosition, currentPosition }: any) => {
      if (currentPosition === 'above' && previousPosition === 'inside') {
        setCurrentGroup(name);
      }
    };
  }

  private handleEnter(name: string): Function {
    const { setCurrentGroup } = this.props;

    return ({ previousPosition, currentPosition }: any) => {
      if (currentPosition === 'inside' && previousPosition === 'above') {
        setCurrentGroup(name);
      }
    };
  }

  public scrollTo(groupName: string) {
    const { top } = this.scrollInnerWrap.getBoundingClientRect();
    const { top: waypointTop } = this.waypoints[groupName].waypoint.getBoundingClientRect();
    const position = waypointTop - top;

    this.scrollbar.scrollTop(position + 1);
    this.props.scrollTo('');
    this.props.setCurrentGroup(groupName);
  }

  public render(): JSX.Element {
    const {
      open,
      scrollPosition,
      currentGroup,
      scrollTo
    } = this.props;

    const displayWaypoints = !!scrollPosition;

    return (
      <div styleName="emoji-select" onMouseLeave={this.handleClose}>
        <span styleName="toggle"
          onMouseOver={this.handleOpen}/>

        <div styleName="dropdown" style={{display: open ? 'block' : 'none'}}>
          <div styleName="current-group">{currentGroup}</div>

          <div styleName="emojis">
            <Scrollbars
              autoHide
              style={{ height: '220px' }}
              ref={(scrollbar) => this.scrollbar = scrollbar}>

              <div ref={(wrapper) => this.scrollInnerWrap = wrapper}>
                {this.groups.map((groupName, idx) => (
                  <div key={groupName}>
                    {idx > 0 && <div styleName="group-title">{groupName}</div>}
                    {!displayWaypoints && <Waypoint onLeave={this.handleLeave(groupName)}/>}

                    <EmojiGroup
                      ref={(waypoint) => this.waypoints[groupName] = waypoint}
                      name={groupName}/>

                    {!displayWaypoints && <Waypoint onEnter={this.handleEnter(groupName)}/>}
                  </div>
                ))}
              </div>
            </Scrollbars>
          </div>

          <ul styleName="scroll-spy">
            {this.groups.map((groupName) => (
              <li
                key={`i-${groupName}`}
                title={groupName}
                onClick={() => scrollTo(groupName)}
                styleName={currentGroup === groupName ? 'active' : 'indicator'}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.messenger.emojiSelect,
  {
    setCurrentGroup,
    openDropdown,
    closeDropdown,
    scrollTo
  }
)(EmojiSelect);
