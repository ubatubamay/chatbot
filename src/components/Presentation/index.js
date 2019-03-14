import React from 'react';
import ReactDom from 'react-dom';
import PresentationLayout from './layout';

class Presentation extends React.Component {

    constructor(props) {
        super(props);
    }

    // Functions

    // HTML
    render() {
        return (
          <PresentationLayout socket={this.props.socket}/>
        );
    }
}

export default Presentation;