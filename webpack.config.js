let path = require('path');

let devConfig = {
    entry: path.resolve(__dirname, './src/index.jsx'),
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, './web'),
        filename: 'currency.js',
        publicPath: ''
    },
    devServer: {
        inline:true,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, ''),
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]"
            },
            {
                test: /\.styl$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]',
                            importLoaders: 1,
                        },
                    },
                    'stylus-loader',
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    },
};

let prodConfig = {
    entry: path.resolve(__dirname, './src/index.jsx'),
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, './web'),
        filename: 'currency.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]"
            },
            {
                test: /\.styl$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]',
                            importLoaders: 1,
                        },
                    },
                    'stylus-loader',
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        return prodConfig;
    } else {
        return devConfig;
    }
};
