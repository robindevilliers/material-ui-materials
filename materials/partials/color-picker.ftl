<div class="color-picker">
    <label class="form-label ${textualClasses}" style="${textualStyles}" for="${id}">${content}</label>
    <input id="color-picker-value" type="hidden" name="colors"/>
    <div class="content">
        <div class="color-picker-disc">
            <div class="inner">
            </div>
            <div id="first-coordinates" class="coordinates">
                <div class="cursor">
                </div>
            </div>
            <div id="second-coordinates" class="coordinates">
                <div class="small-cursor">
                </div>
            </div>
            <div id="third-coordinates" class="coordinates">
                <div class="small-cursor">
                </div>
            </div>
            <div id="fourth-coordinates" class="coordinates">
                <div class="small-cursor">
                </div>
            </div>
            <div id="fifth-coordinates" class="coordinates">
                <div class="small-cursor">
                </div>
            </div>
        </div>
        <div class="luminosity">
            <div class="luminosity-coordinates">
                <div class="luminosity-cursor">
                </div>
            </div>
        </div>
        <div class="output">
            <div class="color">
            </div>
            <div class="color">
            </div>
            <div class="color">
            </div>
            <div class="color">
            </div>
            <div class="color">
            </div>
        </div>
    </div>
    <#if (error)??>
        <span id="error-message-${name}" class="form-text text-danger">${error}</span>
    </#if>
</div>