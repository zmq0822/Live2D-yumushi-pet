module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        asarUnpack: ['**/config.json', '**/model/*'],
        win: {
          icon: './public/favicon.ico'
        },
        // mac: {
        //   icon: './public/app.png'
        // },
        // productName: 'Akantantool'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
