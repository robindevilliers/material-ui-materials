<form action="/reset-password" class="reset-password-panel" method="post" enctype="application/x-www-form-urlencoded" style="${itemStyles}">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="row">
        <div class="form-group col">
            <label for="resetPasswordPasswordOnce" class="active">Password</label>
            <input id="resetPasswordPasswordOnce" type="password" class="form-control" name="passwordOnce"
                    value="${passwordOnce!}">
            <#if errors?? && errors.hasFieldErrors('passwordOnce')>
                <span class="form-text text-danger">${errors.getFieldError("passwordOnce").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter a password.</span>
            </#if>
        </div>
    </div>
    <div class="row">
        <div class="form-group col">
            <label for="resetPasswordPasswordTwice" class="active">Password (Again)</label>
            <input id="resetPasswordPasswordTwice" type="password" class="form-control" name="passwordTwice"
                    value="${passwordTwice!}">
            <#if errors?? && errors.hasFieldErrors('passwordTwice')>
                <span class="form-text text-danger">${errors.getFieldError("passwordTwice").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your password again.</span>
            </#if>
        </div>
    </div>
    <button class="btn btn-primary float-end mx-1" type="submit" name="resetPassword"
            onclick="${nextOnclick}">Next
    </button>
    <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel" onclick="${cancelOnclick}">Cancel
    </button>
</form>
