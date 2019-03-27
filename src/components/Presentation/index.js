import React from 'react';
import Structure from '../Structure';
import Login from '../Login';

class Presentation extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLoggin = this.checkLoggin.bind(this);
        this.state = {
            isLogged: false,
            userName: null
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
                    <Structure userName={this.state.userName} handleLogout={this.handleLogout} socket={this.props.socket}/>
                ) : (
                    <Login handleLogin={this.handleLogin} socket={this.props.socket}/>
                )}
            </div>
        );
    }
}

export default Presentation;