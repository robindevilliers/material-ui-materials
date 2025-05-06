import $ from "jquery";

import fonts from '../fonts.json';

// fonts.map(font => font.name).forEach(name => console.log(name));

const values = {
    "title-primary": {
        font: "Arial",
        fontSize: "1.5",
        fontStyle: "",
        fontWeight: "",
        textDecoration: "",
        flavour: "primary"
    },
    "title-secondary": {
        font: "Arial Narrow",
        fontSize: "1.25",
        fontStyle: "",
        fontWeight: "",
        textDecoration: "",
        flavour: "primary"
    },
    "text": {
        font: "Times New Roman",
        fontSize: "1",
        fontStyle: "",
        fontWeight: "",
        textDecoration: "",
        flavour: "primary"
    },
    "label": {
        font: "Verdana",
        fontSize: "1",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "initial",
        flavour: "primary"
    },
    "exhibit": {
        font: "Candara",
        fontSize: "1",
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "initial",
        flavour: "primary"
    }
}

$(function () {

    Object.entries(values).forEach(([k, v]) => {

        fonts.forEach(font => {
            const html = `<div class="dropdown-item" data-key="${k}" data-name="${font.name}">
                <div class="font-title" style="font-family: ${font.fontFamily}">${font.name}</div>            
            </div>`;

            $(`.font-picker #${k} .font-select-menu`).append(html);
        });

        $(`.font-picker #${k} .font-size`).data('key', k).data('name', 'fontSize');
        $(`.font-picker #${k} .font-style`).data('key', k).data('name', 'fontStyle');
        $(`.font-picker #${k} .font-weight`).data('key', k).data('name', 'fontWeight');
        $(`.font-picker #${k} .text-decoration`).data('key', k).data('name', 'textDecoration');
    });

    function render() {
        Object.entries(values).forEach(([k, v]) => {
            const definition = fonts.find(font => font.name === v.font);
            const style = {
                'font-family': definition.fontFamily,
                'font-size': v.fontSize + 'em',
                'text-decoration': v.textDecoration,
                'font-weight': v.fontWeight,
                'font-style': v.fontStyle
            };

            $(`.font-picker #${k}.font-line .font-package`).text(v.font);

            $(`.font-picker #${k}.font-line .font-size`).val(Number(v.fontSize));

            if (v.textDecoration === 'UNDERLINE') {
                $(`.font-picker #${k} .text-decoration`).addClass("active");
            } else {
                $(`.font-picker #${k} .text-decoration`).removeClass("active");
            }

            if (v.fontStyle === 'ITALIC') {
                $(`.font-picker #${k} .font-style`).addClass("active");
            } else {
                $(`.font-picker #${k} .font-style`).removeClass("active");
            }

            if (v.fontWeight === 'BOLD') {
                $(`.font-picker #${k} .font-weight`).addClass("active");
            } else {
                $(`.font-picker #${k} .font-weight`).removeClass("active");
            }

            $(`.font-picker .exhibit-${k}`).each(function () {
                $(this).css(style);
                if (k === 'label') {
                    const children = $(this).find("input, select, a, button, .error-message, label, .label, .no-content, .input-group");
                    children.each(function () {
                        console.log(this);
                        $(this).css(style);
                    });
                }
            });
        });


        $(".font-picker #font-picker-value").val(JSON.stringify(values));
    }

    render();

    $('.font-picker .font-select-menu .dropdown-item').click((e) => {
        const {key, name} = $(e.currentTarget).data();
        values[key].font = name;
        render();
    });

    $('.font-picker button').click((e) => {
        const {key, name} = $(e.currentTarget).data();

        if (name === 'fontWeight') {
            if (values[key][name] === 'BOLD') {
                values[key][name] = '';
            } else {
                values[key][name] = 'BOLD';
            }
        }

        if (name === 'fontStyle') {
            if (values[key][name] === 'ITALIC') {
                values[key][name] = '';
            } else {
                values[key][name] = 'ITALIC';
            }
        }

        if (name === 'textDecoration') {
            if (values[key][name] === 'UNDERLINE') {
                values[key][name] = '';
            } else {
                values[key][name] = 'UNDERLINE';
            }
        }
        render();
    });

    $('.font-picker .font-size').change(({currentTarget, target: {value}}) => {
        const {key, name} = $(currentTarget).data();
        values[key][name] = value;
        render();
    });
});


