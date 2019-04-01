import React from 'react';
import ReactDom from 'react-dom';
import socketIOClient from 'socket.io-client';

import App from './app.js';

const socket = socketIOClient('localhost:4001');

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(<App socket={socket}/>, container);