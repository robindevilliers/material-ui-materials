<div class="alias-input-widget form-group ${classes}" style="${itemStyles}">
    <label class="form-label label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}"
            for="${id}">${content}</label>
    <div class="input-group">
        <input id="${id}" class="form-control validate" type="text"
                <#if maxlength??>maxlength="${maxlength}"</#if> <#if disabled??>disabled</#if> name="${name}"
                value="${value!}"
        />
    </div>
    <#if (error)??>
        <span id="error-message-${name}" class="error-message form-text text-danger">${error}</span>
    </#if>
</div>