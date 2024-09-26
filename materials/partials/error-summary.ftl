<div class="error-summary-widget card text-white bg-danger mb-3" style="${itemStyles}">
    <div class="card-header fw-bold">
        Errors
    </div>
    <div class="card-body">
        <p>There is a problem submitting the current page.  Please address the issues below.</p>
        <ul>
            <#list errors as key, value>
                <li id="error-summary-message-${key}" class="form-text text-white">${value}</li>
            </#list>
        </ul>
    </div>
</div>
