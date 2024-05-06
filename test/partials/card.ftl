<#if isLink>
    <a href="${link}" class="link-card" <#if target??>target="${target}"</#if> <#if rel??>rel="${rel}"</#if> style="${itemStyles}">
</#if>
<div id="${id!}" class="card ${classes}"  <#if !isLink >style="${itemStyles}"</#if>>
    ${headerContent!}
    ${imageContent!}
    ${bodyContent!}
    ${footerContent!}
</div>
<#if isLink>
    </a>
</#if>