import React from 'react';
import './style.scss';

const MessageBaloon = (props) => {
    return (
        <div className="cb-message" key={1}>
            <div className={`cb-${props.sender}`}>
                <div className="cb-message-text">
                    {props.text}
                </div>
            </div>
        </div>
    );
};

export default MessageBaloon;
