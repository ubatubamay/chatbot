
const faker = require('faker');

const message = faker.random.words();
const olderUserNickname = 'rihanna';
const newUserNickname = faker.name.firstName();
const fileName = 'README.md';
const imageName = 'cancel.png';

Feature('FirstTest');

// Before(pause);

Scenario('new user login', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', newUserNickname);
    });
    I.click('button');
    I.see('Logged as '+newUserNickname);
});

Scenario('old user login', (I) => {
    I.amOnPage('http://localhost:8080');
    within('.login', () => {
        I.fillField('userName', olderUserNickname);
    });
    I.click('button');
    I.see('Logged as '+olderUserNickname);
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