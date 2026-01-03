<div class="confirmation-panel" style="${itemStyles}">
    <div class="row">
        <div class="col grey-text">
            Hello ${user.firstName} ${user.lastName}. If this is your name and the artefacts below are the
            artefacts you chose on initial registration, please enter the necessary characters from your security
            phrase.
        </div>
    </div>
    <div class="row">
        <div class="col s6">
            <div class="card">
                <div class="card-header header">
                    Your Artefacts
                </div>
                <div class="card-body">
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
            <form action="${action}" method="post" enctype="application/x-www-form-urlencoded" accept-charset="UTF-8">
                <div class="card">
                    <div class="card-header header">
                        2nd Stage Authentication
                    </div>
                    <div class="card-body">
                        <input type="hidden" name="_csrf" value="${_csrf}">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="firstCharacter"
                                                class="form-label label">Character ${firstPasswordPhraseIndex}</label>
                                        <input class="form-control" placeholder="?" id="firstCharacter" maxlength="1"
                                                type="password" name="firstCharacter" style="text-align: right; ">
                                        <#if errors.firstCharacter??>
                                            <span class="error-message">${errors.firstCharacter}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="secondCharacter"
                                                class="form-label label">Character ${secondPasswordPhraseIndex}</label>
                                        <input class="form-control" placeholder="?" id="secondCharacter" maxlength="1"
                                                type="password"
                                                name="secondCharacter" style="text-align: right; ">
                                        <#if errors.secondCharacter??>
                                            <span class="error-message">${errors.secondCharacter}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="thirdCharacter"
                                                class="form-label label">Character ${thirdPasswordPhraseIndex}</label>
                                        <input class="form-control" placeholder="?" id="thirdCharacter" maxlength="1"
                                                type="password" name="thirdCharacter" style="text-align: right; ">
                                        <#if errors.thirdCharacter??>
                                            <span class="error-message">${errors.thirdCharacter}</span>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">

                        <button class="btn btn-primary" type="submit"
                                name="register"
                                onclick="${testMode?string('alert(&quot;Authenticate button clicked&quot;); event.preventDefault();','')}">
                            Authenticate
                        </button>

                        <button class="btn btn-secondary" type="submit"
                                name="cancel"
                                onclick="${testMode?string('alert(&quot;Cancel button clicked&quot;); event.preventDefault();','')}">
                            Cancel
                        </button>
                        <#if errors.global??>
                            <span class="error-message">${errors.global}</span>
                        </#if>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
