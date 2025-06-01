<div id="${id}" class="kase-explorer-widget ${classes}" style="${itemStyles}">
    <div class="card-header header">

        <form class="form-inline kase-explorer-query" method="get" action="${action}">
            <div class="header-row">
                <div class="kase-explorer-header-title">
                    Case Lookup
                </div>
            </div>
            <div class="header-row">
                <div class="spacer"></div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Workflow</div>
                    </div>
                    <label class="sr-only" for="workflow">Workflow</label>
                    <select class="form-control" id="workflow" name="kWorkflow">
                        <option value=""></option>
                        <#list workflows as val>
                            <option <#if workflow == val.id>selected</#if> value="${val.id}">${val.title}</option>
                        </#list>
                    </select>

                    <label class="sr-only" for="principal">Case Principal</label>
                    <input autocomplete="off" type="text" class="form-control" name="kPrincipal" id="principal"
                            value="${principal}" placeholder="Case Principal">

                    <label class="sr-only" for="startDate">Start Date</label>
                    <div class="input-group-prepend">
                        <div class="input-group-text">Start Date</div>
                    </div>
                    <input autocomplete="off" type="date" class="form-control" name="kStartDate" id="startDate"
                            value="${startDate}" placeholder="Start Date">

                    <label class="sr-only" for="endDate">End Date</label>
                    <div class="input-group-prepend">
                        <div class="input-group-text">End Date</div>
                    </div>
                    <input autocomplete="off" type="date" class="form-control" name="kEndDate" id="endDate"
                            value="${endDate}" placeholder="End Date">

                    <div class="input-group-append">
                        <button type="submit" name="actSearch" class="btn btn-outline-primary"
                                onclick="${testMode?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <#list parameters as n, v>
                <input type="hidden" name="${n}" value="${v}"/>
            </#list>
        </form>
    </div>

    <div class="kase-explorer-body">
        <#if !values?has_content>
            <div id="kase-explorer-no-content" class="kase-explorer-no-content no-content">No Results</div>
        <#else>
            <div class="kase-explorer-item-list">
                <#list values as val>
                    <a class="kase-explorer-item-select" href="#${val.id}"
                            role="button" aria-expanded="false" aria-controls="${val.id}">
                        <span class="kase-explorer-workflow-description">${val.dateTime}</span>
                        <span class="kase-explorer-principal">${val.principal}</span>
                    </a>
                </#list>
            </div>
            <div class="kase-explorer-item-detail" id="${id}">
                <#list values as val>
                    <div id="${val.id}" class="kase-explorer-item" data-display="flex"
                            data-parent="#${id}">

                        <div class="kase-explorer-line">
                            <span class="kase-explorer-item-title title">${val.id}</span>
                            <span>${val.dateTime}</span>
                        </div>

                        <span class="kase-explorer-line">
                            <span class="kase-explorer-title">Case Principal</span>
                            <span>${val.principal}</span>
                        </span>

                        <span class="kase-explorer-line">
                                <span class="kase-explorer-title">Case Id </span>
                                <span>${val.kaseId}</span>
                            </span>

                        <span class="kase-explorer-line">
                                <span class="kase-explorer-title">Workflow </span>
                                <span></span>
                            </span>

                        <div class="kase-explorer-title">${val.workflowTitle} (${val.workflowId})</div>

                        <div class="kase-explorer-line">
                            <div class="kase-explorer-description">
                                ${val.workflowDescription}
                            </div>
                        </div>

                        <form class="kase-explorer-form" action="${val.action}" method="post"
                                enctype="application/x-www-form-urlencoded">
                            <input type="hidden" name="_csrf" value="${_csrf}">
                            <input type="hidden" name="_checkpoint" value="${_checkpoint}">
                            <input type="hidden" name="payload" value="${val.payload}">
                            <input type="hidden" name="source" value="${source}">
                            <span class="kase-explorer-button-line">
                                    <button class="btn btn-primary"
                                            id="kase-explorer-item-${val.workflowId}"
                                            onclick="${testMode?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}"
                                            type="submit">
                                        Open
                                    </button>
                                </span>
                        </form>
                    </div>
                </#list>
            </div>
        </#if>
    </div>
    <div class="kase-explorer-footer">
        <form class="form-inline" method="get" action="${action}">
            <#list parameters as n, v>
                <input type="hidden" name="${n}" value="${v}"/>
            </#list>
            <div class="btn-group" role="group">
                <#if !disablePrevious >
                    <button type="submit" aria-label="Previous" class="btn btn-outline-primary" name="actPrevious"
                            onclick="${testMode?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}"
                    >
                        Previous
                    </button>
                </#if>
                <#if !disableNext >
                    <button type="submit" aria-label="Next" class="btn btn-outline-primary" name="actNext"
                            onclick="${testMode?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}"
                    >
                        Next
                    </button>
                </#if>
            </div>
        </form>

        <form class="form-inline" method="get" action="${action}">
            <#list parameters as n, v>
                <input type="hidden" name="${n}" value="${v}"/>
            </#list>
            <div class="btn-group" role="group">
                <button type="submit" aria-label="Lookup username" class="btn btn-outline-primary"
                        name="actkLookupUser"
                        onclick="${testMode?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}">
                    Lookup principal
                </button>
            </div>
        </form>
    </div>
</div>
