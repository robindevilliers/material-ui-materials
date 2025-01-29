<form action="${action}" style="${itemStyles}" method="post"
        enctype="application/x-www-form-urlencoded" class="continue-operation-button">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="type" value="${type}">
    <button id="${id}" name="${name}"
            onclick="${testMode?string('alert(&quot;Continue operation button clicked&quot;); event.preventDefault();','')}"
            style="${textualStyles}" class=" btn ${classes}  ${textualClasses}"
            <#if disabled??>disabled</#if>>${content}</button>
</form>