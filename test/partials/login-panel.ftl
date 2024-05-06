<form id="login-panel-widget" action="/authenticate" class="login-panel" method="post" enctype="application/x-www-form-urlencoded" style="${itemStyles}">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="card">
        <div class="card-header">
            Customer Login
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col mb-3">
                    <label for="loginPanelUsername" class="form-label">Username</label>
                    <div class="input-group">
                        <input type="text" name="username" class="form-control" id="loginPanelUsername">
                    </div>
                    <#if errors?? && errors.hasFieldErrors('username')>
                        <div class="form-text text-danger">${errors.getFieldError("username").getDefaultMessage()}</div>
                    </#if>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                        <input type="password" name="password" class="form-control" id="password">
                    </div>
                    <#if errors?? && errors.hasFieldErrors('password')>
                        <div class="form-text text-danger">${errors.getFieldError("password").getDefaultMessage()}</div>
                    </#if>
                </div>
            </div>
            <#if enablePrivacyPolicyAgreementOnLogin>
                <div class="row">
                    <div class="col mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="acceptPrivacyPolicy"
                                   name="acceptPrivacyPolicy">
                            <label class="form-check-label" for="acceptPrivacyPolicy"> Accept Privacy Policy </label>
                            <a class="ml-3" href="/fixed/privacy">View</a>
                        </div>
                        <#if errors?? && errors.hasFieldErrors('acceptPrivacyPolicy')>
                            <div class="form-text text-danger">${errors.getFieldError("acceptPrivacyPolicy").getDefaultMessage()}</div>
                        </#if>
                    </div>
                </div>
            </#if>
            <div class="row">
                <div class="col s12">
                    <#if errors?? && errors.hasGlobalErrors()>
                        <span id="login-error"
                              class="form-text text-danger">${errors.getGlobalError().getDefaultMessage()}</span>
                    </#if>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            <div class="button-panel">
                <button id="login-button" class="btn btn-primary" type="submit" name="login"
                        onclick="${loginOnclick}">
                    Login
                </button>
                <#if enableRegistration>
                    <button id="register-button" class="btn btn-success" type="submit"
                            name="register"
                            onclick="${registerOnclick}">
                        Register
                    </button>
                </#if>
            </div>
            <div class="button-panel">
                <button id="forgot-password-button" class="btn btn-link" type="submit" name="forgotPassword"
                        onclick="${forgotPasswordOnclick}">
                    Forgot Password
                </button>
            </div>
        </div>
    </div>
</form>
