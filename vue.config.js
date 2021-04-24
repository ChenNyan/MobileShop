const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('network', resolve('src/network'))
            .set('utils', resolve('src/utils'))
    },
    devServer: {
        // host: '192.168.0.165',
        proxy: {
            '/api': {
                target: 'http://192.168.0.129:8360', //对应自己的接口
                changeOrigin: true,
            }
        }
    }
}