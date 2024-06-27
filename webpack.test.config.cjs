const path = require('path');

module.exports = {
    entry : './test/js/main.js',
    output : {
        filename : 'main.js',
        path : path.resolve(__dirname, 'www/public/js'),
    },
};