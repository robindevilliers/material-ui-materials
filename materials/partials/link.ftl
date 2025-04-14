<a class="link-widget <#if representation == 'text'>${classes}</#if>" style="${itemStyles}"
        href="${testMode?string('javascript:alert(&quot;Link clicked&quot;); event.preventDefault();',href)}"
        <#if target??>target="${target}"</#if>
        <#if rel??>rel="${rel}"</#if>
>${content}</a>
