import React from 'react';
import * as ReactDOM from 'react-dom';
import './style.scss';
import Message from './Message/';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollToBottom() {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {        
        return (            
            <div className="chat-history" ref="messageList">
                <ul>
                    {this.props.messages.map((message, index)=>{
                        return (
                            <Message key={index} message={message} userName={this.props.userName}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ChatHistory;
