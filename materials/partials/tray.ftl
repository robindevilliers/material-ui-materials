<div class="tray-widget card ${classes}" style="${itemStyles}">
    <div class="card-content">
        ${header}
        <div class="tray-body">
            <#list values as val>
                <div class="tray-form">
                    <form action="${val.action}" method="post"
                            enctype="application/x-www-form-urlencoded">
                        <input type="hidden" name="_csrf" value="${_csrf}">
                        <input type="hidden" name="payload" value="${val.payload}">
                        <input type="hidden" name="trayId" value="${trayId}">
                        <input type="hidden" name="pageDocumentId" value="${pageDocumentId}">
                        <button id="tray-item-${val.workflowId}-${val.wizardId}" class="tray-button" type="submit"
                                onclick="${testMode?string('alert(&quot;Tray item clicked&quot;); event.preventDefault();','')}">
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