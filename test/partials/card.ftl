<#if action??>
    <form name="${id}" action="${action}" method="post" enctype="application/x-www-form-urlencoded" class="link-card">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="showCasePrincipalPicker" value="${showCasePrincipalPicker?string('true','false')}">
</#if>
<#if href??>
    <a class="link-card" <#if target??>target="${target}"</#if> <#if rel??>rel="${rel}"</#if> style="${itemStyles}"
            href="${testMode?string('javascript:alert(&quot;Card clicked&quot;); event.preventDefault();',href)}"
    >
</#if>
<div id="${id!}" class="card-widget card ${classes}" <#if !href?? >style="${itemStyles}"</#if>
        <#if action??>onClick="${testMode?string('alert(&quot;Card clicked&quot;); event.preventDefault();','document.forms[&quot;${id}&quot;].submit();')}"</#if>
>
    ${headerContent!}
    ${imageContent!}
    ${bodyContent!}
    ${footerContent!}
</div>
<#if href??>
    </a>
</#if>
<#if action??>
    </form>
</#if>