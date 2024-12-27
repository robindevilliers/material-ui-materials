<!DOCTYPE html>
<html lang="en">
<head>
    <title>Email Template</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            background-color: lavender;
        }

        a {
            color: #81b1cc;
            text-decoration: none;
            background-color: transparent;
        }

        .container {
            display: flex;
            flex-direction: column;
            flex: 0 0 40em;
            align-items: stretch;
        }

        .image-panel img {
            /*height: 56px;*/
            /*width: 56px;*/
            margin-right: 1em;
        }

        .title-text {
            font-family: Arial, sans-serif;
            font-size: 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: unset;
            color: #81b1cc !important;

        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
        }

        .content {
            display: flex;
            flex-direction: column;
            flex: 1 0 100%;
            align-self: stretch;
            min-height: 400px;
            background-color: white;
            padding: 1em;
        }

        .footer {
            display: flex;
            flex-direction: row;
            flex: 1 0 100%;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        .email-hr {
            border: 2px #81b1cc solid;
            width: 100%;
        }

        .hr {
            border: 2px #81b1cc solid;
            width: 100%;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        }

        .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
        }

        .hide-column {
            display: none !important;
        }

        @media (max-width: 375.98px) {
            .hide-xs-column {
                display: none !important;
            }
        }

        @media (max-width: 767.98px) {
            .hide-sm-column {
                display: none !important;
            }
        }

        @media (max-width: 991.98px) {
            .hide-md-column {
                display: none !important;
            }
        }

        @media (max-width: 1199.98px) {
            .hide-lg-column {
                display: none !important;
            }
        }

        .hide-xl-column {
            display: none !important;
        }

        .offset-1 {
            margin-left: 8.33333%;
        }

        .offset-2 {
            margin-left: 16.66667%;
        }

        .offset-3 {
            margin-left: 25%;
        }

        .offset-4 {
            margin-left: 33.33333%;
        }

        .offset-5 {
            margin-left: 41.66667%;
        }

        .offset-6 {
            margin-left: 50%;
        }

        .offset-7 {
            margin-left: 58.33333%;
        }

        .offset-8 {
            margin-left: 66.66667%;
        }

        .offset-9 {
            margin-left: 75%;
        }

        .offset-10 {
            margin-left: 83.33333%;
        }

        .offset-11 {
            margin-left: 91.66667%;
        }

        .col-1 {
            flex: 0 0 8.33333%;
            max-width: 8.33333%;
        }

        .col-2 {
            flex: 0 0 16.66667%;
            max-width: 16.66667%;
        }

        .col-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        .col-4 {
            flex: 0 0 33.33333%;
            max-width: 33.33333%;
        }

        .col-5 {
            flex: 0 0 41.66667%;
            max-width: 41.66667%;
        }

        .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .col-7 {
            flex: 0 0 58.33333%;
            max-width: 58.33333%;
        }

        .col-8 {
            flex: 0 0 66.66667%;
            max-width: 66.66667%;
        }

        .col-9 {
            flex: 0 0 75%;
            max-width: 75%;
        }

        .col-10 {
            flex: 0 0 83.33333%;
            max-width: 83.33333%;
        }

        .col-11 {
            flex: 0 0 91.66667%;
            max-width: 91.66667%;
        }

        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
        }


        .col-xs-1 {
            flex: 0 0 8.33333%;
            max-width: 8.33333%;
        }

        .col-xs-2 {
            flex: 0 0 16.66667%;
            max-width: 16.66667%;
        }

        .col-xs-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        .col-xs-4 {
            flex: 0 0 33.33333%;
            max-width: 33.33333%;
        }

        .col-xs-5 {
            flex: 0 0 41.66667%;
            max-width: 41.66667%;
        }

        .col-xs-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .col-xs-7 {
            flex: 0 0 58.33333%;
            max-width: 58.33333%;
        }

        .col-xs-8 {
            flex: 0 0 66.66667%;
            max-width: 66.66667%;
        }

        .col-xs-9 {
            flex: 0 0 75%;
            max-width: 75%;
        }

        .col-xs-10 {
            flex: 0 0 83.33333%;
            max-width: 83.33333%;
        }

        .col-xs-11 {
            flex: 0 0 91.66667%;
            max-width: 91.66667%;
        }

        .col-xs-12 {
            flex: 0 0 100%;
            max-width: 100%;
        }

        @media (max-width: 576px) {

            .offset-xs-1 {
                margin-left: 8.33333%;
            }

            .offset-xs-2 {
                margin-left: 16.66667%;
            }

            .offset-xs-3 {
                margin-left: 25%;
            }

            .offset-xs-4 {
                margin-left: 33.33333%;
            }

            .offset-xs-5 {
                margin-left: 41.66667%;
            }

            .offset-xs-6 {
                margin-left: 50%;
            }

            .offset-xs-7 {
                margin-left: 58.33333%;
            }

            .offset-xs-8 {
                margin-left: 66.66667%;
            }

            .offset-xs-9 {
                margin-left: 75%;
            }

            .offset-xs-10 {
                margin-left: 83.33333%;
            }

            .offset-xs-11 {
                margin-left: 91.66667%;
            }

            .col-sm-1 {
                flex: 0 0 8.33333%;
                max-width: 8.33333%;
            }

            .col-sm-2 {
                flex: 0 0 16.66667%;
                max-width: 16.66667%;
            }

            .col-sm-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }

            .col-sm-4 {
                flex: 0 0 33.33333%;
                max-width: 33.33333%;
            }

            .col-sm-5 {
                flex: 0 0 41.66667%;
                max-width: 41.66667%;
            }

            .col-sm-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .col-sm-7 {
                flex: 0 0 58.33333%;
                max-width: 58.33333%;
            }

            .col-sm-8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
            }

            .col-sm-9 {
                flex: 0 0 75%;
                max-width: 75%;
            }

            .col-sm-10 {
                flex: 0 0 83.33333%;
                max-width: 83.33333%;
            }

            .col-sm-11 {
                flex: 0 0 91.66667%;
                max-width: 91.66667%;
            }

            .col-sm-12 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        @media (min-width: 768px) {

            .offset-md-1 {
                margin-left: 8.33333%;
            }

            .offset-md-2 {
                margin-left: 16.66667%;
            }

            .offset-md-3 {
                margin-left: 25%;
            }

            .offset-md-4 {
                margin-left: 33.33333%;
            }

            .offset-md-5 {
                margin-left: 41.66667%;
            }

            .offset-md-6 {
                margin-left: 50%;
            }

            .offset-md-7 {
                margin-left: 58.33333%;
            }

            .offset-md-8 {
                margin-left: 66.66667%;
            }

            .offset-md-9 {
                margin-left: 75%;
            }

            .offset-md-10 {
                margin-left: 83.33333%;
            }

            .offset-md-11 {
                margin-left: 91.66667%;
            }

            .col-md-1 {
                flex: 0 0 8.33333%;
                max-width: 8.33333%;
            }

            .col-md-2 {
                flex: 0 0 16.66667%;
                max-width: 16.66667%;
            }

            .col-md-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }

            .col-md-4 {
                flex: 0 0 33.33333%;
                max-width: 33.33333%;
            }

            .col-md-5 {
                flex: 0 0 41.66667%;
                max-width: 41.66667%;
            }

            .col-md-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .col-md-7 {
                flex: 0 0 58.33333%;
                max-width: 58.33333%;
            }

            .col-md-8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
            }

            .col-md-9 {
                flex: 0 0 75%;
                max-width: 75%;
            }

            .col-md-10 {
                flex: 0 0 83.33333%;
                max-width: 83.33333%;
            }

            .col-md-11 {
                flex: 0 0 91.66667%;
                max-width: 91.66667%;
            }

            .col-md-12 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        @media (min-width: 992px) {

            .offset-lg-1 {
                margin-left: 8.33333%;
            }

            .offset-lg-2 {
                margin-left: 16.66667%;
            }

            .offset-lg-3 {
                margin-left: 25%;
            }

            .offset-lg-4 {
                margin-left: 33.33333%;
            }

            .offset-lg-5 {
                margin-left: 41.66667%;
            }

            .offset-lg-6 {
                margin-left: 50%;
            }

            .offset-lg-7 {
                margin-left: 58.33333%;
            }

            .offset-lg-8 {
                margin-left: 66.66667%;
            }

            .offset-lg-9 {
                margin-left: 75%;
            }

            .offset-lg-10 {
                margin-left: 83.33333%;
            }

            .offset-lg-11 {
                margin-left: 91.66667%;
            }

            .col-lg-1 {
                flex: 0 0 8.33333%;
                max-width: 8.33333%;
            }

            .col-lg-2 {
                flex: 0 0 16.66667%;
                max-width: 16.66667%;
            }

            .col-lg-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }

            .col-lg-4 {
                flex: 0 0 33.33333%;
                max-width: 33.33333%;
            }

            .col-lg-5 {
                flex: 0 0 41.66667%;
                max-width: 41.66667%;
            }

            .col-lg-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .col-lg-7 {
                flex: 0 0 58.33333%;
                max-width: 58.33333%;
            }

            .col-lg-8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
            }

            .col-lg-9 {
                flex: 0 0 75%;
                max-width: 75%;
            }

            .col-lg-10 {
                flex: 0 0 83.33333%;
                max-width: 83.33333%;
            }

            .col-lg-11 {
                flex: 0 0 91.66667%;
                max-width: 91.66667%;
            }

            .col-lg-12 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        @media (min-width: 1200px) {

            .offset-xl-1 {
                margin-left: 8.33333%;
            }

            .offset-xl-2 {
                margin-left: 16.66667%;
            }

            .offset-xl-3 {
                margin-left: 25%;
            }

            .offset-xl-4 {
                margin-left: 33.33333%;
            }

            .offset-xl-5 {
                margin-left: 41.66667%;
            }

            .offset-xl-6 {
                margin-left: 50%;
            }

            .offset-xl-7 {
                margin-left: 58.33333%;
            }

            .offset-xl-8 {
                margin-left: 66.66667%;
            }

            .offset-xl-9 {
                margin-left: 75%;
            }

            .offset-xl-10 {
                margin-left: 83.33333%;
            }

            .offset-xl-11 {
                margin-left: 91.66667%;
            }

            .col-xl-1 {
                flex: 0 0 8.33333%;
                max-width: 8.33333%;
            }

            .col-xl-2 {
                flex: 0 0 16.66667%;
                max-width: 16.66667%;
            }

            .col-xl-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }

            .col-xl-4 {
                flex: 0 0 33.33333%;
                max-width: 33.33333%;
            }

            .col-xl-5 {
                flex: 0 0 41.66667%;
                max-width: 41.66667%;
            }

            .col-xl-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }

            .col-xl-7 {
                flex: 0 0 58.33333%;
                max-width: 58.33333%;
            }

            .col-xl-8 {
                flex: 0 0 66.66667%;
                max-width: 66.66667%;
            }

            .col-xl-9 {
                flex: 0 0 75%;
                max-width: 75%;
            }

            .col-xl-10 {
                flex: 0 0 83.33333%;
                max-width: 83.33333%;
            }

            .col-xl-11 {
                flex: 0 0 91.66667%;
                max-width: 91.66667%;
            }

            .col-xl-12 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }


    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="image-panel">
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgaGVpZ2h0PSI1NiIgd2lkdGg9IjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0cm9rZT0iODFCMUNDIiBmaWxsPSJub25lIj4KCiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiByeD0iMTAiIHN0cm9rZT0iIzgxQjFDQyIgc3Ryb2tlLXdpZHRoPSIxMCIgLz4KCgogICAgPHBhdGggZD0iTSAyNSAxMDAgQyAyNSAyNSA0NSAyNSA0NSAxNTAgQyA0NSAyNSA2NSAyNSA2NSAxNTAgQyA2NSAyNSA4NSAyNSA4NSAxMjAgQyA4NSAxNTUgMTA1IDE1NSAxMDUgMTAwCkMgMTA1IDE3NSAxMjUgMTc1IDEyNSAxMDAgQyAxMjUgMTc1IDE0NSAxNzUgMTQ1IDEwMCBDIDE0NSAxMjUgMTY1IDEyNSAxNjUgMTAwICIKICAgICAgICAgIHN0cm9rZT0iIzgxQjFDQyIgc3Ryb2tlLXdpZHRoPSIxMCIvPgo8L3N2Zz4="/>
        </div>
        <div class="text-primary title-text">Example Materials</div>
    </div>

    <hr class="email-hr"/>

    <div class="content">
        ${body}
    </div>

    <hr class="email-hr"/>

    <div class="footer">
        <p><a href="http://example-materials.com">© 2023 Example Materials</a></p>
        <p>All rights reserved</p>
        <p><a href="http://example-materials.com/terms.html">Terms of Service</a></p>
        <p><a href="http://example-materials.com/privacy.html">Privacy Policy</a></p>
        <p>Powered by Malbec Limited</p>
    </div>
</div>
</body>
</html>
