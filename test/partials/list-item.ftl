<#if listStyle == "BULLET">
    <li id="list-item-widget" class="list-bullet-item">
        <div class="${classes}" style="${containerStyles}">
            ${content}
        </div>
    </li>
<#elseif listStyle == "NUMBERED">
    <li id="list-item-widget" class="list-numbered-item">
        <div class="${classes}"  style="${containerStyles}">
            ${content}
        </div>
    </li>
<#elseif listStyle == "BORDERED">
    <li id="list-item-widget" class="list-group-item ${classes}" style="${containerStyles}">
        ${content}
    </li>
</#if>