<div class="mile-stone ${classes}">
    <#if labelSide == 'PRECEDE'>
        <div class="label">${label!"&nbsp;"}</div>
    </#if>
    <div class="circle <#if active>active</#if>">${tag}</div>
    <#if labelSide == 'FOLLOW'>
        <div class="label">${label!"&nbsp;"}</div>
    </#if>
</div>