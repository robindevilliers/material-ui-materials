<nav class="menu-widget navbar ${expand} navbar-light bg-light ${classes}" style=" ${itemStyles}">
    ${menuBrand}
    <#if axis == "VERTICAL">
        <ul class="navbar-nav">
            ${content}
        </ul>
    <#else>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse  " id="navbarNavDropdown">
            <ul class="navbar-nav">
                ${content}
            </ul>
        </div>
    </#if>
</nav>