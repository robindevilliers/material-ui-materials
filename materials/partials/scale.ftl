<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>

<div class="scale-widget form-group ${classes}" style="${itemStyles}">
    <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}">${content}</label>
    <div class="scale-content">
        <#list values as val>
            <div class="form-check form-check-inline">
                <input class="form-check-input ${sizeCls}" name="${name}" value="${val.key}"
                        <#if disabled??>disabled</#if> <#if value?? && value == val.key>checked</#if>
                        type="radio" id="${id}-${val.key}"/>
                <label class="form-check-label label ${sizeCls}" for="${id}-${val.key}">
                    ${val.label}
                </label>
            </div>
        </#list>
    </div>
    <#if (error)??>
        <span id="error-message-${name}" class="error-message">${error}</span>
    </#if>
</div>
