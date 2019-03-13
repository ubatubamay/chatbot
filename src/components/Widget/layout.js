import React from 'react';
import PropTypes from 'prop-types';
import Conversation from './Conversation';
import Launcher from './Launcher';

import './style.scss';

const WidgetLayout = props => (
    <div className={`cb-widget-container`}>
        {props.oppenedConversation &&
            <Conversation sendMessage={props.onSendMessage} messages={props.messages}/>
        }        
        <Launcher onClick={() => props.onClick()} oppenedConversation = {props.oppenedConversation}/>
    </div>
);

WidgetLayout.propTypes = {
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

export default WidgetLayout;