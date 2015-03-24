var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: "./index.js",
    sourceMapFilename: "fluxxy.js.map",
    output: {
        path: __dirname + "/build",
        filename: "fluxxy.js",
        library: "Fluxxy",
        libraryTarget: "umd"
    },
    devtool: "source-map"
};