import React from 'react';
import './style.scss';

const ChatPeopleList = (props) => {
    return (
        <div className="people-list" id="people-list">
            <div className="user-account">
                <i className="fas fa-user-alt"></i>{props.userName}
                <div className="user-control">
                    <button onClick={props.closeSession}>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>                
            </div>
            <ul className="list">
                <li className="clearfix">
                    <div className="about">
                        <div className="room-name">Public chat room</div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ChatPeopleList;
