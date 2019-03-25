import React from 'react';
import ReactDom from 'react-dom';
import PresentationLayout from './layout';
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
        this.setState({
            isLogged: false
        });
    }

    componentWillMount() {
        this.checkLoggin();
    }

    render() {
        return (
            <div className="chatpage">
                {this.state.isLogged ? (
                    <Structure userName={this.state.userName} socket={this.props.socket}/>
                ) : (
                    <Login handleLogin={this.handleLogin} />
                )}
            </div>
        );
    }
}

export default Presentation;