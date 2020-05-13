const path = require("path");
const Minimify = require("babel-minify-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.purs$/,
                use: [
                    {
                        loader: "purs-loader",
                        options: {
                            spago: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".purs"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    node: {
        fs: "empty",
        net: "empty",
    },
    plugins: [new Minimify()],
    externals: [nodeExternals()],
};
