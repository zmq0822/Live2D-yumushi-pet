<template>
  <div @mouseenter="showButton = true" @mouseleave="showButton = false">
    <div id="floatElement"></div>
    <!-- <a>{{model!=null?model.dialogClock:'a'}}</a> -->
    <v-slide-y-reverse-transition>
    <div id="floatDialog" :style="'font-size:' + Math.sqrt(Math.min($vuetify.breakpoint.width, $vuetify.breakpoint.height)) * 6 + '%;'" v-show="model!=null?model.dialogClock:true">该摸鱼啦</div>
    </v-slide-y-reverse-transition>
    <v-container style="padding:0px;">
      <v-row no-gutters>
        <v-col cols="9">
          <canvas id="canvas"></canvas>
        </v-col>
        <v-slide-x-reverse-transition>
          <v-col cols="3" v-show="showButton" style="z-index:25;">
            <v-row no-gutters>
              <v-col cols="12" class="floatBotton">
                <v-btn class="mx-2" fab dark x-small>
                  <v-icon dark>mdi-hand</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" class="floatBotton">
                <v-btn class="mx-2" fab dark x-small>
                  <v-icon dark>mdi-account</v-icon>
                </v-btn>
              </v-col>
              <v-col v-for="i in 1" :key="i" cols="12" class="floatBotton">
                <v-btn class="mx-2" fab dark x-small>
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
      showButton: false,
      model: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      main().then((res)=>{
        this.model = res;
        // console.log(res);
      })
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
  border-top: 15px solid rgba(0, 0, 0, 0.5);
  border-right: 15px solid transparent;
}
#floatDialog {
  position: absolute;
  padding: 10px;
  right: 5%;
  top: 5px;
  min-height: 25%;
  width: 90%;
  background-color: rgba(255, 196, 0, 0.3);
  border:1px solid rgba(255, 196, 0, 0.8);
  border-radius: 15px;
  z-index: -1;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  user-select: none;
}
.floatBotton {
  margin: 5px;
  z-index: 25;
  float: right;
}
</style>
