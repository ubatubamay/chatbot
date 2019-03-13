import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Widgetlayout from './layout';

class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.toggleConversation = this.toggleConversation.bind(this);
        this.state = {
            oppenedConversation: false,
        };
    }

    
    toggleConversation () {
        this.setState({
            oppenedConversation: !this.state.oppenedConversation
        });
        // console.log(this.state.messages.length);
        // if (this.state.oppenedConversation) {
        //     this.printNewUserMessage();
        //     if (this.state.messages.length <1) this.setWelcomeMessage();
        // }
    }

    // HTML
    render() {
        return (
            <Widgetlayout 
                onClick={() => this.toggleConversation()}
                oppenedConversation = {this.state.oppenedConversation}
            />
        );
    }
}

Widget.propTypes = {
    oppenedConversation: PropTypes.bool,
    toggleConversation: PropTypes.func,
  };

export default Widget;