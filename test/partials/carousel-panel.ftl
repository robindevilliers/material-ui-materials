<div class="carousel-item ${active?string('active','')} ${classes}" <#if interval??>data-bs-interval="${interval}"</#if>>
    <img class="d-block w-100" src="${src}" alt="${src}"/>
    <div class="carousel-caption" style="${containerStyles}">
        ${content}
    </div>
</div>