module.exports = {
  dev: {
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      }
    },

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Various Dev Server settings
    host: 'localhost' // can be overwritten by process.env.HOST
  }
}
