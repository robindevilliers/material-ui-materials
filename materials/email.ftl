<!DOCTYPE html>
<html lang="en">
<head>
    <title>Email Template</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
            margin: 4em 8em;
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0 0 2em 0;
            width: 100%;

            .brand-outer {
                border: 5px #81b1cc solid;
                background: #81b1cc;
                border-radius: 25px;
                padding: 5px;

                .brand-inner {
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5em 1em;
                    background-color: lavender;

                    .title-text {
                        font-family: Arial, sans-serif;
                        font-size: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: unset;
                        color: #81b1cc !important;

                    }

                    img {
                        height: 3.5em;
                        margin-right: 1em;
                    }
                }
            }
        }


        .content {
            display: flex;
            flex-direction: column;
            flex: 1 0 100%;
            align-self: stretch;
            min-height: 400px;
        }

        .footer {
            display: flex;
            flex-direction: row;
            flex: 1 0 100%;
            justify-content: space-between;
            align-items: center;
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
        <div class="brand-outer">
            <div class="brand-inner">
                <div class="image-panel">
                    <img src="/public/img/logo.svg" alt="title">
                </div>
                <div class="text-primary title-text">Maximillian Workflows</div>
            </div>
        </div>

        <div class="page-logout">

        </div>
    </div>

    <hr class="email-hr"/>

    <div class="content">
        ${body}
    </div>

    <hr class="email-hr"/>

    <div class="footer">
        <p>© 2023 Malbec Limited.</p>
        <p>All rights reserved.</p>
        <p><a href="http://maximillian-workflows.com/terms.html">Terms of Service</a></p>
        <p><a href="http://maximillian-workflows.com/privacy.html">Privacy Policy</a></p>
        <p>Powered by Malbec Limited</p>
    </div>

</div>
</body>
</html>
