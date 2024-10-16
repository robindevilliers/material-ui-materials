<div id="${id}" class="pagination-widget">
    ${content}
    <#if noContent>
        <div class="pagination-no-content">No content.</div>
    </#if>

    <ul class="pagination">
        <li class="page-item <#if !previousPage?has_content >disabled</#if>">
            <form class="form-inline" method="get" action="${action}">
                <input type="hidden" name="bust" value="${bust}"/>
                <#if previousPage?has_content >
                    <input type="hidden" name="lIndex" value="${previousPage}">
                </#if>
                <button type="submit" aria-label="Previous" class="btn btn-link page-link"
                        <#if !previousPage?has_content >disabled</#if> name="lPage">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </button>
            </form>
        </li>

        <#list offeredPages as page>
            <li class="page-item <#if page == currentPage >active</#if>">
                <form class="form-inline" method="get" action="${action}">
                    <input type="hidden" name="bust" value="${bust}"/>
                    <input type="hidden" name="lIndex" value="${page}">
                    <button type="submit" aria-label="Page" class="page-link" name="lPage">
                        ${page + 1}
                    </button>
                </form>
            </li>
        </#list>

        <li class="page-item <#if !nextPage?has_content >disabled</#if>">
            <form class="form-inline" method="get" action="${action}">
                <input type="hidden" name="bust" value="${bust}"/>
                <#if nextPage?has_content >
                    <input type="hidden" name="lIndex" value="${nextPage}">
                </#if>
                <button type="submit" aria-label="Next" class="btn btn-link page-link"
                        <#if !nextPage?has_content >disabled</#if> name="lPage">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </button>
            </form>
        </li>
    </ul>

</div>