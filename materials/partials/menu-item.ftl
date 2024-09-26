<#if isInSubMenu>
    <#if type == 'workflow'>
        <form action="${action}" method="post" enctype="application/x-www-form-urlencoded"
                class="menu-item-widget menu-item-form">
            <input type="hidden" name="_csrf" value="${_csrf}">
            <button id="${id}" style="${textualStyles}" class="dropdown-item ${classes} ${textualClasses}" <#if disabled??>disabled</#if>
                    onclick="${testMode?string('alert(&quot;Menu Item clicked&quot;); event.preventDefault();','')}">${content}</button>
        </form>
    </#if>
    <#if type == 'page'>
        <a id="${id}" style="${textualStyles}" class="dropdown-item ${classes} ${textualClasses}" href="${href}"
                onclick="${testMode?string('alert(&quot;Menu Item clicked&quot;); event.preventDefault();','')}">${content}</a>
    </#if>
<#else>
    <li class="menu-item-widget nav-item">
        <#if type == 'workflow'>
            <form action="${action}" method="post" enctype="application/x-www-form-urlencoded"
                    class="menu-item-form">
                <input type="hidden" name="_csrf" value="${_csrf}">
                <input type="hidden" name="showCasePrincipalPicker" value="${showCasePrincipalPicker?string('true','false')}">
                <button id="${id}" style="${textualStyles}" class="btn nav-link ${classes} ${textualClasses}"
                        <#if disabled??>disabled</#if>
                        onclick="${testMode?string('alert(&quot;Menu Item clicked&quot;); event.preventDefault();','')}">${content}</button>
            </form>
        </#if>
        <#if type == 'page'>
            <a id="${id}" style="${textualStyles}" class="nav-link ${classes} ${textualClasses}" href="${href}"
                    onclick="${testMode?string('alert(&quot;Menu Item clicked&quot;); event.preventDefault();','')}">${content}</a>
        </#if>
    </li>
</#if>