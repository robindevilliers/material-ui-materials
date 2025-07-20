<#if size == 'SMALL'>
    <#assign sizeCls = 'form-control-sm'>
<#elseif size == 'MEDIUM'>
    <#assign sizeCls = 'form-control-md'>
<#elseif size == 'LARGE'>
    <#assign sizeCls = 'form-control-lg'>
</#if>

<div class="enumeration-widget ${classes}" style="${itemStyles}">
    <#if style == "RADIO_CHECKBOX">
        <#if cardinality == "MULTIPLE_SELECT">
            <div id="${id}" class="form-group">
                <label for="${id}" class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>"
                        style="${textualStyles}">${content}</label>
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
                        <label class="form-check-label label ${sizeCls}" for="${id}-${val.key}">
                            ${val.label}
                        </label>
                    </div>
                    ${val.panel}
                </#list>
            </div>
            <#if (error)??>
                <span id="error-message-${name}" class="error-message">${error}</span>
            </#if>
        <#elseif cardinality == "SINGLE_SELECT">
            <div id="${id}" class="form-group">
                <label for="${id}" class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>"
                        style="${textualStyles}">${content}</label>
                <#list values as val>
                    <div class="form-radio">
                        <input id="${id}-${val.key}"
                                class="form-radio-input ${sizeCls}"
                                name="${name}"
                                value="${val.key}"
                                <#if disabled??>disabled</#if>
                                <#if value?? && value == val.key>checked</#if>
                                type="radio"
                                id="${id}-${val.key}"
                                <#if val.panel?has_content>data-mw-blind="${val.key}"</#if>
                        />
                        <label class="form-radio-label ${sizeCls}" for="${id}-${val.key}">
                            ${val.label}
                        </label>
                    </div>
                    ${val.panel}
                </#list>
            </div>
            <#if (error)??>
                <span id="error-message-${name}" class="error-message">${error}</span>
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
            <div id="${id}" class="form-group">
                <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}"
                        for="${id}">${content}</label>
                <select id="${id}" class="${sizeCls} form-control " multiple name="${name}"
                        <#if disabled??>disabled</#if> >
                    <option value="" disabled>${prompt}</option>
                    <#list values as val>
                        <option <#if value?? && value?seq_contains(val.key)>selected</#if> value="${val.key}"
                                <#if val.panel?has_content>data-mw-blind="${val.key}"</#if> >${val.label}</option>
                    </#list>
                </select>
            </div>
            <#if (error)??>
                <span id="error-message-${name}" class="error-message">${error}</span>
            </#if>
            <#list values as val>
                ${val.panel}
            </#list>
        <#elseif cardinality == "SINGLE_SELECT">
            <div id="${id}" class="form-group">
                <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}"
                        for="${id}">${content}</label>
                <select id="${id}" class="${sizeCls} form-control" name="${name}"
                        <#if disabled??>disabled</#if>>
                    <option value="" disabled selected>${prompt}</option>
                    <#list values as val>
                        <option <#if value?? && value == val.key>selected</#if> value="${val.key}"
                                <#if val.panel?has_content>data-mw-blind="${val.key}"</#if> >${val.label}</option>
                    </#list>
                </select>
            </div>
            <#if (error)??>
                <span id="error-message-${name}" class="error-message">${error}</span>
            </#if>
            <#list values as val>
                ${val.panel}
            </#list>
        </#if>
    </#if>
</div>