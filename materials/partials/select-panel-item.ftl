<div class="select-panel-item-widget ${classes} <#if active>active</#if>" data-name="${name}" data-key="${key}"
        onclick="${testMode?string('alert(&quot;Select Panel Item clicked&quot;); event.preventDefault();','')}">
    <#if active>
        <input type="hidden" name="${name}" value="${key}"/>
    </#if>
    ${content}
</div>