<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>

<div class="input-widget form-group ${classes}" style="${itemStyles}">

    <#if type == "NUMBER">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <input id="${id}" class="form-control ${sizeCls} validate ${classes}" type="number" min="${min!}"
                   max="${max!}" name="${reference}" value="${value!}" <#if disabled??>disabled</#if> />
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "INPUT">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <input id="${id}" class="form-control ${sizeCls} validate ${classes}" type="text" maxlength="${maxLength!}"
                   name="${reference}" value="${value!}" <#if disabled??>disabled</#if> />
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "TEXTAREA">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <textarea id="${id}" class="form-control ${sizeCls} validate ${classes}" maxlength="${maxLength!}"
                      cols="${cols!}" <#if disabled??>disabled</#if>
                          rows="${rows!}" name="${reference}">${value!}</textarea>
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "DATE">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <input id="${id}" class="form-control ${sizeCls} validate ${classes}" type="text" maxlength="${maxLength!}"
                   name="${reference}" value="${value!}" <#if disabled??>disabled</#if>
                   placeholder="yyyy-MM-dd"/>
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "DATETIME">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <input id="${id}" class="form-control ${sizeCls} validate ${classes}" type="text" maxlength="${maxLength!}"
                   name="${reference}" value="${value!}" <#if disabled??>disabled</#if>
                   placeholder="yyyy-MM-dd HH:mm"/>
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "CURRENCY">
        <label id="${reference}" class="form-label" for="${id}">${label}</label>
        <div class="input-group">
            <span class="input-group-text">${currencySymbol}</span>
            <input id="${id}" class="form-control ${sizeCls} validate ${classes}" type="number" step="0.01"
                   name="${reference}" value="${value!}" <#if disabled??>disabled</#if>
            />
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
    <#if type == "CHECKBOX">
        <div class="form-check">
            <input class="form-check-input ${sizeCls}" type="checkbox" name="${reference}" value="selected" id="${id}"
                   <#if value == 'selected'>checked</#if> <#if disabled??>disabled</#if> >
            <label class="form-check-label ${sizeCls}" for="${id}">${label}</label>
        </div>
        <#if (error)??>
            <span id="error-message-${reference}" class="form-text text-danger">${error}</span>
        </#if>
    </#if>
</div>
