<div class="font-picker row">
    <div class="font-picker-select col col-12 col-lg-6">
        <label class="font-picker-label label form-label ${textualClasses} <#if hideLabel>sr-only</#if>"
                style="${textualStyles}" for="${id}">${content}</label>
        <input id="font-picker-value" type="hidden" name="${name}"/>

        <div id="title-primary" class="font-line">
            <div class="title">Title Primary</div>
            <div class="input-group dropright">
                <button class="form-control btn btn-outline-secondary dropdown-toggle font-package" type="button"
                        data-toggle="dropdown" aria-expanded="false" name="fontPackage">
                </button>
                <div class="font-select-menu dropdown-menu">
                </div>

                <label class="form-label sr-only" for="font-size">Font Size</label>
                <input id="font-size" class="form-control border border-secondary font-size" type="number" value="1"
                        min="0.5" max="4" step="0.25"/>

                <button class="form-control btn btn-outline-secondary text-decoration" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-underline" viewBox="0 0 16 16">
                        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-style" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-weight" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="title-secondary" class="font-line">
            <div class="title">Title Secondary</div>
            <div class="input-group dropright">
                <button class="form-control btn btn-outline-secondary dropdown-toggle font-package" type="button"
                        data-toggle="dropdown" aria-expanded="false" name="fontPackage">
                </button>
                <div class="font-select-menu dropdown-menu">
                </div>

                <label class="form-label sr-only" for="font-size">Font Size</label>
                <input id="font-size" class="form-control border border-secondary font-size" type="number" value="1"
                        min="0.5" max="4" step="0.25"/>

                <button class="form-control btn btn-outline-secondary text-decoration" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-underline" viewBox="0 0 16 16">
                        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-style" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-weight" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="text" class="font-line">
            <div class="title">Text</div>
            <div class="input-group dropright">
                <button class="form-control btn btn-outline-secondary dropdown-toggle font-package" type="button"
                        data-toggle="dropdown" aria-expanded="false" name="fontPackage">
                </button>
                <div class="font-select-menu dropdown-menu">
                </div>

                <label class="form-label sr-only" for="font-size">Font Size</label>
                <input id="font-size" class="form-control border border-secondary font-size" type="number" value="1"
                        min="0.5" max="4" step="0.25"/>

                <button class="form-control btn btn-outline-secondary text-decoration" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-underline" viewBox="0 0 16 16">
                        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-style" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-weight" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
            </div>
        </div>


        <div id="exhibit" class="font-line">
            <div class="title">Exhibit</div>
            <div class="input-group dropright">
                <button class="form-control btn btn-outline-secondary dropdown-toggle font-package" type="button"
                        data-toggle="dropdown" aria-expanded="false" name="fontPackage">
                </button>
                <div class="font-select-menu dropdown-menu">
                </div>

                <label class="form-label sr-only" for="font-size">Font Size</label>
                <input id="font-size" class="form-control border border-secondary font-size" type="number" value="1"
                        min="0.5" max="4" step="0.25"/>

                <button class="form-control btn btn-outline-secondary text-decoration" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-underline" viewBox="0 0 16 16">
                        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-style" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-weight" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
            </div>
        </div>


        <div id="label" class="font-line">
            <div class="title">Label</div>
            <div class="input-group dropright">
                <button class="form-control btn btn-outline-secondary dropdown-toggle font-package" type="button"
                        data-toggle="dropdown" aria-expanded="false" name="fontPackage">
                </button>
                <div class="font-select-menu dropdown-menu">
                </div>

                <label class="form-label sr-only" for="font-size">Font Size</label>
                <input id="font-size" class="form-control border border-secondary font-size" type="number" value="1"
                        min="0.5" max="4" step="0.25"/>

                <button class="form-control btn btn-outline-secondary text-decoration" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-underline" viewBox="0 0 16 16">
                        <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-style" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>

                <button class="form-control btn btn-outline-secondary font-weight" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
            </div>
        </div>

        <#if (error)??>
            <span id="error-message-${name}" class="error-message">${error}</span>
        </#if>
    </div>
    <div class="font-picker-exhibit col col-12 col-lg-6">
        <h1 class="exhibit-title-primary">
            Example Typography
        </h1>

        <h2 class="exhibit-title-secondary">
            What is Lorem Ipsum?
        </h2>

        <div class="exhibit-text text-widget">
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
            will give you a complete account of the system, and expound the actual teachings of the great explorer of
            the truth, the master-builder of human happiness.
        </div>

        <h2 class="exhibit-title-secondary">
            Here is a sample.
        </h2>

        <div class="exhibit-exhibit exhibit-block text-widget blockquote-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
        </div>

        <div class="exhibit-label input-widget form-group " style="">

            <label class="form-label label  " style="" for="pkKGlhFWnP">Text Value</label>
            <div class="input-group">
                <input id="pkKGlhFWnP" class="form-control form-control-md validate" type="text" name="text"
                        value="text">
            </div>
            <span id="error-message-text" class="error-message">Input error message</span>
        </div>
    </div>
</div>