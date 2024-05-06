<form id="register-panel-widget" action="/register" method="post" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="row">
        <div class="form-group col">
            <label for="registerPanelUsername" class="form-label">Username</label>
            <input class="form-control" id="registerPanelUsername" type="text" name="username" value="${(username)!}">
            <#if errors?? && errors.hasFieldErrors('username')>
                <span class="form-text text-danger">${errors.getFieldError("username").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter a username that is 7 characters or longer and that contains only alphanumeric characters.</span>
            </#if>
        </div>

        <div class="form-group col">
            <label for="title">Title</label>
            <select id="title" name="title" class="form-control">
                <#if (title)?has_content>
                    <option value=""></option><#else>
                    <option value="" selected></option></#if>
                <#if (title)! == 'Mr'>
                    <option value="Mr" selected>Mr</option><#else>
                    <option value="Mr">Mr</option></#if>
                <#if (title)! == 'Ms'>
                    <option value="Ms" selected>Ms</option><#else>
                    <option value="Ms">Ms</option></#if>
            </select>
            <#if errors?? && errors.hasFieldErrors('title')>
                <span class="form-text text-danger">${errors.getFieldError("title").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please select your title.</span>
            </#if>
        </div>
    </div>


    <div class="row">
        <div class="form-group col">
            <label for="firstName" class="active">First Name</label>
            <input id="firstName" type="text" name="firstName" class="form-control" value="${(firstName)!}">
            <#if errors?? && errors.hasFieldErrors('firstName')>
                <span class="form-text text-danger">${errors.getFieldError("firstName").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your first name.</span>
            </#if>
        </div>

        <div class="form-group col">
            <label for="lastName" class="active">Last Name</label>
            <input id="lastName" type="text" name="lastName" class="form-control" value="${(lastName)!}">
            <#if errors?? && errors.hasFieldErrors('lastName')>
                <span class="form-text text-danger">${errors.getFieldError("lastName").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your last name.</span>
            </#if>
        </div>
    </div>

    <div class="row">
        <div class="form-group col">
            <label for="registerPanelEmail" class="active">Email Address</label>
            <input id="registerPanelEmail" type="text" name="email" class="form-control" value="${(email)!}">
            <#if errors?? && errors.hasFieldErrors('email')>
                <span class="form-text text-danger">${errors.getFieldError("email").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your email address.</span>
            </#if>
        </div>

        <div class="form-group col">
            <label for="contactNumber" class="active">Contact Number</label>
            <input id="contactNumber" type="text" class="form-control" name="contactNumber"
                    value="${(contactNumber)!}">

            <#if errors?? && errors.hasFieldErrors('contactNumber')>
                <span class="form-text text-danger">${errors.getFieldError("contactNumber").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your preferred contact number.</span>
            </#if>
        </div>
    </div>

    <div class="row">
        <div class="form-group col">
            <label for="registerPanelPasswordOnce" class="active">Password</label>
            <input id="registerPanelPasswordOnce" type="password" class="form-control" name="passwordOnce"
                    value="${passwordOnce!}">
            <#if errors?? && errors.hasFieldErrors('passwordOnce')>
                <span class="form-text text-danger">${errors.getFieldError("passwordOnce").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter a password.</span>
            </#if>
        </div>
        <div class="form-group col">
            <label for="registerPanelPasswordTwice" class="active">Password (Again)</label>
            <input id="registerPanelPasswordTwice" type="password" class="form-control" name="passwordTwice"
                    value="${passwordTwice!}">
            <#if errors?? && errors.hasFieldErrors('passwordTwice')>
                <span class="form-text text-danger">${errors.getFieldError("passwordTwice").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your password again.</span>
            </#if>
        </div>
    </div>
    <div class="row">
        <div class="form-group col">
            <label for="dateOfBirth" class="active">Date of Birth</label>
            <input type="text" id="dateOfBirth" name="dateOfBirth" class="form-control" value="${(dateOfBirth)!}">
            <#if errors?? && errors.hasFieldErrors('dateOfBirth')>
                <span class="form-text text-danger">${errors.getFieldError("dateOfBirth").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please enter your date of birth.</span>
            </#if>
        </div>
        <div class="form-group col">
            <label for="timezone">Timezone (${timezone})</label>
            <select id="timezone" name="timezone" class="form-control">
                <option value=""></option>
                <#list timezones as tz>
                    <option value="${tz.id}" <#if timezone?? && timezone == '${tz.id}'>selected</#if>>${tz.offset} - [${tz.id}] ${tz.displayName}</option>
                </#list>
            </select>
            <#if errors?? && errors.hasFieldErrors('timezone')>
                <span class="form-text text-danger">${errors.getFieldError("timezone").getDefaultMessage()}</span>
            <#else>
                <span class="form-text text-muted">Please select your timezone.</span>
            </#if>
        </div>

    </div>
    <div class="row">
        <div class="form-group col">
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
    <button class="btn btn-primary float-end mx-1" type="submit" name="register" onclick="${nextOnclick}">Next
    </button>
    <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel" onclick="${cancelOnclick}">Cancel
    </button>

</form>
