<template>
  <v-card @mouseenter="setIgnoreMouse" @mouseleave="cancelIgnoreMouse" :style="cssColor">
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>设置</v-toolbar-title>
    </v-toolbar>
    <v-card-text style="height: 300px; padding-left: 0px">
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>主题设置
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>预留空格
        </v-tab>
        <!--主题-->
        <v-tab-item>
          <v-subheader>主题颜色</v-subheader>
          <v-container>
            <v-row>
              <v-col cols="4" v-for="item in color" :key="item.label">
                <v-btn dark tile block :color="item.value" @click="changeColor(item.value)">
                  <v-icon
                    v-show="$vuetify.theme.themes.light.primary === item.value"
                    dark
                    left
                  >mdi-checkbox-marked-circle</v-icon>
                  {{ item.label }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-color-picker
                  mode="hexa"
                  width="525"
                  swatches-max-height="250"
                  v-model="modelColor"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-subheader>XXXX</v-subheader>
          <v-container></v-container>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="changeSettingMenu()">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { showDialog, getText } from '../live2d/stagemodel'
import color from '../assets/colors'
export default {
  data () {
    return {
      color
    }
  },
  methods: {
    showDialog,
    getText,
    setIgnoreMouse () {
      this.$ipcRenderer.send('ignoreMouse', false)
    },
    cancelIgnoreMouse () {
      this.$ipcRenderer.send('ignoreMouse', true)
    },
    changeSettingMenu () {
      this.$store.commit('changeSettingMenu', false)
    },
    changeColor (value) {
      this.$vuetify.theme.themes.light.primary = value
      this.$vuetify.theme.themes.dark.primary = value
      showDialog(this.$store.state.pixiApp.stage.children[0], getText('menuSettingChangeColor'))
      this.changeConfig(value)
    },
    changeConfig (value) {
      this.$store.commit('changeColor', value)
    }
  },
  computed: {
    modelColor: {
      get () {
        return this.$store.state.config.themeColor
      },
      set (value) {
        this.changeColor(value)
        this.changeConfig(value)
      }
    },
    cssColor () {
      return {
        '--color': this.$store.state.config.themeColor
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: var(--color);
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 0px;
}
</style>
