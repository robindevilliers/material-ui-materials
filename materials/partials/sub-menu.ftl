<li class="nav-item dropdown ${classes}">
    ${label}
    <div class="dropdown-menu" aria-labelledby="${id}">
        ${content}
        <#if !hasContent>
            <div class="dropdown-item-no-content" >No  Content</div>
        </#if>
    </div>
</li>