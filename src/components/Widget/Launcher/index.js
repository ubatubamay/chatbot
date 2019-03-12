import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import openLauncher from '../../../assets/img/cow.png';
import close from '../../../assets/img/cancel.png';

const Launcher = (props) =>

  <button type="button" className={'cb-launcher'} onClick={() => props.onClick()}>
    {props.oppenedConversation ?
      <img src={close} className="cb-open-launcher" alt="" /> :       
      <img src={openLauncher} className="cb-open-launcher" alt="" />
    }
    {!props.oppenedConversation &&
      <span className="cb-badge">{1}</span>
    }
  </button>;

Launcher.propTypes = {
  toggle: PropTypes.func,
  chatOpened: PropTypes.bool,
  badge: PropTypes.number
};

export default Launcher;
