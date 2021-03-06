const path = require('path');

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
      config.module
        .rule('raw')
        .test(/\.texture$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
    },
    publicPath: "",
    outputDir: path.resolve(__dirname, "./docs")
}