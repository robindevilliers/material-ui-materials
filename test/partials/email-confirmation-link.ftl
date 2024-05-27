<a id="${id}" style="${itemStyles} ${textualStyles}"
        href="${testMode?string('javascript:alert(&quot;Link clicked&quot;); event.preventDefault();', href)}"
>${content}</a>
