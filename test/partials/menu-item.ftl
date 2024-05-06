<#if isInSubMenu>
    <#if type == 'workflow'>
        <form action="/workflow/initiate/${workflow}" method="post" enctype="application/x-www-form-urlencoded" class="menu-item-widget menu-item-form">
            <input type="hidden" name="_csrf" value="${_csrf}">
            <button id="${id}" style="${textualStyles}" onclick="${onclick}" class="dropdown-item ${classes}" <#if disabled??>disabled</#if>>${content}</button>
        </form>
    </#if>
    <#if type == 'page'>
        <a id="${id}" style="${textualStyles}" onclick="${onclick}" class="dropdown-item ${classes}" href="${link}">${content}</a>
    </#if>
<#else>
    <li class="menu-item-widget nav-item">
        <#if type == 'workflow'>
            <form action="/workflow/initiate/${workflow}" method="post" enctype="application/x-www-form-urlencoded"
                    class="menu-item-form">
                <input type="hidden" name="_csrf" value="${_csrf}">
                <button id="${id}" style="${textualStyles}" onclick="${onclick}" class="btn nav-link ${classes}" <#if disabled??>disabled</#if>>${content}</button>
            </form>
        </#if>
        <#if type == 'page'>
            <a id="${id}" style="${textualStyles}" onclick="${onclick}" class="nav-link ${classes}" href="${link}">${content}</a>
        </#if>
    </li>
</#if>


