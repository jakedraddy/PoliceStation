module.exports = {
    //publicPath: process.env.NODE_ENV === 'production'
    //? '/production-sub-path/'
    // https://webpack.js.org/configuration/dev-server/
    // 'all options for the webpack server.
    devServer: {
        proxy: 'https://localhost:80',
        port: 80
    }
}