const fs = require('fs');
const path = require('path');

const inputDirectory = 'materials/scss/';
const wwwOutputDirectory = 'tmp/www_scss';
const materialsOutputDirectory = 'tmp/materials_scss';


fs.mkdirSync(path.join(__dirname, wwwOutputDirectory), {recursive: true});

fs.mkdirSync(path.join(__dirname, materialsOutputDirectory), {recursive: true});

const files = fs.readdirSync(path.join(__dirname, inputDirectory));

files.forEach(function (file) {

    const data = fs.readFileSync(path.join(__dirname, inputDirectory, file), {encoding: 'utf8', flag: 'r'});

    const www = [];
    const materials = [];

    const tokens = data.split(/\/[*]£IF[*]\/|\/[*]£ELSE|£END[*]\//);

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if ((i - 1) % 3 === 0) {
            www.push(token);
        }

        if ((i - 2) % 3 === 0) {
            materials.push(token);
        }

        if ((i - 3) % 3 === 0) {
            www.push(token);
            materials.push(token);
        }
    }

    fs.writeFileSync(path.join(__dirname, wwwOutputDirectory, file), www.join(''));
    fs.writeFileSync(path.join(__dirname, materialsOutputDirectory, file), materials.join(''));
});