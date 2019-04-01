import React from 'react';
import './style.scss';

const ChatSender = (props) => {
    return (
        <div className="chat-message clearfix">
            <form onSubmit={props.handleMessage}>
                <textarea name="message" id="message-to-send" placeholder ="Type your message" rows="1" autoFocus></textarea>
                    
                <input type="file" name="file" encType="multipart/form-data" onChange={(e)=>props.chooseFile(e)}></input>

                <button type="submit" name="btn-send">
                    <i className="fas fa-paper-plane"> SEND</i>
                </button>                            
            </form>
        </div>
    );
};

export default ChatSender;