exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      waitForAction: 1000,
      windowSize: '1920x1080',
      chrome: {
        defaultViewport: {
          width: 1920,
          height: 1080
        },
        handleSIGINT: false,
      },
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'chatbot'
};