import * as PIXI from 'pixi.js'

window.PIXI = PIXI

const { Live2DModel } = require('pixi-live2d-display')
// Cubism2ModelSettings

export async function main () {
  const app = new PIXI.Application({
    view: document.getElementById('canvas'),
    autoStart: true,
    resizeTo: window,
    antialias: true, // 消除锯齿
    transparent: true, // 背景不透明
    resolution: 1, // 像素设置
    roundPixels: true

  })

  const model = await Live2DModel.from(
    '/model/anan_hb/anan_hb.model3.json' //'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json'
  )

  app.stage.addChild(model)

  app.renderer.backgroundColor = 0x000000 // set the background color 设置画布背景颜色

  const scaleX = (innerWidth) / model.width;
  const scaleY = (innerHeight) / model.height;

  // fit the window
  model.scale.set(Math.min(scaleX, scaleY));

  model.dialogClock = 5;
  model.activeClock = 0;

  controllable(model);
  clockControl(model);

  // interaction control 互动控制
  model.on('hit', (hitAreas) => {
    if (hitAreas.includes('body')) {
      model.motion('tap_body')
    }
  })

  function controllable (model) {
    // drag control 拖拽控制
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
      model.dragging = true;
      document.getElementById('floatDialog').innerHTML = '哇哦';
      model.dialogClock = 5;
      model._pointerX = e.data.global.x - model.x;
      model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
      if (model.dragging) {
        app.renderer.backgroundColor = 0x111111;
        model.position.x = e.data.global.x - model._pointerX;
        model.position.y = e.data.global.y - model._pointerY;
      }
    });
    model.on("pointerupoutside", () => (model.dragging = false, app.renderer.backgroundColor = 0x000000, document.getElementById('floatDialog').innerHTML = '该摸鱼啦', model.dialogClock = 5));
    model.on("pointerup", () => (model.dragging = false, app.renderer.backgroundColor = 0x000000, document.getElementById('floatDialog').innerHTML = '该摸鱼啦', model.dialogClock = 5));
    // scale control 缩放控制
    window.addEventListener("mousewheel", (e) => {
      const step = e.wheelDelta > 0 ? 0.1 : -0.1
      if (app.stage.scale.x + step >= 0.5 && model.scaling === true) {
        app.stage.scale.x += step
        app.stage.scale.y += step
      }
    });
    model.on("pointerover", () => (model.scaling = true));
    model.on("pointerout", () => (model.scaling = false));
  }
  // dialog control 对话框时钟控制
  function clockControl (model) {
    if (model.dialogClock > 0) {
      model.dialogClock--;
    }
    model.activeClock++;
    if (model.activeClock % 1200 === 0) document.getElementById('floatDialog').innerHTML = '休息时间到了，该摸鱼啦', model.dialogClock = 20;
    setTimeout(function () { clockControl(model); }, 1000);
  }
  return model;
}