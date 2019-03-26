import React from 'react';
const axios = require('axios');

import './style.scss';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
        this.enterLogin = this.enterLogin.bind(this);
        this.addUser = this.addUser.bind(this);
        this.initializeSession = this.initializeSession.bind(this);
        this.state = { 
            loginSuccesfull: false
        };
    }

    initializeSession(userName) {
        sessionStorage.setItem("isLoggedIn", userName);
        setTimeout(() => {
            this.props.handleLogin(userName);
        },400);
        this.setState({ loginSuccesfull:true });
    }

    addUser(userName) {
        axios.post('http://localhost:4001/api/user/', {
            userName: userName
        })
        .then(function (response) {
            console.log('entrou no then do addUser');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    enterLogin(component, userName) {
        axios.get(`http://localhost:4001/api/user/${userName}`, {
            headers: { 'Access-Control-Allow-Origin': true },
        })
        .then(function (response) {
            if (response.data) {
                component.initializeSession(userName);
            } else {
                component.addUser(userName);
                component.initializeSession(userName);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            
        });
    }

    submitLogin(event) {
        event.preventDefault();
        const userName = event.target.userName.value;        
        this.enterLogin(this, userName);
    }

    render() { 
        let containerClass = ["container"];
        if(this.state.loginSuccesfull) {
            containerClass.push('short-out');
        }

        let loginClass = ['login'];
        if (this.state.loginSuccesfull) {
            loginClass.push('fade-out');
        }
        return (
            <div className={containerClass.join(' ')}>
                <div className={loginClass.join(' ')}>
                    <h1>Enter your @</h1>
                    <form onSubmit={this.submitLogin} name="user">
                        <input type="text" name="userName" placeholder="e.g. realfetter"></input>
                        <button type="submit" className="btn btn--primary btn--inside uppercase">Enter</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default Login;