import React from 'react';
import './style.scss';

import axios from 'axios';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';

class Structure extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.storeNewUserMessage = this.storeNewUserMessage.bind(this);
        this.saveMessageOnServer = this.saveMessageOnServer.bind(this);
        this.state = {
            messages: Array(),
            socketUserID: this.props.socket.id,
            file: null,
        };
        this.props.socket.emit('message-history-call');
        this.props.socket.on('message-history-receipt', (data) => {
            this.setState({messages:data});
        });
        this.props.socket.on('message-receipt', (message) => {
            this.newMessageReceived(message);
        });
    }

    handleMessageSubmit (event) {
        event.preventDefault();
        const messageInput = event.target.message.value;
        if (messageInput.trim() || this.state.file) {
            this.storeNewUserMessage(this, messageInput);
        }
        event.target.message.value = '';
    }

    storeNewUserMessage(component, userInput) {
        const message = {
            text: userInput,
            senderName: this.props.userName,
            userId: this.state.socketUserID
        };

        if (this.state.file){
            let formData = new FormData();
            formData.append('file', this.state.file);

            axios({
                url: 'http://localhost:4001/api/image/',
                method: 'POST',
                data: formData
            })
            .then(function (response) {
                console.log(response);
                message.file = response.data;
                component.saveMessageOnServer(component, message);
                component.setState({file:null});
            })
            .catch(function (error){
                console.log(error);
            });
        } else {
            this.saveMessageOnServer(message);
        }
        
    }

    saveMessageOnServer(message) {
        this.props.socket.emit('save-message', message);
    }

    newMessageReceived(message) {
        const copyMessages = Object.assign([], this.state.messages);
        copyMessages.push(message);
        this.setState({messages:copyMessages});
        return message;
    }

    onChooseFile(e) {      
        this.setState({ file: e.target.files[0] });
    }

    render() { 
        return (
        <div>
            <div className="container-chat clearfix">
                <div className="people-list" id="people-list">
                    <div className="search">
                        Logged as {this.props.userName}
                    </div>
                    <ul className="list">
                        <li className="clearfix">
                            <div className="about">
                                <div className="name">Public chat room</div>
                                <div className="status">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="chat">
                
                    <ChatHeader messageQuantity={this.state.messages.length}/>
                    <ChatHistory messages={this.state.messages} userName={this.props.userName}/>

                    <div className="chat-message clearfix">
                        <form onSubmit={this.handleMessageSubmit}>
                            <textarea name="message" id="message-to-send" placeholder ="Type your message" rows="1"></textarea>
                                
                            <input type="file" name="file" encType="multipart/form-data" onChange={(e)=>this.onChooseFile(e)}></input>

                            <button type="submit" name="btn-send">
                                <i className="fas fa-paper-plane"> SEND</i>
                            </button>
                            
                        </form>
                    </div>
                
                </div>
                
            </div>
        </div>
        );
    }
}

export default Structure;