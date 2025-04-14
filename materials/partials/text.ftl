<#if paragraphStyle == "PLAIN">
    <p class="text-widget plain-paragraph ${classes} ${textualClasses}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "SUPPRESSED">
    <p class="text-widget suppressed-paragraph ${classes} ${textualClasses}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "BLOCKQUOTE">
    <p class="text-widget blockquote-paragraph ${classes} ${textualClasses}" style="${itemStyles} ${textualStyles}">${content}</p>
</#if>