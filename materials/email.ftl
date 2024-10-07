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


        .header {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            width: 100%;

            img {
                height: 3.5em;
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
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgaGVpZ2h0PSIyMDAiIHdpZHRoPSIyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSI4MUIxQ0MiIGZpbGw9Im5vbmUiPg0KDQogICAgPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgcng9IjEwIiBzdHJva2U9IiM4MUIxQ0MiIHN0cm9rZS13aWR0aD0iMTAiIC8+DQoNCg0KICAgIDxwYXRoIGQ9Ik0gMjUgMTAwIEMgMjUgMjUgNDUgMjUgNDUgMTUwIEMgNDUgMjUgNjUgMjUgNjUgMTUwIEMgNjUgMjUgODUgMjUgODUgMTIwIEMgODUgMTU1IDEwNSAxNTUgMTA1IDEwMA0KQyAxMDUgMTc1IDEyNSAxNzUgMTI1IDEwMCBDIDEyNSAxNzUgMTQ1IDE3NSAxNDUgMTAwIEMgMTQ1IDEyNSAxNjUgMTI1IDE2NSAxMDAgIg0KICAgICAgICAgIHN0cm9rZT0iIzgxQjFDQyIgc3Ryb2tlLXdpZHRoPSIxMCIvPg0KPC9zdmc+DQo="/>
        </div>
        <div class="text-primary title-text">Maximillian Workflows</div>
    </div>

    <hr class="email-hr"/>

    <div class="content">
        ${body}
    </div>

    <hr class="email-hr"/>

    <div class="footer">
        <p><a href="http://maximillian-workflows.com">© 2023 Malbec Limited</a></p>
        <p>All rights reserved</p>
        <p><a href="http://maximillian-workflows.com/terms.html">Terms of Service</a></p>
        <p><a href="http://maximillian-workflows.com/privacy.html">Privacy Policy</a></p>
        <p>Powered by Malbec Limited</p>
    </div>
</div>
</body>
</html>
