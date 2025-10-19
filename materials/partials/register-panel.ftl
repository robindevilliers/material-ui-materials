<form action="${action}" method="post" enctype="application/x-www-form-urlencoded" accept-charset="UTF-8" class="register-panel-widget">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="row">
        <div class="form-group col">
            <#if errors.global??>
                <span class="error-message">${errors.global}</span>
            </#if>
        </div>
    </div>
    <div class="row">
        <div class="form-group col">
            <div class="form-group">
                <label for="registerPanelUsername" class="form-label label">Username</label>
                <input class="form-control" id="registerPanelUsername" type="text" name="username" placeholder=" "
                        value="${(username)!}">
            </div>
            <#if errors.username??>
                <span class="error-message">${errors.username}</span>
            <#else>
                <span class="form-text text-muted">Please enter a username that is 7 characters or longer and that contains only alphanumeric characters.</span>
            </#if>
        </div>

        <div class="form-group col">
            <div class="form-group">
                <label for="title" class="form-label label">Title</label>
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
            </div>
            <#if errors.title??>
                <span class="error-message">${errors.title}</span>
            <#else>
                <span class="form-text text-muted">Please select your title.</span>
            </#if>
        </div>
    </div>


    <div class="row">
        <div class="form-group col">
            <div class="form-group">
                <label for="firstName" class="form-label label">First Name</label>
                <input id="firstName" type="text" name="firstName" class="form-control" value="${(firstName)!}"
                        placeholder=" ">
            </div>
            <#if errors.firstName??>
                <span class="error-message">${errors.firstName}</span>
            <#else>
                <span class="form-text text-muted">Please enter your first name.</span>
            </#if>
        </div>

        <div class="form-group col">
            <div class="form-group">
                <label for="lastName" class="form-label label">Last Name</label>
                <input id="lastName" type="text" name="lastName" class="form-control" value="${(lastName)!}"
                        placeholder=" ">
            </div>
            <#if errors.lastName??>
                <span class="error-message">${errors.lastName}</span>
            <#else>
                <span class="form-text text-muted">Please enter your last name.</span>
            </#if>
        </div>
    </div>

    <div class="row">
        <div class="form-group col">
            <div class="form-group">
                <label for="registerPanelEmail" class="form-label label">Email Address</label>
                <input id="registerPanelEmail" type="text" name="email" class="form-control" value="${(email)!}"
                        placeholder=" ">
            </div>
            <#if errors.email??>
                <span class="error-message">${errors.email}</span>
            <#else>
                <span class="form-text text-muted">Please enter your email address.</span>
            </#if>
        </div>

        <div class="form-group col">
            <div class="form-group">
                <label for="contactNumber" class="form-label label">Contact Number</label>
                <input id="contactNumber" type="text" class="form-control" name="contactNumber"
                        value="${(contactNumber)!}" placeholder=" ">
            </div>
            <#if errors.contactNumber??>
                <span class="error-message">${errors.contactNumber}</span>
            <#else>
                <span class="form-text text-muted">Please enter your preferred contact number.</span>
            </#if>
        </div>
    </div>

    <div class="row">
        <div class="form-group col">
            <div class="form-group">
                <label for="registerPanelPasswordOnce" class="form-label label">Password</label>
                <input id="registerPanelPasswordOnce" type="password" class="form-control" name="passwordOnce"
                        value="${passwordOnce!}" placeholder=" ">
            </div>
            <#if errors.passwordOnce??>
                <span class="error-message">${errors.passwordOnce}</span>
            <#else>
                <span class="form-text text-muted">Please enter a password.</span>
            </#if>
        </div>
        <div class="form-group col">
            <div class="form-group">
                <label for="registerPanelPasswordTwice" class="form-label label">Password (Again)</label>
                <input id="registerPanelPasswordTwice" type="password" class="form-control" name="passwordTwice"
                        value="${passwordTwice!}" placeholder=" ">
            </div>
            <#if errors.passwordTwice??>
                <span class="error-message">${errors.passwordTwice}</span>
            <#else>
                <span class="form-text text-muted">Please enter your password again.</span>
            </#if>
        </div>
    </div>
    <div class="row">
        <div class=" col">
            <div class="form-group">
                <label for="dateOfBirth" class="form-label label">Date of Birth</label>
                <input type="text" id="dateOfBirth" name="dateOfBirth" class="form-control" value="${(dateOfBirth)!}"
                        placeholder="YYYY-MM-DD">
            </div>
            <#if errors.dateOfBirth??>
                <span class="error-message">${errors.dateOfBirth}</span>
            <#else>
                <span class="form-text text-muted">Please enter your date of birth.</span>
            </#if>
        </div>
        <div class=" col">
            <div class="form-group">
                <label for="timezone" class="form-label label">Timezone (${timezone})</label>
                <select id="timezone" name="timezone" class="form-control">
                    <option value=""></option>
                    <#list timezones as tz>
                        <option value="${tz.id}" <#if timezone?? && timezone == '${tz.id}'>selected</#if>>${tz.offset} -
                            [${tz.id}] ${tz.displayName}</option>
                    </#list>
                </select>
            </div>
            <#if errors.timezone??>
                <span class="error-message">${errors.timezone}</span>
            <#else>
                <span class="form-text text-muted">Please select your timezone.</span>
            </#if>
        </div>

    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="acceptPrivacyPolicy" placeholder=" "
                            name="acceptPrivacyPolicy" <#if isAcceptPrivacyPolicy>checked</#if>>
                    <label class="form-check-label label" for="acceptPrivacyPolicy"> Accept Privacy Policy </label>
                    <a class="ml-3" href="/fixed/privacy"
                            onclick="${testMode?string('alert(&quot;View privacy policy clicked&quot;); event.preventDefault();','')}">View</a>
                </div>
            </div>
            <#if errors.acceptPrivacyPolicy??>
                <div class="error-message">${errors.acceptPrivacyPolicy}</div>
            </#if>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button class="btn btn-primary float-end mx-1" type="submit" name="register"
                    onclick="${testMode?string('alert(&quot;Register clicked&quot;); event.preventDefault();','')}">
                Register
            </button>
            <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel"
                    onclick="${testMode?string('alert(&quot;Cancel clicked&quot;); event.preventDefault();','')}">Cancel
            </button>
        </div>
    </div>


</form>
