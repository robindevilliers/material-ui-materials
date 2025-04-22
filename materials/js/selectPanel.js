import $ from "jquery";

$(function () {

    $('.select-panel-item-widget').click(function () {


        const disabled = !!$(this).parent().attr('disabled');

        if (disabled) {
            return;
        }

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('input').remove();
        } else {

            let selectPanel = this.parentElement;
            while (selectPanel && !$(selectPanel).hasClass("select-panel-widget")) {
                selectPanel = selectPanel.parentElement;
            }

            const cardinality = $(selectPanel).attr('data-cardinality');
            if (cardinality === 'SINGLE_SELECT') {

                Array.from(this.parentElement.children).forEach(child => {
                    if ($(child).hasClass("active")) {
                        $(child).removeClass('active');
                        $(child).find('input').remove();
                    }
                });
            }

            const name = $(this).attr('data-name');
            const key = $(this).attr('data-key');
            $(this).addClass('active');
            $('<input>').attr('type', 'hidden').attr('name', name).attr('value', key).appendTo(this);
        }
    });
});