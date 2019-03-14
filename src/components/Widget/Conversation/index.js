import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import send from '../../../assets/img/send_button.svg';
import Message from './Message/';
import { setTimeout } from 'timers';
import socketIOClient from "socket.io-client";


class Conversation extends Component {

  constructor(props) {
    super(props);
    this.storeNewUserMessage = this.storeNewUserMessage.bind(this);
    this.printNewUserMessage = this.printNewUserMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.setWelcomeMessage = this.setWelcomeMessage.bind(this);
    this.state = {
        messages: Array(),
        endpoint: "localhost:4001",
        userName: '',
        socketUserID: this.props.socket.id,
    };
    this.$message = null;
    this.props.socket.on('chat message', (message) => {
      this.newBotMessage(message);
    });
  }
  
  scrollToBottom(messagesDiv) {
    if (!messagesDiv) return;
    const screenHeight = messagesDiv.clientHeight;
    const scrollTop = messagesDiv.scrollTop;
  
    const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight);
  
    scrollOffset && scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
  }

  scrollWithSlowMotion(target, scrollStart, scroll) {
    const raf = window.webkitRequestAnimationFrame || window.requestAnimationFrame;
    let start = null;
    const step = (timestamp) => {
      if (!start) {
        start = timestamp;
      }
      let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION);
      let total = scrollStart + stepScroll;
      target.scrollTop = total;
      if (total < scrollStart + scroll) {
        raf(step);
      }
    };
    raf(step);
  }

  setWelcomeMessage() {
    this.setState({botIsTyping:true});
    setTimeout(() => {
      const message = {
        text: 'Olá! Em que posso ajudar?',
        sender: 'response'
      };
      const copyMessages = Object.assign([], this.state.messages);
      copyMessages.push(message);
      this.setState({messages:copyMessages});
      return message;
    }, 2000);    
  }

  storeNewUserMessage(userInput) {
    const message = {
        text: userInput,
        sender: 'client',
        userId: this.state.socketUserID
    };
    this.props.socket.emit('chat message', message);
    const copyMessages = Object.assign([], this.state.messages);
    copyMessages.push(message);
    this.setState({messages:copyMessages});
    this.scrollToBottom(this.$message);
    return message;
  }

  newBotMessage(message) {
    if (message.userId != this.state.socketUserID){
      this.setState({botIsTyping:true});
      setTimeout(() => {  
        message.sender = 'response';
        const copyMessages = Object.assign([], this.state.messages);
        copyMessages.push(message);
        this.setState({botIsTyping:false});
        this.setState({messages:copyMessages});
        return message;
      }, 2000);
    }
  }

  printNewUserMessage() {
    // implementation
  }

  handleMessageSubmit (event) {
      event.preventDefault();
      const userInput = event.target.message.value;
      if (userInput.trim()) {
          this.storeNewUserMessage(userInput);
      }
      event.target.message.value = '';
  }

  render() {

    return (
      <div className="cb-conversation-container">

        <div className="cb-header">
          <h4 className="cb-title">Bem vindo</h4>
          <span>ao Assistente virtual</span>
        </div>

        <div id="messages" className="cb-messages-container" ref={msg => this.$messageRef = msg}>
            {this.state.messages.map((message, index)=>{
                return (<Message key={index} sender={message.sender} text={message.text}/>);
            })}
            <div className={`loader ${this.state.botIsTyping && 'active'}`}>
              <div className="loader-container">
                <span className="loader-dots"></span>
                <span className="loader-dots"></span>
                <span className="loader-dots"></span>
              </div>
            </div>
        </div>

        <form className="cb-sender" onSubmit={this.handleMessageSubmit}>
          <input type="text" className="cb-new-message" name="message" placeholder="Escreva aqui" disabled={false} autoFocus={false} autoComplete="off"/>
          <button type="submit" className="cb-send">
            <img src={send} className="cb-send-icon" alt="send" />
          </button>
        </form>

      </div>
    );
  }
}

Conversation.propTypes = {
  oppenedConversation: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object),
  userName: PropTypes.string,
  toggleConversation: PropTypes.func,
  storeNewUserMessage: PropTypes.func,
  printNewUserMessage: PropTypes.func,
  handleNewUserMessage: PropTypes.func,
  setWelcomeMessage: PropTypes.func,
};

export default Conversation;
