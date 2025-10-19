<form id="${id}" method="POST" action="${action}" accept-charset="UTF-8">
    <input type="hidden" name="_csrf" value="${_csrf}">
    <input type="hidden" name="_checkpoint" value="${_checkpoint}">
    <div class="form-widget ${classes}" style="${containerStyles}">${content}</div>
</form>
${cookieConsent!''}