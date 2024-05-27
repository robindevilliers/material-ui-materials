<#if size == "LARGE">
    <h1 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h1>
<#elseif size == "LARGER">
    <h2 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h2>
<#elseif size == "MEDIUM">
    <h3 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h3>
<#elseif size == "SMALLER">
    <h4 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h4>
<#elseif size == "SMALL">
    <h5 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h5>
<#else>
    <h1 id="${id}" class="title-widget ${classes}" style="${textualStyles} ${itemStyles}">${content}</h1>
</#if>