<div id="${id}" class="${classes}" style="${itemStyles}">
    <form action="${action}" class="wizard-intro-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-primary" type="submit" name="confirm"
                onclick="${testMode?string('alert(&quot;Confirm button clicked&quot;); event.preventDefault();','')}">
            Start
        </button>
    </form>
</div>