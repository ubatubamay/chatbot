import React from 'react';
import socketIOClient from 'socket.io-client';

import Structure from './components/Structure';
import Login from './components/Login';


import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkLoggin = this.checkLoggin.bind(this);
    this.state = {
        isLogged: false,
        userName: null,
        socket: socketIOClient('localhost:4001')
    };
  }

  componentDidMount() {
      this.checkLoggin();
  }

  checkLoggin() {
      if (sessionStorage.getItem("isLoggedIn") !== null) {
          this.setState({ userName: sessionStorage.getItem("isLoggedIn"), isLogged: true });
      }
  }

  handleLogin(userName) {
      this.setState({ 
          isLogged: true,
          userName: userName
      });
  }

  handleLogout(){
      sessionStorage.removeItem("isLoggedIn");
      this.setState({
          isLogged: false
      });
  }

  render() {
      return (
          <div className="chatpage">
              {this.state.isLogged ? (
                  <Structure userName={this.state.userName} handleLogout={this.props.handleLogout} socket={this.props.socket}/>
              ) : (
                  <Login handleLogin={this.props.handleLogin} socket={this.props.socket}/>
              )}
          </div>
      );
  }
}

export default App;