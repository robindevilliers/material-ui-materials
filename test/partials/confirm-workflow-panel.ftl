<div id="${id}" class="${classes}" style="${itemStyles}">
    <form action="${action}" class="confirm-workflow-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-primary float-end mx-1" type="submit" name="confirm"
                onclick="${testMode?string('alert(&quot;Confirm button clicked&quot;); event.preventDefault();','')}">
            Confirm
        </button>
        <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel"
                onclick="${testMode?string('alert(&quot;Cancel button clicked&quot;); event.preventDefault();','')}">
            Cancel
        </button>
    </form>
</div>