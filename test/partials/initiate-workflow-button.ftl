<form action="${action}" style="${itemStyles}" method="post" enctype="application/x-www-form-urlencoded"
      class="initiate-workflow-button-form">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="showCasePrincipalPicker" value="${showCasePrincipalPicker}">
    <button id="${id}" onclick="${testMode?string('alert(&quot;Initiate workflow button clicked&quot;); event.preventDefault();','')}"
            style="${textualStyles}" class="initiate-workflow-button-widget btn ${classes}" <#if disabled??>disabled</#if>>${content}</button>
</form>