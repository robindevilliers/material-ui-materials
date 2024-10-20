<form action="${action}" style="${itemStyles}" method="post" enctype="application/x-www-form-urlencoded"
        class="transfer-button-form">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="pageId" value="${pageId}">
    <input type="hidden" name="buttonId" value="${buttonId}">
    <input type="hidden" name="wipId" value="${wipId}">

    <button id="${id}"
            onclick="${testMode?string('alert(&quot;Transfer button clicked&quot;); event.preventDefault();','')}"
            style="${textualStyles}"
            class="transfer-button-widget btn ${classes}  ${textualClasses}">${content}</button>
</form>