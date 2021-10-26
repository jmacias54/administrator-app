module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  outputDir:
    process.env.NODE_ENV === 'production' ? 'dist/AdminPortal' : 'dist',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/AdminPortal/' : '/',
  assetsDir:
    process.env.NODE_ENV === 'production' ? 'public/' : '',


  chainWebpack: config => {
    config.plugin('html').tap(args => {
      if (args[0].minify) args[0].minify.removeAttributeQuotes = false

      return args
    })
  },

}
