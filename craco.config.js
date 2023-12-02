const path = require('path');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv
const webpack = require('webpack');

let envFile = '.env'

if (argv.env) {
    envFile = `.env.${argv.env}`
}

require('dotenv')
    .config({ path: path.resolve(__dirname, envFile) });

module.exports = {
    webpack: {
        plugins: [
            new webpack.DefinePlugin({
                API_URL: JSON.stringify(process.env.API_URL),
            })],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};