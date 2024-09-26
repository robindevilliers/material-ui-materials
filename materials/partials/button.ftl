<button id="${id}" type="submit" name="${name}" class="button-widget btn ${classes} ${textualClasses}"
        style="${itemStyles} ${textualStyles}"
        onclick="${(testMode && !runningWizardTest)?string('alert(&quot;Button clicked&quot;); event.preventDefault();','')}"
        <#if disabled??>disabled</#if>
>${content}</button>
