<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created () {
    // get config / 获取配置
    const config = JSON.parse(this.load("config.json"));
    this.$store.commit('setConfig', config);
    // get language / 获取语言
    const zhHans = JSON.parse(this.load("lang/zhHans.json"));
    const en = JSON.parse(this.load("lang/en.json"));
    this.$i18n.setLocaleMessage('zhHans', zhHans)
    this.$i18n.setLocaleMessage('en', en)
  },
  methods: {
    /**
    * Load resource by xml / 使用xml读取数据
    * @param {string} name The URL for resource / 资源地址
    */
    load (name) {
      let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
      xhr.open('GET', name, false);
      xhr.overrideMimeType("text/html;charset=utf-8");
      xhr.send(null);
      return xhr.status === okStatus ? xhr.responseText : null;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}
body::-webkit-scrollbar {
  display: none;
}
html {
  overflow: hidden;
}
body {
  overflow: hidden;
}
</style>
