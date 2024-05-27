<#if paragraphStyle == "PLAIN">
    <p class="paragraph-widget plain-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "SUPPRESSED">
    <p class="paragraph-widget suppressed-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "BLOCKQUOTE">
    <p class="paragraph-widget blockquote-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
</#if>