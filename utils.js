const namedColors = {
    white: '#FFFFFF',
    black: '#000000',
    gray: '#808080',
    lightgray: '#D3D3D3',
    darkgray: '#A9A9A9',
    silver: '#C0C0C0',
    lavender: '#E6E6FA'
};

module.exports = {
    mix,
    toHex,
    color,
    darken,
    lighten,
    fromHsl,
    toHsl,
    rgba,
    rgb,
    darkenA,
    toRgba,
    colorA,
    colorYiq,
    colorYiqIf,
    themeColorLevel
}

function rgb(r, g, b) {
    return {
        red: r, green: g, blue: b
    };
}

function rgba(r, g, b, a) {
    return {
        red: r, green: g, blue: b, alpha: a
    };
}

function colorA(value, alpha) {
    const col = color(value);
    col.alpha = alpha;
    return col;
}

function color(value) {
    if (value === null || value === undefined) {
        return value;
    }

    if (value.charAt(0) === '#') {
        if (value.length === 4) {
            return {
                red: Number('0x' + value.charAt(1) + value.charAt(1)),
                green: Number('0x' + value.charAt(2) + value.charAt(2)),
                blue: Number('0x' + value.charAt(3) + value.charAt(3)),
            }
        } else if (value.length === 7) {
            return {
                red: Number('0x' + value.substring(1, 3)),
                green: Number('0x' + value.substring(3, 5)),
                blue: Number('0x' + value.substring(5, 7)),
            }
        }
    } else if (value.startsWith('rgb(')) {

        const argString = value.substring(4, value.length);

        const args = argString.split(',').map(s => s.trim());

        return {
            red: Number(args[0]),
            green: Number(args[1]),
            blue: Number(args[2]),
        }

    } else {
        return color(namedColors[value]);
    }
}

function toHex(color) {

    function format(val) {
        return ('00' + Math.round(val).toString(16)).slice(-2);
    }

    const rh = format(color.red);
    const gh = format(color.green);
    const bh = format(color.blue);

    return "#" + rh + gh + bh;
}

// function toHexA(color) {
//
//     const rh = Math.round(color.red).toString(16);
//     const gh = Math.round(color.green).toString(16);
//     const bh = Math.round(color.blue).toString(16);
//     const ah = Math.round(color.alpha).toString(16); //NOT CORRECT
//
//     return "#" + rh + gh + bh + ah;
// }

function toRgba(color, alpha) {
    return `rgba(${color.red},${color.green},${color.blue},${alpha ? alpha : color.alpha})`;
}

function toHsl(color) {
    // Then to HSL
    let {red: r, green: g, blue: b} = color;

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = h * 60;

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(10);
    l = +(l * 100).toFixed(10);

    return {
        hue: h,
        sat: s,
        lum: l
    };
}

function toHslA(color) {
    const hsl = toHsl(color);
    hsl.alpha = color.alpha;
    return hsl;
}


function darkenA(color, amount) {
    const hsl = toHslA(color);
    hsl.lum = Math.max(hsl.lum - amount, 0);
    return fromHslA(hsl);
}

function darken(color, amount) {
    const hsl = toHsl(color);
    hsl.lum = Math.max(hsl.lum - amount, 0);
    return fromHsl(hsl);
}

function lighten(color, amount) {
    const hsl = toHsl(color);
    hsl.lum = Math.max(hsl.lum + amount, 0);
    return fromHsl(hsl);
}

function fromHsl(hsl) {
    let {hue: h, sat: s, lum: l} = hsl;

    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = ((r + m) * 255);
    g = ((g + m) * 255);
    b = ((b + m) * 255);

    return {
        red: r, blue: b, green: g
    };
}

function fromHslA(hsl) {
    const color = fromHsl(hsl);
    color.alpha = hsl.alpha;
    return color;
}

function mix(color1, color2, weight) {

    function mixP(color1, color2, weight) {
        return Math.max(color2 + (color1 - color2) * (weight / 100.0), 0);
    }

    return {
        red: mixP(color1.red, color2.red, weight),
        green: mixP(color1.green, color2.green, weight),
        blue: mixP(color1.blue, color2.blue, weight)
    }
}


function colorYiq(color, dark, light) {
    if ((color.red * 299 + color.green * 587 + color.blue * 114) * 0.001 >= 150) {
        return dark;
    } else {
        return light;
    }
}

function colorYiqIf(color, trueValue, falseValue) {
    if ((color.red * 299 + color.green * 587 + color.blue * 114) * 0.001 >= 150) {
        return trueValue;
    } else {
        return falseValue;
    }
}

function themeColorLevel(colorCode, level) {
    const base = level > 0 ? color('black') : color('white');
    return mix(base, colorCode, Math.abs(level) * 8)
}
