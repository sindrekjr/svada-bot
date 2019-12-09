'use strict';

const main = require('./src/main.js');
const config = (function () {
    try {
        // If config.json doesn't exist, the following line will throw an error
        return require('./config.json');
    } catch (e) {
        // Catch error and assume there are environment variables available instead
        return process.env;
    }
})();

// Run main module
main(config);
