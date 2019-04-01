import React from 'react';
const axios = require('axios');

import './style.scss';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.initializeSession = this.initializeSession.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);
        this.state = { 
            loginSuccesfull: false
        };
        this.props.socket.on('status', (data) =>{
            console.log(data);
        });
        this.props.socket.on('success-login', (userName) =>{
            this.initializeSession(userName);
        });
    }

    initializeSession(userName) {
        sessionStorage.setItem("isLoggedIn", userName);
        setTimeout(() => {
            this.props.login(userName);
        },400);
        this.setState({ loginSuccesfull:true });
    }

    submitLogin(event) {
        event.preventDefault();
        const userName = event.target.userName.value;        
        this.handleUserLogin(userName);
    }

    handleUserLogin(userName) {
        this.props.socket.emit('user-login', userName);
    }

    render() {
        let containerClass = ["container"];
        let loginClass = ['login'];
        if(this.state.loginSuccesfull) {
            containerClass.push('go-out');
            loginClass.push('go-out');
        }

        return (
            <div className={containerClass.join(' ')}>
                <div className={loginClass.join(' ')}>
                    <h1>Enter your @</h1>
                    <form onSubmit={this.submitLogin} name="user">
                        <input type="text" name="userName" placeholder="e.g. realfetter" autoFocus></input>
                        <button type="submit" className="btn btn--primary btn--inside">
                            <i className="fas fa-sign-in-alt"></i>
                        </button>
                    </form>
                </div>
            </div>            
        );
    }
}

export default Login;