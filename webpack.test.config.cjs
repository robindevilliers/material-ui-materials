const path = require('path');

module.exports = {
    entry : './materials/js/main.js',
    output : {
        filename : 'main.js',
        path : path.resolve(__dirname, 'www/public/js'),
    },
};