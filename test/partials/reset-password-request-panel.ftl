<form action="/reset-password-request" class="reset-password-request-panel" method="post"
        enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="row">
        <div class="form-group col">
            <label for="resetPasswordEmail" class="active">Email Address</label>
            <input id="resetPasswordEmail" type="text" name="email" class="form-control" value="${(email)!}">
            <#if errors?? && errors.hasFieldErrors('email')>
                <span class="form-text text-danger">${errors.getFieldError("email").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your email address.</span>
            </#if>
        </div>
    </div>
    <button class="btn btn-primary float-end mx-1" type="submit" name="resetPassword"
            onclick="${nextOnclick}">Next
    </button>
    <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel" onclick="${cancelOnclick}">Cancel
    </button>
</form>

