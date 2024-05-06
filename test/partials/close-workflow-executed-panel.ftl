<div style="${itemStyles}">
    <form action="/workflow/close-executed" class="close-workflow-executed-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-outline-white float-end mx-1" type="submit" name="close" onclick="${closeOnclick}">
            Close
        </button>
    </form>
</div>