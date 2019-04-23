module.exports = {
    
    // https://webpack.js.org/configuration/dev-server/
    // 'all options for the webpack server.
    devServer: {
        proxy: 'https://localhost:8080',
        port: 80
    }
}