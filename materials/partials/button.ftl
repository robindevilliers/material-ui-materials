<#if formRequired>
    <form action="${action}" style="${itemStyles}" method="post"
    enctype="application/x-www-form-urlencoded" class="operation-button">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="source" value="${source}">
    <input type="hidden" name="payload" value="${payload}">
</#if>
<button id="${id}" type="submit" name="${name}" class="button-widget btn ${classes} ${textualClasses}"
        style="<#if !formRequired>${itemStyles}</#if> ${textualStyles}"
        onclick="${testMode?string('alert(&quot;Buton clicked&quot;); event.preventDefault();','')}"
        <#if disabled??>disabled</#if>
>
    ${content}
</button>
<#if formRequired>
    </form>
</#if>