<#if size == 'SMALL'>
    <#assign sizeCls = 'progress-bar-small'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'progress-bar-medium'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'progress-bar-large'>
</#if>
<div id="${id!}" class="progress-bar-widget ${sizeCls} <#if axis == 'HORIZONTAL'>progress-bar-horizontal<#else>progress-bar-vertical</#if> ${classes}"
     style="${itemStyles}">
    ${content}
</div>
