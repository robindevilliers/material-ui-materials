<div class="error-summary-widget card text-white bg-danger mb-3" style="${itemStyles}">
    <div class="card-header header">
        Errors
    </div>
    <div class="card-body">
        <p class="label">There is a problem submitting the current page.  Please address the issues below.</p>
        <ul>
            <#list errors as key, value>
                <li id="error-summary-message-${key}" class="error-message form-text">${value}</li>
            </#list>
        </ul>
    </div>
</div>
