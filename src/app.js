import React from 'react';

import Chat from './components/Chat';
import Login from './components/Login';


import './app.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.state = {
            isLogged: false,
            userName: null
        };
    }

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin() {
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
                    <Chat userName={this.state.userName} handleLogout={this.handleLogout} socket={this.props.socket}/>
                ) : (
                    <Login login={this.handleLogin} socket={this.props.socket}/>
                )}
            </div>
        );
    }
}

export default App;