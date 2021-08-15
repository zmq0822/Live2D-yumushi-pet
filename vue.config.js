module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        asarUnpack: ['**/config.json', '**/model/*', '**/lang/*'],
        win: {
          icon: './public/favicon.ico'
        },
        // mac: {
        //   icon: './public/app.png'
        // },
        productName: 'YMSPet'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
