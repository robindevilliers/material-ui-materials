<#if size == "LARGE">
    <h1 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h1>
<#elseif size == "LARGER">
    <h2 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h2>
<#elseif size == "MEDIUM">
    <h3 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h3>
<#elseif size == "SMALLER">
    <h4 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h4>
<#elseif size == "SMALL">
    <h5 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h5>
<#else>
    <h1 id="badge-widget"  class="badge-widget" style="${itemStyles}">
        <span class="badge ${classes} ${textualClasses}" style="${textualStyles}">${content}</span>
    </h1>
</#if>