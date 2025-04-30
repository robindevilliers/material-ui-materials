<form action="${action}" class="reset-password-request-panel" method="post" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="row">
        <div class="form-group col">
            <label for="resetPasswordEmail" class="active">Email Address</label>
            <input id="resetPasswordEmail" type="text" name="email" class="form-control" value="${(email)!}">
            <#if errors.email??>
                <span class="error-message form-text text-danger">${errors.email}</span>
            <#else>
                <span class="form-text text-muted">Please enter your email address.</span>
            </#if>
        </div>
    </div>
    <button class="btn btn-primary float-end mx-1" type="submit" name="resetPassword"
            onclick="${testMode?string('alert(&quot;Next clicked&quot;); event.preventDefault();','')}">Next
    </button>
    <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel"
            onclick="${testMode?string('alert(&quot;Cancel clicked&quot;); event.preventDefault();','')}">Cancel
    </button>
</form>

