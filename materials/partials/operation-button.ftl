<form action="${action}" style="${itemStyles}" method="post"
        enctype="application/x-www-form-urlencoded" class="operation-button">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="buttonId" value="${buttonId}">
    <input type="hidden" name="pageDocumentId" value="${pageDocumentId}">
    <input type="hidden" name="payload" value="${payload}">
    <button id="${id}"
            onclick="${testMode?string('alert(&quot;Operation button clicked&quot;); event.preventDefault();','')}"
            style="${textualStyles}" class=" btn ${classes}  ${textualClasses}"
            <#if disabled??>disabled</#if>>${content}</button>
</form>