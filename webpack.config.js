//webpack.config.js
const path = require('path');

module.exports = {
    mode : "development",
    // mode: "production",
    devtool : "inline-source-map",
    entry : {
        main : "./lib/index.ts",
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        filename : "materials-toolkit.js"
    },
    resolve : {
        extensions : [".ts"],
    },
    module : {
        rules : [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    target : 'node'
};
