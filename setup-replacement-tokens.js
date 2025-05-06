const fs = require('fs');

const file = 'materials/public/css/main.css';

/*
This script replaces local fonts and colors with tokens that the platform can replace as the css is fed through to the
end user.  This allows the configuration of these values in settings on the account, and supports auto enrolment.
 */

console.log('> running setup-replacement-tokens');

/*
At some point I will modify materials so that these mappings are expressed in scss, and a pre-processor will
parse them out, build with in-situ values for www here, and replace with tokens for materials.  This method,
while cheap, is brittle.
 */

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
    .replace(/#a9c8c0/g, 'COLOR_INFO')
    .replace(/Arial,Helvetica Neue,Helvetica,sans-serif/g, 'FONT_TITLE_PRIMARY_FAMILY')
    .replace(/Arial Narrow,Arial,sans-serif/g, 'FONT_TITLE_SECONDARY_FAMILY')
    .replace(/TimesNewRoman,Times New Roman,Times,Baskerville,Georgia,serif/g, 'FONT_TEXT_FAMILY')
    .replace(/Arial,Helvetica Neue,Helvetica,LiberationSans,sans-serif/g, 'FONT_LABEL_FAMILY')
    .replace(/Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif/g, 'FONT_EXHIBIT_FAMILY');

    fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
