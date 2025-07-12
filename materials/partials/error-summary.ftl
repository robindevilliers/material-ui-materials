<div class="card error-summary-widget" style="${itemStyles}">
    <div class="card-header header">
        Errors
    </div>
    <div class="card-body">
        <p class="label">There are validation errors.</p>
        <ul>
            <#list errors as key, value>
                <li id="error-summary-message-${key}" class="error-message form-text">${value}</li>
            </#list>
        </ul>
    </div>
</div>
