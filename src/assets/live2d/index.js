import * as PIXI from 'pixi.js'
window.PIXI = PIXI
const { ipcRenderer } = window.require('electron');

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
    height: 240,
    width: 240,
    antialias: true, // 消除锯齿
    backgroundAlpha: 0, // 背景不透明
    resolution: 1, // 像素设置
    roundPixels: true
  })
  // set the background color 设置画布背景颜色
  app.renderer.backgroundColor = 0x000000

  // Add mouse listener 增加鼠标监视器
  const el = document.getElementById('canvasContainer')
  const mb = document.getElementById('moveButton')
  el.addEventListener('mouseenter', () => {
    ipcRenderer.send('ignoreMouse', false)
  })
  el.addEventListener('mouseleave', () => {
    ipcRenderer.send('ignoreMouse', true)
  })
  let x = 0;
  let y = 0;
  let l = 0;
  let t = 0;
  let nl = 0;
  let nt = 0;
  let isDown = false;
  let mouseTicking = false;
  // mouse down / 鼠标按下事件
  mb.onmousedown = function (e) {
    // get current x & y / 获取x坐标和y坐标
    x = e.clientX;
    y = e.clientY;
    // get offset / 获取偏移量
    l = el.offsetLeft + el.offsetWidth;
    t = el.offsetTop + el.offsetHeight;
    // open the key / 开关打开
    isDown = true;
  }
  // mouse move / 鼠标移动
  window.onmousemove = function (e) {
    if (isDown === false) {
      return;
    }
    if (!mouseTicking) {
      // get x & y / 获取x和y
      let nx = e.clientX;
      let ny = e.clientY;
      // calc offset / 计算移动后的偏移量
      nl = nx - (x - l);
      nt = ny - (y - t);
      requestAnimationFrame(drawCanvas);
    }
    mouseTicking = true;
  }

  function drawCanvas () {
    mouseTicking = false;
    el.style.right = innerWidth - nl + 'px';
    el.style.bottom = innerHeight - nt + 'px';
  }

  // mouse up / 鼠标抬起事件
  mb.onmouseup = function () {
    // close the key / 开关关闭
    isDown = false;
  }
  const model = await addLive2DModel('/model/anan_hb/anan_hb.model3.json', app);
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json'
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json'

  return model;
}