<#if listStyle == "BULLET">
    <ul id="${id}" class="list-widget list-bullet ${classes}" style="${itemStyles}">
        ${content}
    </ul>
<#elseif listStyle == "NUMBERED">
    <ol id="${id}" class="list-widget list-numbered ${classes}" style="${itemStyles}">
        ${content}
    </ol>
<#elseif listStyle == "BORDERED">
    <ul id="${id}" class="list-widget list-group ${classes}" style="${itemStyles}">
        ${content}
    </ul>
</#if>