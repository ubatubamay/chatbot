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
                {props.message.file &&
                    <span>
                        <br/>
                        {props.message.file.mimetype.indexOf('image',0) == 0 ?
                            <img 
                                className="message-image" 
                                src={`http://localhost:4001/api/image/${props.message.file.filename}/${props.message.file.size}/${props.message.file.mimetype}`}
                            /> 
                        :   
                            <a href={`http://localhost:4001/api/image/${props.message.file.filename}/${props.message.file.size}/${props.message.file.mimetype}`}>
                                {props.message.file.originalname}
                            </a>
                        }
                    </span>
                }
            </div>
        </li>
    );
};

export default Message;
