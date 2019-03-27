
const faker = require('faker');
const axios = require('axios');

const message = faker.random.words();
const olderUserNickname = 'rihanna';
const newUserNickname = faker.name.firstName();
const fileName = 'README.md';
const imageName = 'cancel.png';

Feature('FirstTest');

Before(() => {
    axios({
        url: 'http://localhost:4001/api/test/messages',
        method: 'DELETE',
    })
    .then((res)=>{
        console.log('MESSAGE COLLECTION CLEAR')
    })
    .catch((error)=>{
        console.log('MESSAGE COLLECTION DIRTY')
    })
    pause();
});

Scenario.only('received messages', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', newUserNickname);
    });
    I.click('button');
    session(olderUserNickname, () => {
        I.amOnPage('http://localhost:8080');
        within('.login', () => {
            I.fillField('userName', olderUserNickname);
        });
        I.click('button');
    });
    within('.chat-message', () => {
        I.fillField('Type your message', 'Hello '+olderUserNickname);
        I.click("btn-send");
    });
    session(olderUserNickname, () => {
      I.see('Hello '+olderUserNickname);
    });
});

Scenario('new user login', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', newUserNickname);
    });
    I.click('button');
    I.see('Public chat room');
    within('.user-account', () => {
        I.see(newUserNickname);
    });
    I.see(newUserNickname);
});

Scenario('old user login', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    I.see('Public chat room');
    within('.user-account', () => {
        I.see(olderUserNickname);
    });
});

Scenario('user logout', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    within('.user-account', () => {
        I.click('button');
    });
    I.see('Enter your @');
});

Scenario('new text message', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    within('.chat-message', () => {
        I.fillField('Type your message', message);
        I.click("btn-send");
    });
    I.see(message);
});

Scenario('new image message', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    within('.chat-message', () => {
        I.attachFile("input[type='file']", imageName);
        I.click('button');
    });
});

Scenario('new file message', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    within('.chat-message', () => {
        I.attachFile("input[type='file']", fileName);
        I.click('button');
    });
});

Scenario('new mix message', async (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');

    const html = await I.grabHTMLFrom('.chat-num-messages');
    const messagesCountText = html.split(' ');
    console.log(messagesCountText[1]);

    within('.chat-message', () => {
        I.fillField('Type your message', message);
        I.attachFile("input[type='file']", fileName);
        I.click('button');
    });

    const newMessageCount = parseInt(messagesCountText[1]) + 1;
    console.log(newMessageCount);
    I.see('already '+newMessageCount+' messages');
    
});