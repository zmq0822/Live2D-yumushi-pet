<template>
  <div @mouseenter="showButton = true" @mouseleave="showButton = false">
    <v-container :style="canvasContainerStyle" id="canvasContainer">
      <v-row no-gutters>
        <v-slide-y-reverse-transition>
          <div
            id="floatDialog"
            :style="floatDialogStyle"
            v-show="model !== null ? model.dialogClock : false"
          >O_O</div>
        </v-slide-y-reverse-transition>
      </v-row>
      <v-row no-gutters>
        <v-col cols="10">
          <canvas id="canvas"></canvas>
        </v-col>
        <v-slide-x-reverse-transition>
          <v-col cols="2" v-show="showButton" style="z-index: 25">
            <v-row no-gutters>
              <v-col cols="12">
                <v-progress-circular
                  :rotate="-90"
                  :size="this.modelWidth / 6"
                  :width="this.modelWidth / 12"
                  :value="clockCal()"
                  class="floatBotton"
                >
                  <v-icon dark :size="iconSize">mdi-bell</v-icon>
                </v-progress-circular>
              </v-col>
              <!-- <v-col cols="12">
                <v-btn
                  fab
                  dark
                  :width="buttonSize"
                  :height="buttonSize"
                  elevation="0"
                  class="floatBotton"
                >
                  <v-icon dark :size="iconSize">mdi-account</v-icon>
                </v-btn>
              </v-col>-->
              <v-col cols="12">
                <v-btn
                  fab
                  dark
                  :width="buttonSize"
                  :height="buttonSize"
                  elevation="0"
                  @click="resetModel()"
                  class="floatBotton"
                >
                  <v-icon dark :size="iconSize">mdi-autorenew</v-icon>
                </v-btn>
              </v-col>
              <v-col v-for="i in 1" :key="i" cols="12" id="moveButton">
                <v-btn
                  fab
                  dark
                  :width="buttonSize"
                  :height="buttonSize"
                  elevation="0"
                  class="floatBotton"
                >
                  <v-icon dark :size="iconSize">mdi-arrow-all</v-icon>
                </v-btn>
              </v-col>
              <!-- test -->
              <v-col cols="12">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="floatBotton"
                      fab
                      dark
                      :width="buttonSize"
                      :height="buttonSize"
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark :size="iconSize">mdi-cog</v-icon>
                    </v-btn>
                  </template>
                  <v-card @mouseenter="setIgnoreMouse" @mouseleave="cancelIgnoreMouse">
                    <v-card-title class="text-h5 grey lighten-2">Setting menu</v-card-title>
                    <v-card-text>TODO</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <!-- test -->
            </v-row>
          </v-col>
        </v-slide-x-reverse-transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { main } from "../live2d";

export default {
  data () {
    return {
      showButton: false,
      model: null,
      dialog: false,
    };
  },
  mounted () {
    this.$nextTick(() => {
      main().then((res) => {
        this.model = res;
      });
    });
  },
  name: "TouchFish",
  props: {
    msg: String,
  },
  methods: {
    setIgnoreMouse () {
      this.$ipcRenderer.send('ignoreMouse', false)
    },
    cancelIgnoreMouse () {
      this.$ipcRenderer.send('ignoreMouse', true)
    },
    resetModel () {
      if (this.model !== null) {
        clearInterval(this.model.timer);
        this.model.destroy(true);
        this.model = null;
      }
      main().then((res) => {
        this.model = res;
      });
    },
    clockCal () {
      let clock = (this.model !== null ? this.model.activeClock : 0)
      let time = this.$store.getters.getConfig.reminderDuration
      return (clock % time) / time * 100
    },
    blackScreen () {
      document.getElementsByTagName('html')[0].style.backgroundColor = 'rgb(0,0,0)'
      setTimeout("document.getElementsByTagName('html')[0].style.backgroundColor = 'rgba(0,0,0,0)'", 3000)
    }
  },
  computed: {
    modelWidth () {
      let modelWidth = this.model !== null ? this.model.width : 10;
      return modelWidth;
    },
    iconSize () {
      return this.modelWidth / 10 + "px";
    },
    buttonSize () {
      return this.modelWidth / 6 + "px";
    },
    floatDialogStyle () {
      let modelWidth = this.modelWidth;
      let style = "font-size:";
      style += Math.sqrt(modelWidth) * 6;
      style += "%;width:";
      style += modelWidth;
      style += "px;";
      return style;
    },
    canvasContainerStyle () {
      let modelWidth = this.modelWidth;
      let style = "width:";
      style += (modelWidth / 5) * 6;
      style += "px;";
      return style;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvasContainer {
  position: absolute;
  padding: 0px;
  right: 5px;
  bottom: 5px;
}
#floatDialog {
  padding: 15px;
  background-color: rgba(255, 225, 126, 0.3);
  border: 1px solid rgba(255, 225, 126, 0.5);
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
  margin: 2.5px;
  z-index: 25;
}
</style>
