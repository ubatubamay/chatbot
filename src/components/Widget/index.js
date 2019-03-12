import React from 'react';
import ReactDom from 'react-dom';
import Widgetlayout from './layout';

class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oppenedConversation: false
        };
    }

    toggleConversation () {
        this.setState({
            oppenedConversation: !this.state.oppenedConversation
        });
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

export default Widget;