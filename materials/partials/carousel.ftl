<div id="${id!}" class="carousel-widget carousel slide ${classes}" style="${itemStyles}" <#if autoSlide>data-ride="carousel"</#if>>
    <#if indicators>
        <ol class="carousel-indicators">
            <#list 0..(numberOfIndicators - 1) as x>
                <li data-target="#${id!}" data-slide-to="${x}" <#if x == activeIndex>class="active" aria-current="true"</#if>></li>
            </#list>
        </ol>
    </#if>
    <div class="carousel-inner">
        ${content}
    </div>
    <#if controls>
        <a class="carousel-control-prev" href="#${id!}" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#${id!}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </#if>
</div>
