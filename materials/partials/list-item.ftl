<#if listStyle == "BULLET">
    <li class="list-item-widget list-bullet-item">
        <div class="${classes}" style="${containerStyles}">
            ${content}
        </div>
    </li>
<#elseif listStyle == "NUMBERED">
    <li class="list-item-widget list-numbered-item">
        <div class="${classes}"  style="${containerStyles}">
            ${content}
        </div>
    </li>
<#elseif listStyle == "BORDERED">
    <li class="list-item-widget list-group-item ${classes}" style="${containerStyles}">
        ${content}
    </li>
</#if>