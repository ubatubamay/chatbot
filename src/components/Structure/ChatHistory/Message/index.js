import React from 'react';
import './style.scss';

const Message = (props) => {
    const isMine = props.message.senderName == props.userName;
    return (
        <li className={isMine ? 'clearfix' : ''}>
            <div className={isMine ? 'message-data align-right' : 'message-data'}>
                <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                <span className="message-data-name" >{isMine ? '' : props.message.senderName}</span>
            </div>
            <div className={isMine ? 'message other-message float-right' : 'message my-message'}>
                {props.message.text}
            </div>
        </li>
    );
};

export default Message;
