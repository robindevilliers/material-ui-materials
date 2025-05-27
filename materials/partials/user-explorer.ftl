<div id="${id}" class="user-explorer-widget ${classes}" style="${itemStyles}">
    <div class="card-header header">

        <form class="form-inline" method="get" action="${action}">
            <div class="user-explorer-header-title">
                User Lookup
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">Group</div>
                </div>
                <label class="sr-only" for="group">Group</label>
                <select class="form-control" id="group" name="uGroup">
                    <option value=""> -</option>
                    <#list groups as val>
                        <option <#if group == val.name>selected</#if> value="${val.name}">${val.title}</option>
                    </#list>
                </select>

                <label class="sr-only" for="username">Username</label>
                <input autocomplete="off" type="text" class="form-control" name="uUsername" id="username"
                        value="${username}" placeholder="Username">

                <label class="sr-only" for="firstName">First Name</label>
                <input autocomplete="off" type="text" class="form-control" name="uFirstName" id="firstName"
                        value="${firstName}" placeholder="First Name">

                <label class="sr-only" for="lastName">Last Name</label>
                <input autocomplete="off" type="text" class="form-control" name="uLastName" id="lastName"
                        value="${lastName}" placeholder="Last Name">

                <div class="input-group-append">
                    <button type="submit" name="uSearch" class="btn btn-outline-primary">Search</button>
                </div>
            </div>
            <#list parameters as n, v>
                <input type="hidden" name="${n}" value="${v}"/>
            </#list>
        </form>
    </div>

    <div class="user-explorer-body">
        <#if !values?has_content>
            <div id="user-explorer-no-content" class="user-explorer-no-content no-content">No Results</div>
        <#else>
            <div class="user-explorer-item-list">
                <#list values as val>
                    <a class="user-explorer-item-select" href="#${val.id}"
                            role="button" aria-expanded="false" aria-controls="${val.id}">
                        <span class="user-explorer-workflow-description">${val.username}</span>
                    </a>
                </#list>
            </div>
            <div class="user-explorer-item-detail" id="${id}">
                <#list values as val>
                    <div id="user-explorer-item-${val.username}" class="user-explorer-item " data-display="flex"
                            data-parent="#${id}">
                        <div class="user-explorer-title">${val.username}</div>
                        <div class="user-explorer-content">
                            <div class="user-explorer-group">
                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Title</div>
                                    <div class="user-explorer-value">${val.title}</div>
                                </div>

                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Firstname</div>
                                    <div class="user-explorer-value">${val.firstName}</div>
                                </div>

                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Lastname</div>
                                    <div class="user-explorer-value">${val.lastName}</div>
                                </div>
                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Last Logged In</div>
                                    <div class="user-explorer-value">${val.lastLoggedIn}</div>
                                </div>
                            </div>
                            <div class="user-explorer-group">
                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Email</div>
                                    <div class="user-explorer-value">${val.email}</div>
                                </div>

                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Contact Number</div>
                                    <div class="user-explorer-value">${val.contactNumber}</div>
                                </div>

                                <div class="user-explorer-line">
                                    <div class="user-explorer-key">Date of Birth</div>
                                    <div class="user-explorer-value">${val.dateOfBirth}</div>
                                </div>

                                <div class="user-explorer-form">

                                    <#if lookupUserMode>
                                        <form class="form-inline" method="get" action="${action}">
                                            <input type="hidden" name="principal" value="${val.username}"/>
                                            <div class="btn-group" role="group">
                                                <button type="submit" aria-label="Select" class="btn btn-primary"
                                                        name="actReturn">
                                                    Select
                                                </button>
                                            </div>
                                            <#list parameters as n, v>
                                                <input type="hidden" name="${n}" value="${v}"/>
                                            </#list>
                                        </form>
                                    <#else >
                                        <form class="form-inline" method="post" action="${executeWorkflow}">
                                            <input type="hidden" name="_csrf" value="${_csrf}"/>
                                            <input type="hidden" name="_checkpoint" value="${_checkpoint}">
                                            <input type="hidden" name="username" value="${val.username}"/>
                                            <div class="btn-group" role="group">
                                                <button type="submit" aria-label="Select" class="btn btn-primary"
                                                        name="uSelect" id="select-button"
                                                        onclick="${testMode?string('alert(&quot;Select clicked&quot;); event.preventDefault();','')}">
                                                    Select
                                                </button>
                                            </div>
                                        </form>
                                    </#if>
                                </div>
                            </div>
                        </div>
                    </div>
                </#list>
            </div>
        </#if>
    </div>
    <div class="user-explorer-footer">
        <form class="form-inline" method="get" action="${action}">

            <#list parameters as n, v>
                <input type="hidden" name="${n}" value="${v}"/>
            </#list>

            <div class="btn-group" role="group">
                <#if !disablePrevious >
                    <button type="submit" aria-label="Previous" class="btn btn-outline-primary" name="actPrevious">
                        Previous
                    </button>
                </#if>
                <#if !disableNext >
                    <button type="submit" aria-label="Next" class="btn btn-outline-primary" name="actNext">
                        Next
                    </button>
                </#if>
            </div>
        </form>

        <#if lookupUserMode>
            <form class="form-inline" method="get" action="${action}">

                <#list parameters as n, v>
                    <input type="hidden" name="${n}" value="${v}"/>
                </#list>
                <div class="btn-group" role="group">
                    <button type="submit" aria-label="Cancel" class="btn btn-outline-primary"
                            name="actReturn">
                        Cancel
                    </button>
                </div>
            </form>
        <#else >
            <form class="form-inline" method="post" action="${cancelExecuteWorkflow}">
                <input type="hidden" name="_csrf" value="${_csrf}"/>
                <input type="hidden" name="_checkpoint" value="${_checkpoint}">
                <div class="btn-group" role="group">
                    <button type="submit" aria-label="Cancel" class="btn btn-outline-primary"
                            onclick="${testMode?string('alert(&quot;Select clicked&quot;); event.preventDefault();','')}"
                            name="actReturn">
                        Cancel
                    </button>
                </div>
            </form>
        </#if>
    </div>
</div>
