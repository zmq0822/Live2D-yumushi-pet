import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zhHans',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    zhHans: {
      message: {
        hello: '你好世界'
      }
    }
  }
})
