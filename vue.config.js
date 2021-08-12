module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        asarUnpack: ['**/config.json', '**/model/*'],
        // win: {
        //   icon: './public/app.ico'
        // },
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
