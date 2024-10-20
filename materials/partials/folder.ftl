<div id="${id!}" class="folder-widget  ${classes}" style="${itemStyles}">
    <div class="folder-content">
        ${header}
        <#list values as val>
            <div class="folder-item">
                ${val}
            </div>
        </#list>
        <#if !values?has_content>
            <div id="no-content" class="no-content">No Content</div>
        </#if>
    </div>
</div>