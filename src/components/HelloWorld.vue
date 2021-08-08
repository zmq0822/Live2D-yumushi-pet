<template>
  <div @mouseenter="showButton = true" @mouseleave="showButton = false">
    <div id="floatElement"></div>

    <div id="floatDialog">该摸鱼啦</div>

    <v-container style="padding:0px;">
      <v-row no-gutters>
        <v-col cols="10">
          <canvas id="canvas"></canvas>
        </v-col>
        <v-slide-x-reverse-transition>
          <v-col cols="2" v-show="showButton" style="z-index:25;">
            <v-row no-gutters>
              <v-col cols="12" class="floatBotton">
                <v-btn class="mx-2" fab dark small>
                  <v-icon dark>mdi-hand</v-icon>
                </v-btn>
              </v-col>
              <v-col v-for="i in 4" :key="i" cols="12" class="floatBotton">
                <v-btn class="mx-2" fab dark small>
                  <v-icon dark>mdi-arrow-all</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-slide-x-reverse-transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { main } from '../assets/live2d/index'

export default {
  data () {
    return {
      showButton: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      main().then()
    })
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#floatElement {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 0px;
  width: 0px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 30;
  -webkit-app-region: drag;
  border-top: 20px solid rgba(0, 0, 0, 0.5);
  border-right: 20px solid transparent;
}
#floatDialog {
  position: absolute;
  padding: 10px;
  right: 5px;
  bottom: 5px;
  min-height: 100px;
  width: 100px;
  background-color: rgb(255, 196, 0);
  border:5px solid black;
  border-radius: 15px;
  z-index: 20;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
.floatBotton {
  margin: 5px;
  z-index: 25;
}
</style>
