<div class="notification-banner ${classes}" style="${itemStyles}">
    <div class="notification-banner-title-bar">
        <#if flavour == "DEFAULT">
            <i class="bi-info-circle"></i>
        <#elseif flavour == "PRIMARY">
            <i class="bi-info-circle"></i>
        <#elseif flavour == "INFO">
            <i class="bi-info-circle"></i>
        <#elseif flavour == "WARNING">
            <i class="bi-exclamation-triangle"></i>
        <#elseif flavour == "DANGER">
            <i class="bi-exclamation-triangle"></i>
        <#elseif flavour == "SUCCESS">
            <i class="bi-exclamation-circle"></i>
        <#else>
            <i class="bi-bell"></i>
        </#if>
        &nbsp;
        <h5 id="title-widget">${title}</h5>
    </div>
    <div class="notification-banner-content" style=" ${containerStyles}">
        ${content}
    </div>
</div>
