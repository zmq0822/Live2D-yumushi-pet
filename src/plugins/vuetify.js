import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import zhHans from 'vuetify/lib/locale/zh-Hans'
import en from 'vuetify/lib/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { zhHans, en },
    current: 'zhHans'
  }
})
