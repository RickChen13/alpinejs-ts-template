const htmlwp = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const router = require("./config/router.js");

module.exports = (env, argv) => {
    const getEntry = () => {
        const entry = {};
        if (router.length == 0) {
            glob.sync('./src/app/*.ts').forEach((file) => {
                const name = file.replace(/(.*\/)*([^.]+).*/ig, "$2");
                entry[name] = file;
            });

        } else {
            for (let index = 0; index < router.length; index++) {
                const element = router[index];
                entry[element.entryName] = element.app
            }
        }
        console.log(entry)
        return entry;
    }

    const getHtmlwp = () => {
        const result = [];
        if (router.length == 0) {
            // 自动路由
            glob.sync('./src/app/*.ts').forEach((file) => {
                const name = file.replace(/(.*\/)*([^.]+).*/ig, "$2");
                result.push(new htmlwp({
                    entry: name,
                    template: './public/index.html',
                    chunks: [`${name}`],
                    filename: `${name}.html`,
                    minify: {
                        // 压缩 HTML 文件
                        removeComments: true, // 移除 HTML 中的注释
                        collapseWhitespace: true, // 删除空白符与换行符
                        minifyCSS: true // 压缩内联 css
                    },
                }))

            });
        } else {
            for (let index = 0; index < router.length; index++) {
                const element = router[index];
                result.push(new htmlwp({
                    entry: element.entryName,
                    template: './public/index.html',
                    chunks: [`${element.entryName}`],
                    filename: `${element.filename}.html`,
                    minify: {
                        // 压缩 HTML 文件
                        removeComments: true, // 移除 HTML 中的注释
                        collapseWhitespace: true, // 删除空白符与换行符
                        minifyCSS: true // 压缩内联 css
                    },
                }))
            }
        }
        return result;
    }

    const getPlugins = () => {
        const result = [];
        if (argv.mode == "production") {
            result.push(new CleanWebpackPlugin())
        }

        result.push(new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
        }));
        result.push(...getHtmlwp());
        return result;
    }

    return {
        // devtool: 'source-map',
        mode: argv.mode,
        entry: getEntry(),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: 'js/[name]-bundle.[contenthash:8].js',
            chunkFilename: 'js/[name]-bundle.[contenthash:8].js',
        },
        plugins: [
            ...getPlugins()
        ],
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/ //表示node_modules中的tsx文件不做处理
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // {
                        //  loader: 'style-loader' // 用style标签将样式插入到head中
                        //}, 
                        {
                            loader: MiniCssExtractPlugin.loader,// 将css样式文件用link标签引入，使用此loader就不需要用style-loader，即使用了也不会有效果
                        },
                        {
                            loader: "css-loader",

                        },
                        {
                            loader: 'sass-loader' // 使用 sass-loader 将 scss 转为 css
                        },
                    ],
                },

                {
                    test: /\.(png|jpg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: './',
                            name: 'images/[name]-[hash].[ext]',
                            esModule: false,
                        }
                    }],
                },
                {
                    test: /\.(htm|html)$/,
                    use: 'html-withimg-loader'
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', 'css'],
            alias: {
                "@": __dirname + '/src',
            }
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // 打包业务中公共代码
                    common: {
                        name: "common",
                        chunks: "initial",
                        minSize: 1,
                        priority: 0,
                        minChunks: 2, // 同时引用了2次才打包
                    },
                    // 打包第三方库的文件
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "initial",
                        priority: 10,
                        minChunks: 2, // 同时引用了2次才打包
                    }
                }
            },
            runtimeChunk: { name: 'manifest' } // 运行时代码
        }
    }
}