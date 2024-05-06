<div class="accordion-item ${classes}">
    ${header}
    <div id="panel-${id!}" class="accordion-collapse collapse  ${active?string('show','')}"
            aria-labelledby="heading-${id!}" data-parent="${singleActive?string('#' + accordionId, '')}">
        <div class="accordion-body" style="${containerStyles}">
            ${content}
        </div>
    </div>
</div>
