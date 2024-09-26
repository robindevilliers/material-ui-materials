<a class="link-widget ${classes} ${textualClasses}" style="${itemStyles} ${textualStyles}"
        href="${testMode?string('javascript:alert(&quot;Link clicked&quot;); event.preventDefault();',href)}"
        <#if target??>target="${target}"</#if>
        <#if rel??>rel="${rel}"</#if>
>${content}</a>
