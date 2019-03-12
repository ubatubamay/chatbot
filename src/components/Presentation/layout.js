import React from 'react';
import PropTypes from 'prop-types';

import '../../app.scss';
import './style.scss';

import Widget from '../Widget';

const PresentationLayout = props => (
  <div>
    <div className={`stars large`}></div>
    <div className={`stars medium`}></div>
    <div className={`stars small`}></div>
    {/* <div classname={`welcome`}>{welcomeText}</div> */}
    <Widget/>
  </div>
);

PresentationLayout.propTypes = {
  welcomeText: PropTypes.string,
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  onSendMessage: PropTypes.func,
  onToggleConversation: PropTypes.func,
  showChat: PropTypes.bool,
  senderPlaceHolder: PropTypes.string,
  onQuickButtonClicked: PropTypes.func,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func
};

export default PresentationLayout;
