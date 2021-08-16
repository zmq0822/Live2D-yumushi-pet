import Vue from 'vue'
import Vuex from 'vuex'
import _this from '../main'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  pixiApp: null,
  config: null,
  settingMenu: false
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  },
  // create pixi app
  createApp (state) {
    // new app
    if (state.pixiApp === null) {
      state.pixiApp = new _this.$pixiApplication({
        view: document.getElementById('canvas'),
        autoStart: true,
        height: 240,
        width: 240,
        antialias: true, // antialias / 消除锯齿
        backgroundAlpha: 0, // backgroundAlpha / 背景不透明
        resolution: 1, // resolution / 像素设置
        roundPixels: true
      })
      // set the background color / 设置画布背景颜色
      state.pixiApp.renderer.backgroundColor = 0x000000
    }
  },
  // set config
  setConfig (state, n) {
    state.config = n
  },
  // show setting menu
  changeSettingMenu (state, n) {
    state.settingMenu = n
  },
  // change theme color
  changeColor (state, n) {
    state.config.themeColor = n
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

// getters are functions.
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
  // get the pixi app
  getApp: state => {
    return state.pixiApp
  },
  getConfig: state => {
    return state.config
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
