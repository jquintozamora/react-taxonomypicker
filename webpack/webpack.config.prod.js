///////////////////////////////////////////////////////////////////////////////////////////////////
//  WebPack 2 PROD Config
///////////////////////////////////////////////////////////////////////////////////////////////////

const resolve = require('path').resolve;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    // target: 'node',
    entry: {
        'React.TaxonomyPicker': './app/src/index.tsx'
    },
    context: resolve(__dirname, '../'),
    output: {
        path: resolve(__dirname, './../lib'),
        libraryTarget: 'commonjs2',
        filename: '[name].js',
        publicPath: '/'
    },
    output: {
        filename: '[name].js',
        path: './lib/components/',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')      // Reduces 78 kb on React library
            },
            'DEBUG': false,                                 // Doesn´t have effect on my example
            '__DEVTOOLS__': false                           // Doesn´t have effect on my example
        }),
        new ExtractTextPlugin({
            filename: '../dist/[name].css',
            allChunks: true
        }),
        new webpack.NormalModuleReplacementPlugin(/..\/..\/..\/..\/utils\/MockAPI\/SP.Taxonomy$/, "../../../../utils/API/SP.Taxonomy"),
        // Plugings for optimizing size and performance.
        // Here you have all the available by now:
        //    Webpack 1. https://github.com/webpack/webpack/blob/v1.13.3/lib/optimize
        //    Webpack 2. https://github.com/webpack/webpack/tree/master/lib/optimize
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                drop_debugger: true,
                global_defs: {
                    __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
                }
            },
            minimize: true,
            debug: false,
            sourceMap: true,
            output: {
                comments: false
            },

        })
    ],
    module: {
        // loaders -> rules in webpack 2
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    '/node_modules/'
                ]
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/i,
                include: resolve(__dirname, './../app/stylesheets'),  // Use include instead exclude to improve the build performance
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [
                                    require("postcss-import")(),
                                    // Following CSS Nesting Module Level 3: http://tabatkins.github.io/specs/css-nesting/
                                    require("postcss-nesting")(),
                                    require("postcss-custom-properties")(),
                                    //https://github.com/ai/browserslist
                                    require("autoprefixer")({
                                        browsers: ['last 2 versions', 'ie >= 9']
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/i,
                include: resolve(__dirname, './../app/src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: true,
                                camelCase: true,
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                                minimize: true
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([
                                    require("postcss-import")(),
                                    // Following CSS Nesting Module Level 3: http://tabatkins.github.io/specs/css-nesting/
                                    require("postcss-nesting")(),
                                    require("postcss-custom-properties")(),
                                    //https://github.com/ai/browserslist
                                    require("autoprefixer")({
                                        browsers: ['last 2 versions', 'ie >= 9']
                                    })
                                ])
                            }
                        }
                    ]
                })
            }
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
