<#if mandateAgreement>
    <div class="cookie-consent-backdrop"></div>
</#if>
<form action="${action}" method="post" enctype="application/x-www-form-urlencoded" style="${itemStyles}">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <div class="cookie-consent">
        <div class="exposition">
            This site uses cookies to enhance user experience. See our
            <a class="" href="/fixed/privacy"
                    onclick="${testMode?string('alert(&quot;Privacy policy button clicked&quot;); event.preventDefault();','')}">Privacy
                Policy</a>.
        </div>
        <div class="button-panel">
            <button id="allow-cookies-button" class="btn btn-success" type="submit" name="allowCookies"
                    onclick="${testMode?string('alert(&quot;Allow cookies button clicked&quot;); event.preventDefault();','')}">
                Allow cookies
            </button>
        </div>
    </div>
</form>