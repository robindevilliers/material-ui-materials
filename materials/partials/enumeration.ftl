<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>

<div id="${id}" class="enumeration-widget form-group ${classes}" style="${itemStyles}">
    <#if style == "RADIO_CHECKBOX">
        <#if cardinality == "MULTIPLE_SELECT">
            <label for="${id}" class="form-label ${textualClasses}" style="${textualStyles}">${content}</label>
            <#list values as val>
                <div class="form-check">
                    <input id="${id}-${val.key}"
                            class="form-check-input ${sizeCls}"
                            name="${name}"
                            value="${val.key}"
                            <#if disabled??>disabled</#if>
                            <#if value?? && value?seq_contains(val.key)>checked</#if>
                            type="checkbox"
                            <#if val.panel?has_content>data-mw-blind="${val.key}"</#if>
                    />
                    <label class="form-check-label ${sizeCls}" for="${id}-${val.key}">
                        ${val.label}
                    </label>
                </div>
                ${val.panel}
            </#list>
            <#if (error)??>
                <span id="error-message-${name}" class="form-text text-danger">${error}</span>
            </#if>
        <#elseif cardinality == "SINGLE_SELECT">
            <label for="${id}" class="form-label ${textualClasses}" style="${textualStyles}">${content}</label>
            <#list values as val>
                <div class="form-check">
                    <input id="${id}-${val.key}"
                            class="form-check-input ${sizeCls}"
                            name="${name}"
                            value="${val.key}"
                            <#if disabled??>disabled</#if>
                            <#if value?? && value == val.key>checked</#if>
                            type="radio"
                            id="${id}-${val.key}"
                            <#if val.panel?has_content>data-mw-blind="${val.key}"</#if>
                    />
                    <label class="form-check-label ${sizeCls}" for="${id}-${val.key}">
                        ${val.label}
                    </label>
                </div>
                ${val.panel}
            </#list>
            <#if (error)??>
                <span id="error-message-${name}" class="form-text text-danger">${error}</span>
            </#if>
        </#if>
    <#elseif style == "POPOUT_SELECT">
        <#if size == 'SMALL'>
            <#assign sizeCls = 'form-select-sm'>
        <#elseif size == 'MEDIUM'>
            <#assign sizeCls = 'form-select-md'>
        <#elseif size == 'LARGE'>
            <#assign sizeCls = 'form-select-lg'>
        </#if>
        <#if cardinality == "MULTIPLE_SELECT">
            <label class="form-label ${textualClasses}" style="${textualStyles}" for="${id}">${content}</label>
            <select id="${id}" class="input-group ${sizeCls} form-control " multiple name="${name}"
                    <#if disabled??>disabled</#if> >
                <option value="" disabled>Choose your option</option>
                <#list values as val>
                    <option <#if value?? && value?seq_contains(val.key)>selected</#if> value="${val.key}"
                            <#if val.panel?has_content>data-mw-blind="${val.key}"</#if> >${val.label}</option>
                </#list>
            </select>
            <#if (error)??>
                <span id="error-message-${name}" class="form-text text-danger">${error}</span>
            </#if>
            <#list values as val>
                ${val.panel}
            </#list>

        <#elseif cardinality == "SINGLE_SELECT">
            <label class="form-label ${textualClasses}" style="${textualStyles}" for="${id}">${content}</label>
            <select id="${id}" class="input-group ${sizeCls} form-control" name="${name}"
                    <#if disabled??>disabled</#if>>
                <option value="" disabled selected>Choose your option</option>
                <#list values as val>
                    <option <#if value?? && value == val.key>selected</#if> value="${val.key}"
                            <#if val.panel?has_content>data-mw-blind="${val.key}"</#if> >${val.label}</option>
                </#list>
            </select>
            <#if (error)??>
                <span id="error-message-${name}" class="form-text text-danger">${error}</span>
            </#if>
            <#list values as val>
                ${val.panel}
            </#list>

        </#if>
    </#if>
</div>