import React from 'react';
import axios from 'axios';

import './style.scss';

import ChatPeopleList from './ChatPeopleList';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';
import ChatSender from './ChatSender';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.storeNewUserMessage = this.storeNewUserMessage.bind(this);
        this.saveMessageOnServer = this.saveMessageOnServer.bind(this);
        this.onChooseFile = this.onChooseFile.bind(this);
        this.state = {
            messages: Array(),
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
                component.saveMessageOnServer(message);
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
                <ChatPeopleList closeSession={this.props.handleLogout} userName={this.props.userName}/>
                
                <div className="chat">                
                    <ChatHeader messageQuantity={this.state.messages.length}/>
                    <ChatHistory messages={this.state.messages} userName={this.props.userName}/>
                    <ChatSender handleMessage={this.handleMessageSubmit} chooseFile={this.onChooseFile}/>                
                </div>
                
            </div>
        </div>
        );
    }
}

export default Chat;