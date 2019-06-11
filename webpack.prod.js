const path = require("path");
const Dotenv = require("dotenv-webpack");
const Minimify = require("babel-minify-webpack-plugin");

module.exports = {
    // Entrypoint
    entry: "./src/index.ts",
    // Make sure we don't touch native libs
    target: "node",
    mode: "production",
    module: {
        rules: [
            // TypeScript
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".purs"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    node: {
        fs: "empty",
        net: "empty",
    },
    // Dotenv plugin
    plugins: [new Dotenv(), new Minimify()],
};
