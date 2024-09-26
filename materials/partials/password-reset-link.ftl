<a id="${id}" class="${classes} ${textualClasses}" style="${itemStyles} ${textualStyles}"
        href="${testMode?string('javascript:alert(&quot;Link clicked&quot;); event.preventDefault();',href)}"
>${content}</a>
