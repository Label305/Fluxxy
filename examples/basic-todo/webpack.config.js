var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: "./app/app.jsx",
    output: {
        path: __dirname + "/app",
        filename: "build.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {test: /\.jsx$/, loader: "jsx-loader"},
            {test: /\.json$/, loader: "json"}
        ]
    }
};