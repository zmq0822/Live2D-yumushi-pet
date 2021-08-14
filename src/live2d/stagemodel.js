import _this from '../main'

/**
 * Add a model into stage / 向舞台中添加一个模型
 * @param {string} url The URL for live2d-model / 模型文件的地址
 * @param {object} app The pixi stage / pixi舞台
 */
export async function addLive2DModel (url, app) {
    // create & init a model / 创建并初始化模型
    const model = await _this.$live2d.from(url);
    // add the model into stage / 向舞台中添加模型
    app.stage.addChild(model);
    // fit the window / 初始化模型的大小和位置
    const scaleX = app.renderer.width / model.width;
    const scaleY = app.renderer.height / model.height;
    model.anchor.set(0.5, 0.5)
    model.scale.set(Math.min(scaleX, scaleY));
    app.renderer.resize(model.width, model.height)
    model.position.x = model.width / 2
    model.position.y = model.height / 2
    // set clock / 设置时钟
    model.dialogClock = 0;
    model.activeClock = 0;
    // run function below / 运行下列方法
    showDialog(model, getText('hello'));
    clockLoop(model);
    modelController(model, app);
    return model;
}

/**
 * Add model controller / 增加模型控制器
 * @param {Live2DModel} model 
 * @param {object} app The pixi stage / pixi舞台
 */
function modelController (model, app) {
    // drag control / 拖拽控制
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
        model.dragging = true;
        showDialog(model, getText('touch'));
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
    model.on("pointerupoutside", () => (model.dragging = false, app.renderer.backgroundColor = 0x000000));
    model.on("pointerup", () => (model.dragging = false, app.renderer.backgroundColor = 0x000000));
    // scale control / 缩放控制
    window.addEventListener("mousewheel", (e) => {
        const step = e.wheelDelta > 0 ? 1.1 : 0.9
        if (model.scaling === true && model.width * step > 150 && model.width * step < 1080) {
            model.scale.x *= step
            model.scale.y = model.scale.x
            app.renderer.resize(model.width, model.height)
            model.position.x = app.renderer.width / 2
            model.position.y = app.renderer.height / 2
        }
    });
    model.on("pointerover", () => (model.scaling = true));
    model.on("pointerout", () => (model.scaling = false));
    // interaction control / 互动控制
    model.on('hit', (hitAreas) => {
        if (hitAreas.includes('body')) {
            model.motion('tap_body')
        }
    })
}
/**
 * Dialog clock control / 对话框时钟控制
 * @param {object} model The pixi stage / pixi舞台
 */
function clockLoop (model) {
    model.timer = setInterval(function () {
        if (model.dialogClock > 0) {
            model.dialogClock--;
        }
        model.activeClock++;
        if (_this.$store.getters.getConfig.reminderVisible && model.activeClock % _this.$store.getters.getConfig.reminderDuration === 0) {
            showDialog(model, getText('rest'));
            _this.$ipcRenderer.send('notice', ['✋🐟', getText('rest')])
        }
    }, 1000);
}

/**
 * Dialog text control / 对话框文本控制
 * @param {object} model The pixi stage / pixi舞台
 * @param {string} text The dialog text / 对话框文本
 */
function showDialog (model, text) {
    document.getElementById('floatDialog').innerHTML = text
    model.dialogClock = _this.$store.getters.getConfig.dialogDuration;
}

/**
 * Return the random word / 返回随机怪话
 * @param {string} text The dialog text / 对话框文本
 */
function getText (text) {
    let texts = _this.$t(text).split("|")
    let idex = Math.floor((Math.random() * (texts.length - 1)) + 1)
    return texts[idex]
}