import React from 'react';
import './style.scss';

import axios from 'axios';
import ChatHistory from './ChatHistory';
import ChatHeader from './ChatHeader';

class Structure extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.callOldMessages = this.callOldMessages.bind(this);
        this.storeNewUserMessage = this.storeNewUserMessage.bind(this);
        this.saveMessageOnServer = this.saveMessageOnServer.bind(this);
        this.state = {
            messages: Array(),
            endpoint: "localhost:4001",
            socketUserID: this.props.socket.id,
            file: null,
        };
        this.props.socket.on('message-received', (message) => {
            this.newMessageReceived(message);
        });
        this.callOldMessages(this);
    }

    callOldMessages(component) {
        axios.get(`http://localhost:4001/api/message/`, {
            headers: { 'Access-Control-Allow-Origin': true },
        })
        .then(function (response) {
            if (response.data) {
                component.setState({messages:response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            
        });
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
                //component.setState({file:null});
            })
            .catch(function (error){
                console.log(error);
            });
        } else {
            this.saveMessageOnServer(this, message);
        }
        
    }

    saveMessageOnServer(component, message) {
        axios.post('http://localhost:4001/api/message/', {
            message: message
        })
        .then(function (response) {
            component.props.socket.emit('send-public-message', message);
            const copyMessages = Object.assign([], component.state.messages);
            copyMessages.push(message);
            component.setState({messages:copyMessages});
            return message;
        })
        .catch(function (error) {
            console.log(error);
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

    newMessageReceived(message) {
        if (message.senderName != this.props.userName){
            const copyMessages = Object.assign([], this.state.messages);
            copyMessages.push(message);
            this.setState({messages:copyMessages});
            return message;
        }
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
                        <i className="fa fa-search"></i>
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