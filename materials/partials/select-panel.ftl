<div class="select-panel-widget ${classes}" style="${itemStyles}" <#if disabled>disabled</#if> data-cardinality="${cardinality}">
    <label class="form-label ${textualClasses}" style="${textualStyles}" for="${id}">${label}</label>
    <div id="${id}" class="select-panel-content">
        ${content}
    </div>
</div>