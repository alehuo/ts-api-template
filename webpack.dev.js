const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    mode: "development",
    devtool: "inline-source-map",
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
                            src: ["bower_components/purescript-*/src/**/*.purs", "src/**/*.purs"],
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
    externals: [nodeExternals()],
};
