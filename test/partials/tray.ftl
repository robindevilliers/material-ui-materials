<div class="tray-widget card ${classes}" style="${itemStyles}">
    <div class="card-content">
        ${trayHeader}
        <div class="tray-body">
            <#list values as val>
                <div class="tray-form">
                    <form action="/workflow/continue-case/${val.wipId}" method="post"
                            enctype="application/x-www-form-urlencoded">
                        <input type="hidden" name="_csrf" value="${_csrf}">
                        <button id="continue-${val.workflowId}-${val.wizardId}" onclick="${onclick}"
                                class="tray-button"
                                type="submit">
                        <span class="tray-line">
                            <span class="tray-wizard-title">${val.wizardTitle}</span>
                            <span class="tray-date">${val.date}</span>
                        </span>
                            <span class="tray-line">
                            <span class="tray-description">${val.wizardDescription}</span>
                        </span>
                        </button>
                    </form>
                </div>
            </#list>
            <#if !values?has_content>
                <div id="tray-no-content" class="tray-no-content">No Content</div>
            </#if>
        </div>
    </div>
</div>