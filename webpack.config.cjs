const path = require('path');

module.exports = {
    mode : "production",
    devtool : "source-map",
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
