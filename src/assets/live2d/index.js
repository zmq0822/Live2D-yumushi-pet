import * as PIXI from 'pixi.js'
window.PIXI = PIXI

const { addLive2DModel } = require('./stagemodel')

/**
 * Cubism2ModelSettings
 * 
 * @return Live2DModel
 */
export async function main () {
  /** The default stage */
  const app = new PIXI.Application({
    view: document.getElementById('canvas'),
    autoStart: true,
    resizeTo: window,
    antialias: true, // 消除锯齿
    backgroundAlpha: 0, // 背景不透明
    resolution: 1, // 像素设置
    roundPixels: true
  })
  // set the background color 设置画布背景颜色
  app.renderer.backgroundColor = 0x000000

  const model = await addLive2DModel('/model/anan_hb/anan_hb.model3.json', app);
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json'
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json'

  return model;
}