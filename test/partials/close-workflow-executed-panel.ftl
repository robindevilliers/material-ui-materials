<div class="${classes}" style="${itemStyles}">
    <form action="${action}" class="close-workflow-executed-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-outline-white float-end mx-1" type="submit" name="close"
                onclick="${testMode?string('alert(&quot;Close button clicked&quot;); event.preventDefault();','')}" >
            Close
        </button>
    </form>
</div>