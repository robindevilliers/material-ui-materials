<#if paragraphStyle == "PLAIN">
    <p class="paragraph plain-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "SUPPRESSED">
    <p class="paragraph suppressed-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
<#elseif paragraphStyle == "BLOCKQUOTE">
    <p class="paragraph blockquote-paragraph ${classes}" style="${itemStyles} ${textualStyles}">${content}</p>
</#if>