import * as React from 'react';
import { SFC } from 'react';

import './styles.css';

import { BottomView as BottomViewProps } from '../../../redux/modules/app/profileCard';

import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = {
  changeView: (view: BottomViewProps) => void
  logout: () => void
};

/**
 * Component
 */

const CardButtonsView: SFC<Props> = (props) => {
  const { changeView, logout } = props;

  return (
    <div styleName="control-buttons">
      <button
        type="button"
        onClick={() => changeView('profile-form')}>
        <Icon name="pencil" styleName="icon"/> Редактировать профиль
      </button>

      <button
        type="button"
        onClick={() => changeView('password-form')}>
        <Icon name="lock" styleName="icon"/> Изменить пароль
      </button>

      <button
        type="button"
        onClick={() => logout()}>
        <Icon name="logout" styleName="icon"/> Выйти
      </button>
    </div>
  );
};

/**
 * Export
 */

export default CardButtonsView;
