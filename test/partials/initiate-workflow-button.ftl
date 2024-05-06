<form action="/workflow/initiate/${workflow}" style="${itemStyles}" method="post" enctype="application/x-www-form-urlencoded"
      class="initiate-workflow-button-form">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="showCasePrincipalPicker" value="${showCasePrincipalPicker}">
    <button id="${id}" onclick="${onclick}" style="${textualStyles}" class="btn ${classes}" <#if disabled??>disabled</#if>>${content}</button>
</form>