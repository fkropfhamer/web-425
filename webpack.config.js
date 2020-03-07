const path = require('path');

module.exports = [
    {
        entry: path.resolve(__dirname, 'public', 'mnist_server.js'),
        module: {
        rules: [
            {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            },
        ],
        },
        resolve: {
            extensions: ['*', '.js'],
        },
        output: {
            filename: 'mnist_server.js',
            path: path.resolve(__dirname, 'app', 'static'),
        },
    },
    {
        entry: path.resolve(__dirname, 'public', 'question.js'),
        module: {
        rules: [
            {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            },
        ],
        },
        resolve: {
            extensions: ['*', '.js'],
        },
        output: {
            filename: 'question.js',
            path: path.resolve(__dirname, 'app', 'static'),
        },
    },
    {
        entry: path.resolve(__dirname, 'public', 'darkmode.js'),
        module: {
        rules: [
            {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            },
        ],
        },
        resolve: {
            extensions: ['*', '.js'],
        },
        output: {
            filename: 'darkmode.js',
            path: path.resolve(__dirname, 'app', 'static'),
        },
    }
];
