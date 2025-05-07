const fs = require('fs');

const file = 'materials/public/css/main.css';

console.log('> running color-tokenization');

fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    //note the lack of spaces after commmas.  sass removes them in compressed mode.
    const result = data
    .replace(/#81b1cc/g, 'COLOR_PRIMARY')
    .replace(/#c1e1c1/g, 'COLOR_SUCCESS')
    .replace(/#ff964f/g, 'COLOR_WARNING')
    .replace(/#ff6961/g, 'COLOR_DANGER')
    .replace(/#a9c8c0/g, 'COLOR_INFO');

    fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
