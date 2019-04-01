exports.config = {
  tests: './tests/*_test.js',
  output: './tests/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      waitForAction: 1000,
      windowSize: '925x900',
      chrome: {
        defaultViewport: {
          width: 925,
          height: 900
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