<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>

<div class="scale-widget ${classes}" style="${itemStyles}">
    <div class="form-group">
        <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>"
                style="${textualStyles}">${content}</label>
        <div class="scale-content input-group">
            <#list values as val>
                <div class="form-radio form-radio-inline">
                    <input class="form-radio-input ${sizeCls}" name="${name}" value="${val.key}"
                            <#if disabled??>disabled</#if> <#if value?? && value == val.key>checked</#if>
                            type="radio" id="${id}-${val.key}"/>
                    <label class="form-radio-label label ${sizeCls}" for="${id}-${val.key}">
                        ${val.label}
                    </label>
                </div>
            </#list>
        </div>
    </div>
    <#if (error)??>
        <span id="error-message-${name}" class="error-message">${error}</span>
    </#if>
</div>
