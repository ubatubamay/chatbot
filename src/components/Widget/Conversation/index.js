import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import profileAvatar from '../../../assets/img/cow.png';
import send from '../../../assets/img/send_button.svg';

const Conversation = props =>
  <div className="cb-conversation-container">
    <div className="cb-header">
        <h4 className="cb-title">
        Bem vindo
        </h4>
        <span>ao Assistente virtual</span>
    </div>
    <div id="messages" className="cb-messages-container">
      <div className="cb-message" key={1}>
          <img src={profileAvatar} className="cb-avatar" alt="profile" />
        mensagem
      </div>
      {/* <Loader typing={typing} /> */}...
    </div>

    


    {/* <QuickButtons onQuickButtonClicked={props.onQuickButtonClicked} /> */}

    <form className="cb-sender" onSubmit="">
      <input type="text" className="cb-new-message" name="message" placeholder="Escreva aqui" disabled={false} autoFocus="false" autoComplete="off"/>
      <button type="submit" className="cb-send">
        <img src={send} className="cb-send-icon" alt="send" />
      </button>
    </form>


  </div>;

Conversation.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool
};

export default Conversation;
