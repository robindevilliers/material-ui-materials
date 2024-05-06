<#if listStyle == "BULLET">
    <ul id="list-widget" class="list-bullet ${classes}" style="${itemStyles}">
        ${content}
    </ul>
<#elseif listStyle == "NUMBERED">
    <ol id="list-widget" class="list-numbered ${classes}" style="${itemStyles}">
        ${content}
    </ol>
<#elseif listStyle == "BORDERED">
    <ul id="list-widget" class="list-group ${classes}" style="${itemStyles}">
        ${content}
    </ul>
</#if>