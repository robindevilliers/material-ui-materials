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
