import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Conversation from './Conversation';
import Launcher from './Launcher';

import './style.scss';

class WidgetLayout extends Component {
    render() {
        const { onClick, oppenedConversation} = this.props;
        return (
            <div className={`cb-widget-container`}>
                {oppenedConversation &&
                    <Conversation/>
                }        
                <Launcher onClick={() => onClick()} oppenedConversation = {oppenedConversation}/>
            </div>
        );
    }
}

WidgetLayout.propTypes = {
    onClick: PropTypes.func,
    oppenedConversation: PropTypes.bool,
};

export default WidgetLayout;