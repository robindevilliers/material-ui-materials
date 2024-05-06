<div class="confirmation-panel" style="${itemStyles} ${textualStyles}">
    <div class="row">
        <div class="col grey-text">
            Hello ${user.firstName} ${user.lastName}. If this is your name and the artefacts below are the
            artefacts you chose on initial registration, please enter the necessary characters from your security
            phrase.
        </div>
    </div>
    <div class="row">
        <div class="col s6">
            <div class="card artefacts-panel card-content">
                <div class="card-content">
                    <div class="card-title">Your Artefacts</div>
                    <div class="row">
                        <div class="col s12">
                            <div class="card-image center-align">
                                <img alt="security image" id="securityImage"
                                        src="${securityImage}"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="security-phrase grey-text">${securityPhrase}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s6">
            <div class="card second-stage-entry-panel card-content">
                <div class="card-content">
                    <span class="card-title">2nd Stage Authentication</span>
                    <form action="/authenticate-second-stage" method="post" enctype="application/x-www-form-urlencoded">
                        <input type="hidden" name="_csrf" value="${_csrf}">
                        <div class="card-body">
                            <div class="row">
                                <div class="col s12">
                                    Character <span>${firstPasswordPhraseIndex}</span>:
                                    <div class="input-field inline">
                                        <input placeholder="?" id="firstCharacter" maxlength="1" type="password"
                                                name="firstCharacter" style="text-align: right; ">
                                        <#if errors?? && errors.hasFieldErrors('firstCharacter')>
                                            <span class="helper-text red-text text-darken-2 error-text"
                                                    data-error="wrong"
                                                    data-success="right">${errors.getFieldError("firstCharacter").getDefaultMessage()}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    Character <span>${secondPasswordPhraseIndex}</span>:
                                    <div class="input-field inline">
                                        <input placeholder="?" id="secondCharacter" maxlength="1" type="password"
                                                name="secondCharacter" style="text-align: right; ">
                                        <#if errors?? && errors.hasFieldErrors('secondCharacter')>
                                            <span class="helper-text red-text text-darken-2 error-text"
                                                    data-error="wrong"
                                                    data-success="right">${errors.getFieldError("secondCharacter").getDefaultMessage()}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">Character <span>${thirdPasswordPhraseIndex}</span>:
                                    <div class="input-field inline">
                                        <input placeholder="?" id="thirdCharacter" maxlength="1"
                                                type="password"
                                                name="thirdCharacter" style="text-align: right; ">
                                        <#if errors?? && errors.hasFieldErrors('thirdCharacter')>
                                            <span class="helper-text red-text text-darken-2 error-text"
                                                    data-error="wrong"
                                                    data-success="right">${errors.getFieldError("thirdCharacter").getDefaultMessage()}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-action button-section">
                            <button class="btn cyan waves-effect waves-light" type="submit"
                                    onclick="${submitOnclick}"
                                    name="authenticate">
                                Authenticate<i class="material-icons right">send</i>
                            </button>
                            <button class="waves-effect waves-light btn amber lighten-1" type="submit" name="cancel"
                                    onclick="${cancelOnclick}">
                                Cancel
                            </button>
                        </div>
                        <#if errors?? && errors.hasGlobalErrors()>
                            <span class="helper-text red-text text-darken-2 error-text">${errors.getGlobalError().getDefaultMessage()}</span>
                        </#if>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
