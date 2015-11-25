var path = require("path");
module.exports = {
    "entry": path.resolve(__dirname, "src/caster.js"),
    "output": {
        path: __dirname + "/dist",
        filename: "caster.js",
        library: "caster",
        libraryTarget: "umd"
    },
    "module": {
        "loaders": [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    devtool: "source-map"
};
