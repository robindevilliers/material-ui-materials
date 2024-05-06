import $ from "jquery";

import "bootstrap/js/dist/util.js";
import "bootstrap/js/dist/modal.js";
import "bootstrap/js/dist/carousel.js";
import "bootstrap/js/dist/alert.js";
import "bootstrap/js/dist/tooltip.js";
import "bootstrap/js/dist/toast.js";
import "bootstrap/js/dist/tab.js";
import "bootstrap/js/dist/scrollspy.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/js/dist/collapse.js";
import "bootstrap/js/dist/button.js";

$(function () {
    $('.no-js-enabled').each(function () {
        $(this).removeClass('no-js-enabled').addClass('js-enabled');
    });
});

$(function () {
    $(':radio[data-mw-blind]:not([checked])').each(function () {
        $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).hide();
    });
    $(':checkbox[data-mw-blind]:not([checked])').each(function () {
        $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).hide();
    });
    $('select').each(function () {
        let id = $(this).attr('id');
        $(this).find('option[data-mw-blind]:not([selected])').each(function () {
            $('#value-panel-' + id + '-' + $(this).data('mw-blind')).hide();
        });
    });
});

$(':radio').change(function () {

    $(':radio[data-mw-blind][name=' + $(this).attr('name') + ']').each(function () {
        $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).animate({ height : 'hide' });
    });
    if ($(this).is("[data-mw-blind]")) {
        if ($(this).is(":checked")) {
            $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).animate({ height : 'show' });
        } else {
            $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).animate({ height : 'hide' });
        }
    }
});

$(':checkbox').change(function () {
    if ($(this).is(":checked")) {
        $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).animate({ height : 'show' });
    } else {
        $('#value-panel-' + $(this).attr('id') + '-' + $(this).data('mw-blind')).animate({ height : 'hide' });
    }
});

$('select').change(function () {
    let values = $(this).val();
    if (!Array.isArray(values)) {
        values = [values];
    }

    const id = $(this).attr('id');
    $(this).find('option[data-mw-blind]').each(function () {
        const val = $(this).attr('value');
        if (values.includes(val)) {
            $('#value-panel-' + id + '-' + $(this).data('mw-blind')).animate({ height : 'show' });
        } else {
            $('#value-panel-' + id + '-' + $(this).data('mw-blind')).animate({ height : 'hide' });
        }
    });
});


$(function () {
    $('.mw-collapse').each(function () {
        // $(this).attr("data-display", $(this).css("display"));
        $(this).css("display", "none");
    });
});

$('[data-toggle="mw-collapse"]').click(function (e) {

    const element = $($(this).attr('href'));
    const parent = element.attr("data-parent");
    if (parent) {
        $(parent + " .mw-collapse").each(function () {
            $(this).css("display", "none");
        });
    }
    console.log(element.attr("data-display"))
    element.css("display", element.attr("data-display"));
    e.preventDefault();
});
