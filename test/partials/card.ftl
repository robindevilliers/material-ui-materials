<#if href??>
    <a class="link-card" <#if target??>target="${target}"</#if> <#if rel??>rel="${rel}"</#if> style="${itemStyles}"
    href="${testMode?string('javascript:alert(&quot;Card clicked&quot;); event.preventDefault();',href)}"
    >
</#if>
<div id="${id!}" class="card ${classes}" <#if !href?? >style="${itemStyles}"</#if>>
    ${headerContent!}
    ${imageContent!}
    ${bodyContent!}
    ${footerContent!}
</div>
<#if href??>
    </a>
</#if>