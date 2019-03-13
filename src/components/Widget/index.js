import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import Widgetlayout from './layout';

class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.storeNewUserMessage = this.storeNewUserMessage.bind(this);
        this.toggleConversation = this.toggleConversation.bind(this);
        this.printNewUserMessage = this.printNewUserMessage.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.state = {
            oppenedConversation: false,
            messages: Array(),
        };
    }

    toggleConversation () {
        this.setState({
            oppenedConversation: !this.state.oppenedConversation
        });
    }

    storeNewUserMessage(userInput) {
        const message = {
            text: userInput,
            sender: 'client'
        };
        this.setState(state => {
            state.messages.push(message);
        });
        return message;
    }

    printNewUserMessage(msg) {
        console.log(msg);
    }

    handleMessageSubmit (event) {
        event.preventDefault();
        const userInput = event.target.message.value;
        if (userInput.trim()) {
          this.printNewUserMessage(this.storeNewUserMessage(userInput));
        }
        event.target.message.value = '';
    }

    // HTML
    render() {
        return (
            <Widgetlayout 
                onClick={() => this.toggleConversation()}
                oppenedConversation = {this.state.oppenedConversation}
                onSendMessage={this.handleMessageSubmit}
                messages={this.messages}
            />
        );
    }
}

Widget.propTypes = {
    oppenedConversation: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.object),
    toggleConversation: PropTypes.func,
    storeNewUserMessage: PropTypes.func,
    printNewUserMessage: PropTypes.func,
    handleNewUserMessage: PropTypes.func,
  };

export default Widget;