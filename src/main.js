import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './lang'
import { Application } from '@pixi/app'
import { Renderer } from '@pixi/core'
import { Ticker, TickerPlugin } from '@pixi/ticker'
import { InteractionManager } from '@pixi/interaction'
import { Live2DModel } from 'pixi-live2d-display'

const { ipcRenderer } = window.require('electron')

Application.registerPlugin(TickerPlugin)
Live2DModel.registerTicker(Ticker)
// register the InteractionManager to support automatic interaction of Live2D models
Renderer.registerPlugin('interaction', InteractionManager)

Vue.prototype.$pixiApplication = Application
Vue.prototype.$live2d = Live2DModel
Vue.prototype.$ipcRenderer = ipcRenderer

Vue.config.productionTip = false

/** The vue object */
const newVue = new Vue({
  vuetify,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default newVue
