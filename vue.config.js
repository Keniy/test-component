const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    transpileDependencies: [],
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    productionSourceMap: false,
    css: {
        extract: true,
        modules: false,
        sourceMap: false,
        loaderOptions: {
            css: {

            },
            postcss: {

            },
            sass: {

            }
        }
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.resolve.symlinks(false)
        config.entry('main').add('babel-polyfill')
        config.module
            .rule('js')
            .include
            .add('/packages/')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        config.resolve.alias
            .set('@', resolve('examples'))
            .set('src', resolve('examples'))
            .set('components', resolve('examples/components'))
            .set('examples', resolve('examples'))
            .set('common', resolve('examples/common'))
            .set('packages', resolve('packages'))
            .set('api', resolve('examples/api'))
            /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()
                config.plugins.delete('prefetch')
            }
        }
    }
}