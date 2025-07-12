<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>
<div class="locale-select-widget form-group ${classes}" style="${itemStyles}">
    <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}"
            for="${id}">${content}</label>
    <select id="${id}" class="input-group ${sizeCls} form-control" name="${name}"
            <#if disabled??>disabled</#if>>
        <option value="" disabled selected>Choose locale</option>
        <#list values as val>
            <option <#if value?? && value == val.languageTag>selected</#if>
                    value="${val.languageTag}">${val.displayName}</option>
        </#list>
    </select>
    <#if (error)??>
        <span id="error-message-${name}" class="error-message">${error}</span>
    </#if>
</div>