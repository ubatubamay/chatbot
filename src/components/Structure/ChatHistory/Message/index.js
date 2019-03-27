import React from 'react';
import './style.scss';

const Message = (props) => {
    const isMine = props.message.senderName == props.userName;
    return (
        <li className={isMine ? 'clearfix' : ''}>
            {!isMine &&
                <div className={'message-data'}>
                    <span className="message-data-name" >{props.message.senderName}</span>
                </div>
            }
            <div className={isMine ? 'message my-message float-right' : 'message other-message'}>
                {props.message.text}
                {props.message.file &&
                    <span>
                        {props.message.text && <br/>}                        
                        {props.message.file.mimetype.indexOf('image',0) == 0 ?
                            <img 
                                className="message-image" 
                                src={`http://localhost:4001/api/image/${props.message.file.filename}/${props.message.file.size}/${props.message.file.mimetype}`}
                            /> 
                        :
                            <a href={`http://localhost:4001/api/image/${props.message.file.filename}/${props.message.file.size}/${props.message.file.mimetype}`}>
                                <i className="fas fa-file-alt"></i> {props.message.file.originalname}
                            </a>
                        }
                    </span>
                }
            </div>
        </li>
    );
};

export default Message;
