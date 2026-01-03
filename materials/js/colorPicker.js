import $ from "jquery";

$(function () {

    let hasValue = false;
    const colorPickerDisc = $('.color-picker-disc');
    const luminosity = $('.luminosity')
    const luminosityCursor = $('.luminosity-cursor');
    const points = {
        red: absoluteCoords(calculateCoordinates({angle: 90, radius: 300}), 300),
        blue: absoluteCoords(calculateCoordinates({angle: 210, radius: 300}), 300),
        green: absoluteCoords(calculateCoordinates({angle: 330, radius: 300}), 300),
    };
    let luminosityValue = 0.5;
    let colors = {
        first: {red: 255, green: 255, blue: 255},
        second: {red: 255, green: 255, blue: 255},
        third: {red: 255, green: 255, blue: 255},
        fourth: {red: 255, green: 255, blue: 255},
        fifth: {red: 255, green: 255, blue: 255},
    };
    let labels = {
        first: 'PRIMARY',
        second: 'SUCCESS',
        third: 'INFO',
        fourth: 'WARNING',
        fifth: 'DANGER'
    }
    let radius = colorPickerDisc.height() / 2;
    luminosityCursor.css("visibility", "hidden");

    $('.color-picker-disc .inner').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
    $('.color-picker-disc .inner').mousemove(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
    $('.color-picker-disc .inner').mouseup(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
    $('.color-picker-disc .inner').mousedown(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });

    Object.entries(labels).forEach(([key, value]) => {
        $(`select[name="${key}"]`).val(value);
    });

    $(".color-select select").change(({target: {name, value}}) => {

        const label = Object.entries(labels).find(([k, v]) => k === name)[1];
        const ordinal = Object.entries(labels).find(([k, v]) => v === value)[0]
        labels[ordinal] = label;
        labels[name] = value;
        renderColor();
    });

    $(window).resize(function (event) {
        radius = colorPickerDisc.height() / 2;
        renderColor();
    });

    function processColorPickerEvent(event) {

        function calculateColor(args) {

            let red = fix(calculateDistance(args.x, args.y, points.red.x, points.red.y));
            let green = fix(calculateDistance(args.x, args.y, points.green.x, points.green.y));
            let blue = fix(calculateDistance(args.x, args.y, points.blue.x, points.blue.y));

            const redOffset = adj(Math.abs(Math.min(0, red)));
            const greenOffset = adj(Math.abs(Math.min(0, green)));
            const blueOffset = adj(Math.abs(Math.min(0, blue)));

            red = Math.max(0, red);
            green = Math.max(0, green);
            blue = Math.max(0, blue);

            red += greenOffset + blueOffset;
            green += redOffset + blueOffset;
            blue += greenOffset + redOffset;

            return {red, green, blue, ...args};
        }

        const polar = calculatePolar(relativeCoords({
            x: scaleOut(event.offsetX),
            y: scaleOut(event.offsetY)
        }, 300));

        const coordinates = {
            first: absoluteCoords(calculateCoordinates(polar), 300),
            second: absoluteCoords(calculateCoordinates({
                angle: polar.angle + 72,
                radius: polar.radius
            }), 300),
            third: absoluteCoords(calculateCoordinates({
                angle: polar.angle + 144,
                radius: polar.radius
            }), 300),
            fourth: absoluteCoords(calculateCoordinates({
                angle: polar.angle + 216,
                radius: polar.radius
            }), 300),
            fifth: absoluteCoords(calculateCoordinates({
                angle: polar.angle + 288,
                radius: polar.radius
            }), 300)
        }

        colors = {
            first: calculateColor(coordinates.first),
            second: calculateColor(coordinates.second),
            third: calculateColor(coordinates.third),
            fourth: calculateColor(coordinates.fourth),
            fifth: calculateColor(coordinates.fifth),
        };
    }

    function renderColor() {
        function applyLuminosity(amt) {

            if (luminosityValue > 0.5) {
                return amt + (luminosityValue - 0.5) / 0.5 * (255 - amt)
            } else {
                return amt - (0.5 - luminosityValue) / 0.5 * amt;
            }
        }

        const adjustedColors = {
            first: {
                red: applyLuminosity(colors.first.red),
                green: applyLuminosity(colors.first.green),
                blue: applyLuminosity(colors.first.blue)
            },
            second: {
                red: applyLuminosity(colors.second.red),
                green: applyLuminosity(colors.second.green),
                blue: applyLuminosity(colors.second.blue)
            },
            third: {
                red: applyLuminosity(colors.third.red),
                green: applyLuminosity(colors.third.green),
                blue: applyLuminosity(colors.third.blue)
            },
            fourth: {
                red: applyLuminosity(colors.fourth.red),
                green: applyLuminosity(colors.fourth.green),
                blue: applyLuminosity(colors.fourth.blue)
            },
            fifth: {
                red: applyLuminosity(colors.fifth.red),
                green: applyLuminosity(colors.fifth.green),
                blue: applyLuminosity(colors.fifth.blue)
            },
        };

        const output = {
            primary: adjustedColors[Object.entries(labels).find(([key, value]) => value === 'PRIMARY')[0]],
            success: adjustedColors[Object.entries(labels).find(([key, value]) => value === 'SUCCESS')[0]],
            info: adjustedColors[Object.entries(labels).find(([key, value]) => value === 'INFO')[0]],
            warning: adjustedColors[Object.entries(labels).find(([key, value]) => value === 'WARNING')[0]],
            danger: adjustedColors[Object.entries(labels).find(([key, value]) => value === 'DANGER')[0]],
        }

        luminosity.css('background', 'linear-gradient(to bottom, white, ' + rgb(colors.first) + ', black)');
        luminosityCursor.css("visibility", "unset");
        $(".color-picker #color-picker-value").val(JSON.stringify(output));
        $('.color-picker .color-select:nth-child(1) .color').css('background', rgb(adjustedColors.first));
        $('.color-picker .color-select:nth-child(2) .color').css('background', rgb(adjustedColors.second));
        $('.color-picker .color-select:nth-child(3) .color').css('background', rgb(adjustedColors.third));
        $('.color-picker .color-select:nth-child(4) .color').css('background', rgb(adjustedColors.fourth));
        $('.color-picker .color-select:nth-child(5) .color').css('background', rgb(adjustedColors.fifth));

        $('#first-coordinates').css({
            'top': 0,
            'left': 0,
            'width': scaleIn(colors.first.x) + 'px',
            'height': scaleIn(colors.first.y) + 'px'
        });
        $('#second-coordinates').css({
            'top': 0,
            'left': 0,
            'width': scaleIn(colors.second.x) + 'px',
            'height': scaleIn(colors.second.y) + 'px'
        });
        $('#third-coordinates').css({
            'top': 0,
            'left': 0,
            'width': scaleIn(colors.third.x) + 'px',
            'height': scaleIn(colors.third.y) + 'px'
        });
        $('#fourth-coordinates').css({
            'top': 0,
            'left': 0,
            'width': scaleIn(colors.fourth.x) + 'px',
            'height': scaleIn(colors.fourth.y) + 'px'
        });
        $('#fifth-coordinates').css({
            'top': 0,
            'left': 0,
            'width': scaleIn(colors.fifth.x) + 'px',
            'height': scaleIn(colors.fifth.y) + 'px'
        });

        const offset = (1 - luminosityValue) * (radius * 2);

        $('.luminosity-coordinates').css({
            'top': 0,
            'left': 0,
            'height': Math.min((radius * 2) - 26, offset - 12) + 'px'
        });

        Object.entries(labels).forEach(([key, value]) => {
            $(`select[name="${key}"]`).val(value);
        });
    }

    processDrag(colorPickerDisc, function (event) {
        processColorPickerEvent(event);
        renderColor();
        hasValue = true;
    });

    processDrag(luminosity, function (event) {
        if (hasValue) {
            const offset = event.offsetY;
            luminosityValue = 1 - offset / (radius * 2);
            renderColor();
        }
    });

    function scaleIn(val) {
        return val * radius / 300;
    }

    function scaleOut(val) {
        return val / radius * 300;
    }

    function processDrag(element, callback) {

        let dragging = false;

        element.mousedown(function (event) {
            callback(event);
            dragging = true;
        });

        element.mousemove(function (event) {
            if (dragging) {
                callback(event);
            }
        });

        element.mouseout(function (event) {
            dragging = false;
        });

        element.mouseup(function (event) {
            dragging = false;
        });
    }
});


function calculateCoordinates(args) {
    return {x: Math.cos(inRadians(args.angle)) * args.radius, y: Math.sin(inRadians(args.angle)) * args.radius};
}

function calculatePolar(args) {
    let degrees = inDegrees(Math.atan(args.y / args.x));
    if (args.x < 0) {
        degrees = 180 + degrees;
    } else {
        if (args.y < 0) {
            degrees = 360 + degrees;
        }
    }
    return {angle: degrees, radius: Math.sqrt(args.x * args.x + args.y * args.y)};
}


function calculateDistance(x1, y1, x2, y2) {
    const diffX = x1 - x2;
    const diffY = y1 - y2;

    return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY));
}

function rgb(args) {
    return 'rgb(' + args.red + ',' + args.green + ',' + args.blue + ')';
}

function fix(amt) {
    return Math.floor(255 - amt / 520 * 255);
}

function adj(amt) {
    return Math.floor(amt / 40 * 130);
}

function inDegrees(rad) {
    return rad * 180 / Math.PI;
}

function inRadians(deg) {
    return deg / 180 * Math.PI;
}

function absoluteCoords(args, radius) {
    return {
        x: args.x + radius,
        y: args.y * -1 + radius
    }
}

function relativeCoords(args, radius) {
    return {
        x: args.x - radius,
        y: (args.y - radius) * -1
    }
}

