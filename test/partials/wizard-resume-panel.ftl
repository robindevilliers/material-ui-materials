<div id="${id}" class="${classes}" style="${itemStyles}">
    <form action="${action}" class="wizard-resume-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-primary" type="submit" name="confirm"
                onclick="${testMode?string('alert(&quot;Confirm button clicked&quot;); event.preventDefault();','')}">
            Resume
        </button>
        <#if allowAbandonWizard>
            <button class="btn btn-danger" type="submit" name="abandon"
                    onclick="${testMode?string('alert(&quot;Confirm button clicked&quot;); event.preventDefault();','')}">
                Abandon
            </button>
        </#if>
    </form>
</div>