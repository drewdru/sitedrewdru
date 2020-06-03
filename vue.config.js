process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule("i18n")
        .resourceQuery(/blockType=i18n/)
        .type('javascript/auto')
        .use("i18n")
          .loader("@kazupon/vue-i18n-loader")
        .end()
        .use('yaml')
          .loader('yaml-loader')
        .end()
  }
}