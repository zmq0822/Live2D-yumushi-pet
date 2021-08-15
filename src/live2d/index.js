import _this from '../main'

const { addLive2DModel } = require('./stagemodel')

/**
 * Cubism2ModelSettings / 初始化Live2D模型
 * 
 * @return Live2DModel
 */
export async function main () {
  // get stage / 创建舞台
  _this.$store.commit('createApp')
  const app = _this.$store.getters.getApp
  addListener();
  //create model / 创建模型
  const modelLocation = _this.$store.getters.getConfig.modelLocation;
  const model = await addLive2DModel(modelLocation, app);
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json'
  // 'https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json'
  return model;
}

/**
 * Add listener for application / 为应用增加监听器
 */
function addListener () {
  // Add mouse listener / 增加鼠标监听器
  const el = document.getElementById('canvasContainer')
  const mb = document.getElementById('moveButton')
  el.addEventListener('mouseenter', () => {
    _this.$ipcRenderer.send('ignoreMouse', false)
  })
  el.addEventListener('mouseleave', () => {
    _this.$ipcRenderer.send('ignoreMouse', true)
  })
  let x = 0; let y = 0;
  let l = 0; let t = 0;
  let nl = 0; let nt = 0;
  let isDown = false; let mouseTicking = false;
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
}