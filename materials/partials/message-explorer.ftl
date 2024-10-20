<div id="${id}" class="message-explorer-widget ${classes}" style="${itemStyles}">
    <div class="card-header">
        <form class="form-inline" method="get" action="${action}">
            <input type="hidden" name="bust" value="${bust}"/>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">Queue</div>
                </div>
                <label class="sr-only" for="queue">Queue</label>
                <select class="form-control" id="queue" name="mQueue">
                    <#list queues as val>
                        <option <#if queue == val.name>selected</#if> value="${val.name}">${val.title}</option>
                    </#list>
                </select>

                <label class="sr-only" for="wizard">Wizard</label>
                <div class="input-group-prepend">
                    <div class="input-group-text">Wizard</div>
                </div>
                <select class="form-control" id="wizard" name="mWizard">
                    <option value=""></option>
                    <#list wizards as val>
                        <option <#if wizard == val.id>selected</#if> value="${val.id}">${val.title}</option>
                    </#list>
                </select>

                <label class="sr-only" for="workflow">Workflow</label>
                <div class="input-group-prepend">
                    <div class="input-group-text">Workflow</div>
                </div>
                <select class="form-control" id="workflow" name="mWorkflow">
                    <option value=""></option>
                    <#list workflows as val>
                        <option <#if workflow == val.id>selected</#if> value="${val.id}">${val.title}</option>
                    </#list>
                </select>

                <label class="sr-only" for="principal">Principal</label>
                <input autocomplete="off" type="text" class="form-control" name="mPrincipal" id="principal"
                        value="${principal}" placeholder="Principal">

                <div class="input-group-append">
                    <button type="submit" name="mSearch" class="btn btn-outline-primary">Search</button>
                </div>
            </div>


        </form>
    </div>

    <div class="message-explorer-body">
        <#if !values?has_content>
            <div id="message-explorer-no-content" class="message-explorer-no-content">No Content</div>
        <#else>
            <div class="message-explorer-item-list">
                <#list values as val>
                    <a class="message-explorer-item-select" href="#${val.id}"
                            role="button" aria-expanded="false" aria-controls="${val.id}">
                        <span class="message-explorer-workflow-description">${val.dateTime}</span>
                        <span class="message-explorer-wizard-title">${val.wizardTitle}</span>
                        <span class="message-explorer-principal">${val.principal}</span>
                    </a>
                </#list>
            </div>
            <div class="message-explorer-item-detail" id="${id}">
                <#list values as val>
                    <div id="${val.id}" class="message-explorer-item" data-display="flex"
                            data-parent="#${id}">

                        <div class="message-explorer-line">
                            <span class="message-explorer-wizard-title">${val.wizardTitle} (${val.wizardId})</span>
                            <span>${val.dateTime}</span>
                        </div>

                        <div class="message-explorer-line">
                            <div class="message-explorer-description">
                                ${val.wizardDescription}
                            </div>
                        </div>

                        <span class="message-explorer-line">
                            <span>Case Principal</span>
                            <span>${val.principal}</span>
                        </span>

                        <span class="message-explorer-line">
                            <span>Principal Name</span>
                            <span>${val.principalTitle} ${val.principalFirstName} ${val.principalLastName}</span>
                        </span>

                        <span class="message-explorer-line">
                            <span>Date of Birth</span>
                            <span>${val.principalDateOfBirth}</span>
                        </span>

                        <span class="message-explorer-line">
                                <span>Case Id </span>
                                <span>${val.kaseId}</span>
                            </span>

                        <span class="message-explorer-line">
                                <span>Workflow </span>
                                <span></span>
                            </span>

                        <div>${val.workflowTitle} (${val.workflowId})</div>

                        <div class="message-explorer-line">
                            <div class="message-explorer-description">
                                ${val.workflowDescription}
                            </div>
                        </div>

                        <form class="message-explorer-form"
                                action="${val.action}"
                                method="post" enctype="application/x-www-form-urlencoded">
                            <input type="hidden" name="_csrf" value="${_csrf}">
                            <input type="hidden" name="payload" value="${val.payload}">
                            <span class="message-explorer-button-line">
                                    <button class="btn btn-primary" id="continue-${val.workflowId}-${val.wizardId}"
                                            onclick="${testMode?string('alert(&quot;Open clicked&quot;); event.preventDefault();','')}"
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
    <div class="message-explorer-footer">
        <form class="form-inline" method="get" action="${action}">
            <input type="hidden" name="mQueue" value="${queue}"/>
            <input type="hidden" name="mWorkflow" value="${workflow}"/>
            <input type="hidden" name="mWizard" value="${wizard}"/>
            <input type="hidden" name="mPrincipal" value="${principal}"/>
            <input type="hidden" name="bust" value="${bust}"/>
            <input type="hidden" name="mStartIndex" value="${(startIndex)!}"/>
            <input type="hidden" name="mEndIndex" value="${(endIndex)!}"/>
            <div class="btn-group" role="group">
                <button type="submit" aria-label="Previous" class="btn btn-outline-primary"
                        <#if !startIndex?has_content >disabled</#if> name="mPrevious">
                    Previous
                </button>
                <button type="submit" aria-label="Next" class="btn btn-outline-primary"
                        <#if !endIndex?has_content >disabled</#if> name="mNext">
                    Next
                </button>
            </div>
        </form>

        <form class="form-inline" method="get" action="${action}">
            <input type="hidden" name="mQueue" value="${queue}"/>
            <input type="hidden" name="mWorkflow" value="${workflow}"/>
            <input type="hidden" name="mWizard" value="${wizard}"/>
            <input type="hidden" name="mPrincipal" value="${principal}"/>
            <input type="hidden" name="bust" value="${bust}"/>
            <input type="hidden" name="mStartIndex" value="${(startIndex)!}"/>
            <input type="hidden" name="mEndIndex" value="${(endIndex)!}"/>
            <div class="btn-group" role="group">
                <button type="submit" aria-label="Lookup username" class="btn btn-outline-primary"
                        name="mLookupUser">
                    Lookup principal
                </button>
            </div>
        </form>
    </div>
</div>
