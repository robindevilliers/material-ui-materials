<div class="font-picker row">
    <div class="font-picker-select col col-sm-12 col-xl-6">
        <label class="font-picker-label label form-label ${textualClasses} <#if hideLabel>sr-only</#if>" style="${textualStyles}"
                for="${id}">${content}</label>
        <input id="font-picker-value" type="hidden" name="${name}"/>

        <div id="title-primary" class="font-line">
            <div class="title">Title Primary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">
                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="title-secondary" class="font-line">
            <div class="title">Title Secondary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">
                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="text-primary" class="font-line">
            <div class="title">Text Primary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">
                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="text-secondary" class="font-line">
            <div class="title">Text Secondary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">
                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="exhibit" class="font-line">
            <div class="title">Exhibit</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">
                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="primary" class="font-line">
            <div class="title">Primary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">

                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>

        <div id="secondary" class="font-line">
            <div class="title">Secondary</div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle font-select" type="button"
                        data-toggle="dropdown" aria-expanded="false">

                </button>
                <div class="dropdown-menu">
                </div>
            </div>
        </div>
        <#if (error)??>
            <span id="error-message-${name}" class="error-message form-text text-danger">${error}</span>
        </#if>
    </div>
    <div class="font-picker-exhibit col  col-sm-12 col-xl-6">
        <h1 class="exhibit-title-primary">
            Example Typography
        </h1>

        <h2 class="exhibit-title-secondary">
            What is Lorem Ipsum?
        </h2>
        <div class="exhibit-text-primary text-widget">
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
            will give you a complete account of the system, and expound the actual teachings of the great explorer of
            the truth, the master-builder of human happiness.
        </div>

        <div class="exhibit-text-secondary text-widget">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words...
        </div>

        <h2 class="exhibit-title-secondary">
            Here is a sample.
        </h2>

        <div class="exhibit-exhibit exhibit-block text-widget blockquote-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </div>
    </div>
</div>