const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './router.js',
    output: {
        filename: 'router.min.js',
        path: path.resolve(__dirname, '_dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};