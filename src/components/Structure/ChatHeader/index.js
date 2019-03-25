import React from 'react';
import './style.scss';

const ChatHeader = (props) => {
    return (
        <div className="chat-header clearfix">                    
            <div className="chat-about">
                <div className="chat-with">Public chat room</div>
                <div className="chat-num-messages">already {props.messageQuantity} messages</div>
            </div>
        </div>
    );
};

export default ChatHeader;
