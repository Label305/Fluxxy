var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: "./index.js",
    sourceMapFilename: "flex_flux.js.map",
    output: {
        path: __dirname + "/build",
        filename: "flex_flux.js",
        library: "FlexFlux",
        libraryTarget: "umd"
    },
    devtool: "source-map"
};