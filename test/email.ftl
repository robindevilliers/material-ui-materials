<!DOCTYPE html>
<html lang="en">
<head>
    <title>Email Template</title>
    <style>
        body {
            font-family: "Comic Sans MS", "Comic Sans", cursive;
        }

        .container {
            display: flex;
            flex-direction: column;
            flex: 0 0 40em;
            align-items: center;
            margin: 4em 8em;
        }

        .header {
            display: flex;
            flex-direction: column;
        }

        .content {
            display: flex;
            flex-direction: column;
            flex: 1 0 100%;
            align-self: stretch;
            background: #f1f1f1;
            padding: 2em;
        }

        .footer {
            display: flex;
            flex-direction: column;
            flex: 0 0 100%;
            align-items: center;
        }

        .title-text {
            align-self: flex-end;
            font-size: 1.5em;
            opacity: 0.5;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="/src/img/logo.svg" alt="logo"/>
        <div class="title-text">Maximillian Workflows</div>
    </div>

    <div class="content">
        ${body}
    </div>

    <footer class="footer">
        <p>Maximillian Workflows</p>
    </footer>

</div>
</body>
</html>
