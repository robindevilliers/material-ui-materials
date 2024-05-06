<div style="${itemStyles}">
    <form action="/workflow/execute" class="confirm-workflow-panel" method="post">
        <input type="hidden" name="_csrf" value="${_csrf}">
        <button class="btn btn-primary float-end mx-1" type="submit" name="confirm" onclick="${confirmOnclick}">
            Confirm
        </button>
        <button class="btn btn-secondary float-end mx-1" type="submit" name="cancel" onclick="${cancelOnclick}">
            Cancel
        </button>
    </form>
</div>