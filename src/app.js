import React from 'react';
import './app.scss';
import Presentation from './components/Presentation';
import socketIOClient from 'socket.io-client';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const socket = socketIOClient('localhost:4001');
    return (
      <Presentation socket={socket}/>
    );
  }
}

export default App;