/*
    This file will go through a css file and replace tokens with customized values.
    The source css should be the tokenized output of the sass build that the Maximillian platform will use.
    The Maximillian platform will do what this script is doing but on the fly with whatever tokens have been
    configured within settings.
 */

const {
    mix,
    toHex,
    color,
    darken,
    lighten,
    rgba,
    darkenA,
    toRgba,
    colorA,
    colorYiq,
    rgb,
    colorYiqIf,
    themeColorLevel
} = require("./utils");

const fs = require('fs');
const path = require('path');

const themeColorMappings = {
    "COLOR_DEFAULT": "#808080",
    "COLOR_PRIMARY": "#81b1cc",
    "COLOR_SUCCESS": "#c1e1c1",
    "COLOR_WARNING": "#ff964f",
    "COLOR_DANGER": "#ff6961",
    "COLOR_INFO": "#a9c8c0",
    "COLOR_MUTED": "#D3D3D3",
    "COLOR_SECONDARY": "#D3D3D3",
};

function themeColor(name) {
    return themeColorMappings[name];
}

console.log('> running customization');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

fs.mkdirSync(path.dirname(outputFile), {recursive: true});

fs.readFile(inputFile, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.replaceAll("\"rgba(black, 0)\"", toRgba(colorA("black", 0)));
    data = data.replaceAll("\"rgba(#000, 0)\"", toRgba(colorA("black", 0)));

    data = replaceForThemeColor(data, 'COLOR_DEFAULT', themeColor('COLOR_DEFAULT'));
    data = replaceForThemeColor(data, 'COLOR_PRIMARY', themeColor('COLOR_PRIMARY'));
    data = replaceForThemeColor(data, 'COLOR_SECONDARY', themeColor('COLOR_SECONDARY'));
    data = replaceForThemeColor(data, 'COLOR_SUCCESS', themeColor('COLOR_SUCCESS'));
    data = replaceForThemeColor(data, 'COLOR_WARNING', themeColor('COLOR_WARNING'));
    data = replaceForThemeColor(data, 'COLOR_INFO', themeColor('COLOR_INFO'));
    data = replaceForThemeColor(data, 'COLOR_DANGER', themeColor('COLOR_DANGER'));
    data = replaceForThemeColor(data, 'COLOR_MUTED', themeColor('COLOR_MUTED'));
    data = replaceForThemeColor(data, 'COLOR_BLACK', 'black');
    data = replaceForThemeColor(data, 'COLOR_WHITE', 'white');

    data = replaceForStandardColor(data, "#343a40");
    data = replaceForStandardColor(data, "#f8f9fa");

    const result = data

    .replaceAll("\"darken(rgba(0, 0, 0, 0.075),5%)\"", toRgba(darkenA(colorA('black', 0.075), 5)))
    .replaceAll("\"color-yiq(#28a745,#212529,#fff)\"", toHex(colorYiq(color("#28a745"), color("#212529"), color("#fff"))))
    .replaceAll("\"rgba(#28a745, 0.9)\"", toRgba(color("#28a745"), 0.9))
    .replaceAll("\"rgba(#28a745, 0.25)\"", toRgba(color("#28a745"), 0.25))
    .replaceAll("\"color-yiq(#dc3545,#212529,#fff)\"", toHex(colorYiq(color('#dc3545'), color('#212529'), color('#fff'))))
    .replaceAll("\"rgba(#dc3545, 0.9)\"", toRgba(colorA('#dc3545', 0.9)))
    .replaceAll("\"rgba(#dc3545, 0.25)\"", toRgba(colorA('#dc3545', 0.25)))
    .replaceAll("\"rgba(white, 0.15)\"", toRgba(colorA('white', 0.15)))
    .replaceAll("\"darken(rgb(247.35, 247.35, 247.35),5%)\"", toHex(darken(rgb(247.35, 247.35, 247.35), 5)))
    .replaceAll("\"color-yiq(lavender,#212529,#fff)\"", toHex(colorYiq(color("lavender"), color("#212529"), color("#fff"))))

    .replaceAll("\"rgba(0, 0, 0, 0.14)\"", toRgba(color("black"), 0.14))
    .replaceAll("\"rgba(0, 0, 0, 0.1)\"", toRgba(color("black"), 0.1))
    .replaceAll("\"rgba(0, 0, 0, 0.12)\"", toRgba(color("black"), 0.12))
    .replaceAll("\"rgba(0, 0, 0, 0.125)\"", toRgba(color("black"), 0.125))
    .replaceAll("\"rgba(0, 0, 0, 0.2)\"", toRgba(color("black"), 0.2))
    .replaceAll("\"rgba(255, 255, 255, 0.15)\"", toRgba(color("white"), 0.15))
    .replaceAll("\"rgba(0, 0, 0, 0.075)\"", toRgba(color("black"), 0.075))
    .replaceAll("\"rgba(0, 0, 0, 0.05)\"", toRgba(color("black"), 0.05))
    .replaceAll("\"rgba(57, 76, 96, 0.15)\"", toRgba(rgba(57, 76, 96, 0.15)))

    .replaceAll("\"color-yiq(#a9c8c0,#212529,#fff)\"", toHex(colorYiq(color("#a9c8c0"), color("#212529"), color("#fff"))))
    .replaceAll("\"color-yiq(#c1e1c1,#212529,#fff)\"", toHex(colorYiq(color("#c1e1c1"), color("#212529"), color("#fff"))))
    .replaceAll("\"color-yiq(#e9e9e9,#212529,#fff)\"", toHex(colorYiq(color("#e9e9e9"), color("#212529"), color("#fff"))))
    .replaceAll("\"rgba(#000, 0.03)\"", toRgba(rgba(0, 0, 0, 0.03)))
    .replaceAll("\"rgba(#000, 0.05)\"", toRgba(rgba(0, 0, 0, 0.05)))
    .replaceAll("\"rgba(#000, 0.075)\"", toRgba(rgba(0, 0, 0, 0.075)))
    .replaceAll("\"rgba(#000, 0.175)\"", toRgba(rgba(0, 0, 0, 0.175)))
    .replaceAll("\"rgba(#000, 0.1)\"", toRgba(rgba(0, 0, 0, 0.1)))
    .replaceAll("\"rgba(#000, 0.2)\"", toRgba(rgba(0, 0, 0, 0.2)))
    .replaceAll("\"rgba(#000, 0.15)\"", toRgba(rgba(0, 0, 0, 0.15)))
    .replaceAll("\"rgba(#000, 0.9)\"", toRgba(rgba(0, 0, 0, 0.9)))
    .replaceAll("\"rgba(#000, 0.5)\"", toRgba(rgba(0, 0, 0, 0.5)))
    .replaceAll("\"rgba(#000, 0.7)\"", toRgba(rgba(0, 0, 0, 0.7)))
    .replaceAll("\"rgba(#000, 0.3)\"", toRgba(rgba(0, 0, 0, 0.3)))
    .replaceAll("\"rgba(#000, 0.125)\"", toRgba(rgba(0, 0, 0, 0.125)))
    .replaceAll("\"darken(rgba(#000, 0.075),5%)\"", toRgba(darkenA(colorA('black', 0.075), 5)))
    .replaceAll("\"rgba(#fff, 0.1)\"", toRgba(rgba(255, 255, 255, 0.1)))
    .replaceAll("\"rgba(#fff, 0.15)\"", toRgba(rgba(255, 255, 255, 0.15)))
    .replaceAll("\"rgba(#fff, 0.05)\"", toRgba(rgba(255, 255, 255, 0.05)))
    .replaceAll("\"rgba(#fff, 0.075)\"", toRgba(rgba(255, 255, 255, 0.075)))
    .replaceAll("\"rgba(#fff, 0.75)\"", toRgba(rgba(255, 255, 255, 0.75)))
    .replaceAll("\"rgba(#fff, 0.25)\"", toRgba(rgba(255, 255, 255, 0.25)))
    .replaceAll("\"rgba(#fff, 0.85)\"", toRgba(rgba(255, 255, 255, 0.85)))
    .replaceAll("\"rgba(#fff, 0.5)\"", toRgba(rgba(255, 255, 255, 0.5)))
    .replaceAll("\"darken(#212529,5%)\"", toHex(darken(color("#212529"), 5)))
    .replaceAll("\"darken(#000,5%)\"", toHex(darken(color("#000"), 5)))
    .replaceAll("\"darken(#fff,3%)\"", toHex(darken(color("#fff"), 3)))
    .replaceAll("\"darken(darken(#fff,3%),5%)\"", toHex(darken(darken(color("#fff"), 3), 5)))
    .replaceAll("\"fade-in(rgba(#000, 0.2),0.05)\"", toHex(rgba(0, 0, 0, 0.3)))

    //color picker mappings
    .replaceAll("\"rgba(64, 87, 109, 0.07)\"", toRgba(rgba(64, 87, 109, 0.07)))
    .replaceAll("\"rgba(242, 13, 13, 0.8)\"", toRgba(rgba(242, 13, 13, 0.8)))
    .replaceAll("\"rgba(230, 26, 26, 0.6)\"", toRgba(rgba(230, 26, 26, 0.6)))
    .replaceAll("\"rgba(204, 51, 51, 0.4)\"", toRgba(rgba(204, 51, 51, 0.4)))
    .replaceAll("\"rgba(166, 89, 89, 0.2)\"", toRgba(rgba(166, 89, 89, 0.2)))
    .replaceAll("\"rgba(242, 185, 13, 0.8)\"", toRgba(rgba(242, 185, 13, 0.8)))
    .replaceAll("\"rgba(230, 179, 26, 0.6)\"", toRgba(rgba(230, 179, 26, 0.6)))
    .replaceAll("\"rgba(204, 166, 51, 0.4)\"", toRgba(rgba(204, 166, 51, 0.4)))
    .replaceAll("\"rgba(166, 147, 89, 0.2)\"", toRgba(rgba(166, 147, 89, 0.2)))
    .replaceAll("\"rgba(128, 242, 13, 0.8)\"", toRgba(rgba(128, 242, 13, 0.8)))
    .replaceAll("\"rgba(128, 230, 26, 0.6)\"", toRgba(rgba(128, 230, 26, 0.6)))
    .replaceAll("\"rgba(128, 204, 51, 0.4)\"", toRgba(rgba(128, 204, 51, 0.4)))
    .replaceAll("\"rgba(128, 166, 89, 0.2)\"", toRgba(rgba(128, 166, 89, 0.2)))
    .replaceAll("\"rgba(13, 242, 70, 0.8)\"", toRgba(rgba(13, 242, 70, 0.8)))
    .replaceAll("\"rgba(26, 230, 77, 0.6)\"", toRgba(rgba(26, 230, 77, 0.6)))
    .replaceAll("\"rgba(51, 204, 89, 0.4)\"", toRgba(rgba(51, 204, 89, 0.4)))
    .replaceAll("\"rgba(89, 166, 108, 0.2)\"", toRgba(rgba(89, 166, 108, 0.2)))
    .replaceAll("\"rgba(13, 242, 242, 0.8)\"", toRgba(rgba(13, 242, 242, 0.8)))
    .replaceAll("\"rgba(26, 230, 230, 0.6)\"", toRgba(rgba(26, 230, 230, 0.6)))
    .replaceAll("\"rgba(51, 204, 204, 0.4)\"", toRgba(rgba(51, 204, 204, 0.4)))
    .replaceAll("\"rgba(89, 166, 166, 0.2)\"", toRgba(rgba(89, 166, 166, 0.2)))
    .replaceAll("\"rgba(13, 70, 242, 0.8)\"", toRgba(rgba(13, 70, 242, 0.8)))
    .replaceAll("\"rgba(26, 77, 230, 0.6)\"", toRgba(rgba(26, 77, 230, 0.6)))
    .replaceAll("\"rgba(51, 89, 204, 0.4)\"", toRgba(rgba(51, 89, 204, 0.4)))
    .replaceAll("\"rgba(89, 108, 166, 0.2)\"", toRgba(rgba(89, 108, 166, 0.2)))
    .replaceAll("\"rgba(128, 13, 242, 0.8)\"", toRgba(rgba(128, 13, 242, 0.8)))
    .replaceAll("\"rgba(128, 26, 230, 0.6)\"", toRgba(rgba(128, 26, 230, 0.6)))
    .replaceAll("\"rgba(128, 51, 204, 0.4)\"", toRgba(rgba(128, 51, 204, 0.4)))
    .replaceAll("\"rgba(128, 89, 166, 0.2)\"", toRgba(rgba(128, 89, 166, 0.2)))
    .replaceAll("\"rgba(242, 13, 185, 0.8)\"", toRgba(rgba(242, 13, 185, 0.8)))
    .replaceAll("\"rgba(230, 26, 179, 0.6)\"", toRgba(rgba(230, 26, 179, 0.6)))
    .replaceAll("\"rgba(204, 51, 166, 0.4)\"", toRgba(rgba(204, 51, 166, 0.4)))
    .replaceAll("\"rgba(166, 89, 147, 0.2)\"", toRgba(rgba(166, 89, 147, 0.2)))
    .replaceAll("\"rgba(0, 0, 0, 0)\"", toRgba(rgba(0, 0, 0, 0)))

    .replace(/FONT_TITLE_PRIMARY_FAMILY/g, 'Liberation Sans, sans-serif')
    .replace(/FONT_TITLE_SECONDARY_FAMILY/g, 'Liberation Sans, sans-serif')
    .replace(/FONT_TEXT_FAMILY/g, 'Liberation Sans, sans-serif')
    .replace(/FONT_LABEL_FAMILY/g, 'Liberation Sans, sans-serif')
    .replace(/FONT_EXHIBIT_FAMILY/g, 'Liberation Mono, monospace')

    .replace(/FONT_TITLE_PRIMARY_SIZE/g, 'initial')
    .replace(/FONT_TITLE_SECONDARY_SIZE/g, 'initial')
    .replace(/FONT_TEXT_SIZE/g, 'initial')
    .replace(/FONT_LABEL_SIZE/g, 'initial')
    .replace(/FONT_EXHIBIT_SIZE/g, 'initial')

    .replace(/FONT_TITLE_PRIMARY_WEIGHT/g, 'inherit')
    .replace(/FONT_TITLE_SECONDARY_WEIGHT/g, 'inherit')
    .replace(/FONT_TEXT_WEIGHT/g, 'inherit')
    .replace(/FONT_LABEL_WEIGHT/g, 'inherit')
    .replace(/FONT_EXHIBIT_WEIGHT/g, 'inherit')

    .replace(/FONT_TITLE_PRIMARY_STYLE/g, 'inherit')
    .replace(/FONT_TITLE_SECONDARY_STYLE/g, 'inherit')
    .replace(/FONT_TEXT_STYLE/g, 'inherit')
    .replace(/FONT_LABEL_STYLE/g, 'inherit')
    .replace(/FONT_EXHIBIT_STYLE/g, 'inherit')

    .replace(/FONT_TITLE_PRIMARY_DECORATION/g, 'inherit')
    .replace(/FONT_TITLE_SECONDARY_DECORATION/g, 'inherit')
    .replace(/FONT_TEXT_DECORATION/g, 'inherit')
    .replace(/FONT_LABEL_DECORATION/g, 'inherit')
    .replace(/FONT_EXHIBIT_DECORATION/g, 'inherit')
    ;

    fs.writeFile(outputFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

function replaceForStandardColor(data, colorCode) {
    return data
    .replaceAll(`"color-yiq(${colorCode},#212529,#fff)"`, toHex(colorYiq(color(colorCode), color('#212529'), color('#fff'))))
    .replaceAll(`"color-yiq(darken(${colorCode},7.5%),#212529,#fff)"`, toHex(colorYiq(darken(color(colorCode), 7.5), color('#212529'), color('#fff'))))
    .replaceAll(`"color-yiq(darken(${colorCode},10%),#212529,#fff)"`, toHex(colorYiq(darken(color(colorCode), 10), color('#212529'), color('#fff'))))
    .replaceAll(`"theme-color-level(${colorCode},-10)"`, toHex(themeColorLevel(color(colorCode), -10)))
    .replaceAll(`"theme-color-level(${colorCode},-9)"`, toHex(themeColorLevel(color(colorCode), -9)))
    .replaceAll(`"theme-color-level(${colorCode},-6)"`, toHex(themeColorLevel(color(colorCode), -6)))
    .replaceAll(`"theme-color-level(${colorCode},6)"`, toHex(themeColorLevel(color(colorCode), 6)))
    .replaceAll(`"darken(theme-color-level(${colorCode},-9),5%)"`, toHex(darken(themeColorLevel(color(colorCode), -9), 5)))
    .replaceAll(`"darken(theme-color-level(${colorCode},-10),10%)"`, toHex(darken(themeColorLevel(color(colorCode), -10), 10)))
    .replaceAll(`"darken(theme-color-level(${colorCode},6),10%)"`, toHex(darken(themeColorLevel(color(colorCode), 6), 10)))
    .replaceAll(`"lighten(${colorCode},7.5%)"`, toHex(lighten(color(colorCode), 7.5)))
    .replaceAll(`"darken(${colorCode},7.5%)"`, toHex(darken(color(colorCode), 7.5)))
    .replaceAll(`"darken(${colorCode},10%)"`, toHex(darken(color(colorCode), 10)))
    .replaceAll(`"darken(${colorCode},12.5%)"`, toHex(darken(color(colorCode), 12.5)))
    .replaceAll(`"darken(${colorCode},15%)"`, toHex(darken(color(colorCode), 15)))
    .replaceAll(`"rgba(mix(color-yiq(${colorCode},#212529,#fff),${colorCode},15%), 0.5)"`, toHex(mix(colorYiq(color(colorCode), color('#212529'), color('#fff')), color(colorCode), 15), 0.5))
    .replaceAll(`"rgba(${colorCode}, 0.5)"`, toRgba(color(colorCode), 0.5))
    .replaceAll(`"theme-color-level(${colorCode},color-yiq-if(${colorCode},1,-3))"`, toHex(themeColorLevel(color(colorCode), colorYiqIf(color(colorCode), 1, -3))))
    ;
}

function replaceForThemeColor(data, colorTheme, colorCode) {
    return data
    .replaceAll(`"mix(#fff,${colorTheme},72%)"`, toHex(mix(color('white'), color(colorCode), 72)))
    .replaceAll(`"mix(#fff,${colorTheme},48%)"`, toHex(mix(color('white'), color(colorCode), 48)))
    .replaceAll(`"darken(mix(#fff,${colorTheme},72%),5%)"`, toHex(darken(mix(color('white'), color(colorCode), 72), 5)))
    .replaceAll(`"color-yiq(${colorTheme},#212529,#fff)"`, toHex(colorYiq(color(colorCode), color('#212529'), color('#fff'))))
    .replaceAll(`"color-yiq(darken(${colorTheme},7.5%),#212529,#fff)"`, toHex(colorYiq(darken(color(colorCode), 7.5), color('#212529'), color('#fff'))))
    .replaceAll(`"darken(${colorTheme},7.5%)"`, toHex(darken(color(colorCode), 7.5)))
    .replaceAll(`"darken(${colorTheme},10%)"`, toHex(darken(color(colorCode), 10)))
    .replaceAll(`"darken(${colorTheme},15%)"`, toHex(darken(color(colorCode), 15)))
    .replaceAll(`"lighten(${colorTheme},7.5%)"`, toHex(lighten(color(colorCode), 7.5)))
    .replaceAll(`"lighten(${colorTheme},25%)"`, toHex(lighten(color(colorCode), 25)))
    .replaceAll(`"lighten(${colorTheme},35%)"`, toHex(lighten(color(colorCode), 35)))
    .replaceAll(`"lighten(${colorTheme},10%)"`, toHex(lighten(color(colorCode), 10)))
    .replaceAll(`"rgba(mix(color-yiq(${colorTheme},#212529,#fff),${colorTheme},15%), 0.5)"`, toRgba(mix(colorYiq(color(colorCode), color("#212529"), color("#fff")), color(colorCode), 15), 0.5))
    .replaceAll(`"color-yiq(darken(${colorTheme},10%),#212529,#fff)"`, toHex(colorYiq(darken(color(colorCode), 10), color("#212529"), color("#fff"))))
    .replaceAll(`"darken(${colorTheme},12.5%)"`, toHex(darken(color(colorCode), 12.5)))
    .replaceAll(`"mix(#000,${colorTheme},48%)"`, toHex(mix(color("black"), color(colorCode), 48)))
    .replaceAll(`"rgba(${colorTheme}, 0.5)"`, toRgba(color(colorCode), 0.5))
    .replaceAll(`"rgba(${colorTheme}, 0.25)"`, toRgba(color(colorCode), 0.25))
    .replaceAll(`"rgba(${colorTheme}, 0.9)"`, toRgba(color(colorCode), 0.9))
    .replaceAll(`"mix(#fff,${colorTheme},80%)"`, toHex(mix(color("white"), color(colorCode), 80)))
    .replaceAll(`"darken(mix(#000,${colorTheme},48%),10%)"`, toHex(darken(mix(color("black"), color(colorCode), 48), 10)))
    .replaceAll(`"theme-color-level(${colorTheme},color-yiq-if(${colorTheme},1,-3))"`, toHex(themeColorLevel(color(colorCode), colorYiqIf(color(colorCode), 1, -3))))

    .replaceAll(`"theme-color-level(${colorTheme},-9)"`, toHex(themeColorLevel(color(colorCode), -9)))
    .replaceAll(`"theme-color-level(${colorTheme},-6)"`, toHex(themeColorLevel(color(colorCode), -6)))
    .replaceAll(`"darken(theme-color-level(${colorTheme},-9),5%)"`, toHex(darken(themeColorLevel(color(colorCode), -9), 5)))

    .replaceAll(`"theme-color-level(${colorTheme},6)"`, toHex(themeColorLevel(color(colorCode), 6)))
    .replaceAll(`"theme-color-level(${colorTheme},-10)"`, toHex(themeColorLevel(color(colorCode), -10)))
    .replaceAll(`"darken(theme-color-level(${colorTheme},6),10%)"`, toHex(darken(themeColorLevel(color(colorCode), 6), 10)))
    .replaceAll(colorTheme, colorCode)
    ;
}
