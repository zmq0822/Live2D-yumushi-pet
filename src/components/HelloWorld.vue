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
                  color="primary"
                  :rotate="-90"
                  :size="this.modelWidth / 6"
                  :width="this.modelWidth / 12"
                  :value="clockCal()"
                  class="floatButton"
                  @mouseenter="showDialog(model, getText('menuReminder'));"
                >
                  <v-icon dark :size="iconSize">mdi-bell</v-icon>
                </v-progress-circular>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  fab
                  dark
                  :width="buttonSize"
                  :height="buttonSize"
                  elevation="0"
                  @click="resetModel()"
                  class="floatButton"
                  @mouseenter="showDialog(model, getText('menuReset'));"
                >
                  <v-icon dark :size="iconSize">mdi-autorenew</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" id="moveButton">
                <v-btn
                  color="primary"
                  fab
                  dark
                  :width="buttonSize"
                  :height="buttonSize"
                  elevation="0"
                  class="floatButton"
                  @mouseenter="showDialog(model, getText('menuMove'));"
                >
                  <v-icon dark :size="iconSize">mdi-arrow-all</v-icon>
                </v-btn>
              </v-col>
              <!-- Setting Menu -->
              <v-col cols="12">
                <v-dialog v-model="dialog" width="700" scrollable hide-overlay>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      fab
                      dark
                      :width="buttonSize"
                      :height="buttonSize"
                      elevation="0"
                      class="floatButton"
                      @mouseenter="showDialog(model, getText('menuSetting'));"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark :size="iconSize">mdi-cog</v-icon>
                    </v-btn>
                  </template>
                  <SettingMenu />
                </v-dialog>
              </v-col>
              <!-- Setting Menu End -->
            </v-row>
          </v-col>
        </v-slide-x-reverse-transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { main } from '../live2d'
import { showDialog, getText } from '../live2d/stagemodel'
import SettingMenu from './SettingMenu.vue'

export default {
  data () {
    return {
      showButton: false,
      model: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      main().then((res) => {
        this.model = res
      })
    })
  },
  name: 'TouchFish',
  components: {
    SettingMenu
  },
  props: {
    msg: String
  },
  methods: {
    showDialog,
    getText,
    resetModel () {
      if (this.model !== null) {
        clearInterval(this.model.timer)
        this.model.destroy(true)
        this.model = null
      }
      main().then((res) => {
        this.model = res
      })
    },
    clockCal () {
      const clock = this.model !== null ? this.model.activeClock : 0
      const time = this.$store.getters.getConfig.reminderDuration
      return ((clock % time) / time) * 100
    },
    // TEST
    blackScreen () {
      document.getElementsByTagName('html')[0].style.backgroundColor = 'rgb(0,0,0)'
      setTimeout(
        function () {
          document.getElementsByTagName('html')[0].style.backgroundColor = 'rgba(0,0,0,0)'
        }, 3000)
    }
  },
  computed: {
    modelWidth () {
      const modelWidth = this.model !== null ? this.model.width : 10
      return modelWidth
    },
    iconSize () {
      return this.modelWidth / 10 + 'px'
    },
    buttonSize () {
      return this.modelWidth / 6 + 'px'
    },
    floatDialogStyle () {
      const modelWidth = this.modelWidth
      let style = 'font-size:'
      style += Math.sqrt(modelWidth) * 6
      style += '%;width:'
      style += modelWidth
      style += 'px;'
      style += 'background-color:'
      style += this.$store.state.config.themeColor
      style += '4D;'
      style += 'border: 1px solid '
      style += this.$store.state.config.themeColor
      style += '80;'
      return style
    },
    canvasContainerStyle () {
      const modelWidth = this.modelWidth
      let style = 'width:'
      style += (modelWidth / 5) * 6
      style += 'px;'
      return style
    },
    dialog: {
      get () {
        return this.$store.state.settingMenu
      },
      set (value) {
        this.$store.commit('changeSettingMenu', value)
      }
    }
  }
}
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
  border-radius: 15px;
  z-index: -1;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  text-shadow: 0px 0px 15px rgba(255, 255, 255, 1);
  user-select: none;
}
.floatButton {
  margin: 2.5px;
  z-index: 25;
}
</style>
