import $ from 'jquery';
import * as PIXI from 'pixi.js';
import Vconsole from 'vconsole';
import Loader from './Loader/Loader';

import LoadingMc from './Loader/LoadingMc';
import Scene1 from './Scene/Scene1';

let app;
let stage;

//设置横屏
setHeng();
//初始化pixi
initPixi();

var vconsole = new Vconsole();

//===========================================设置横屏===========================
function setHeng(){
    const dom_wid = window.innerWidth;
    const dom_hei = window.innerHeight;
    if (dom_wid > dom_hei) {
        console.log('横屏的');
        $('#pixiStage').css({'width': 375 + 'px', 'height': 812 + 'px'});
    } else {
        console.log('竖屏的');
        $('#pixiStage').css({'width': 375 + 'px', 'height': 812 + 'px'});
    }


    window.addEventListener('orientationchange', function (e) {
        setTimeout(() => {
            windowReset();
        }, 200);
    });

    windowReset();
}


function windowReset() {
    //console.log(640 / (375 / window.screen.height));
    const wid = window.innerWidth;
    const hei = window.innerHeight;

    if (wid > hei) {
        //console.log('横屏:::::::' + hei,wid,window.screen.height);
        $('#pixiStage').css('transform-origin', '0px 0px 0px');
        $('#pixiStage').css('transform', 'rotate(-90deg)');
        $('#pixiStage').css('top', hei + 'px');
        $('#pixiStage').css('left', '0px');
        let canvasHei = $('#pixiCanvas').height();
        let canvasY = wid / 2 - canvasHei / 2;
        $('#pixiCanvas').css('top', canvasY + 'px');
    } else {
        //console.log('竖屏:::::::' + hei,wid);
        $('#pixiStage').css('transform-origin', '0px 0px 0px');
        $('#pixiStage').css('transform', 'rotate(0deg)');
        $('#pixiStage').css('top', '0px');
        $('#pixiStage').css('left', '0px');
        let canvasHei = $('#pixiCanvas').height();
        let canvasY = hei / 2 - canvasHei / 2;
        $('#pixiCanvas').css('top', canvasY + 'px');
    }

}


//===============================初始化pixi======================================//
function initPixi() {
    let hei = 0;
    if (window.screen.width > window.screen.height) {
        //横屏
        hei = window.screen.width;
    } else {
        //竖屏
        hei = window.screen.height;
    }
    app = new PIXI.Application(640, Math.ceil(640 / (375 / hei)), {
        backgroundColor: 0x1099bb,
        preserveDrawingBuffer: true,
        antialias: true,
    });

    document.getElementById('pixiStage').appendChild(app.view);
    app.view.id = 'pixiCanvas';
    stage = new PIXI.Container();
    app.stage.addChild(stage);
    stage.rotation = 90 * Math.PI / 180;
    stage.x = app.view.width;

    loading();
    start();
}

//=====================================loading部分==================================//
let loadingMc;

function loading() {
    //先加载加载界面
    let loading_asset = [
        {name: 'myIcon', url: './images/myIcon.jpg'}
    ];
    const loader = new Loader({manifest: loading_asset});
    loader.start();
    loader.on('onComplete', () => {
        loadingMc = new LoadingMc();
        stage.addChild(loadingMc);
        loadingMc.x = app.view.width / 2 - loadingMc.wid / 2;
        loadingMc.y = app.view.height / 2 - loadingMc.hei / 2;
        loadingMc.begin();

        loadMain(); //加载主资源
    });
}

let mainLoader;

function loadMain() {
    let loading_asset = [
        {name: 'bg', url: './images/anKv.jpg'}
    ];

    mainLoader = new Loader({manifest: loading_asset, easing: 0.1});
    mainLoader.start();
    mainLoader.on('onProgress', (pro) => {
        //console.log(pro);
        loadingMc.text.text = pro + '%';
    });
    mainLoader.on('onComplete', () => {
        mainLoader = null;
        stage.removeChild(loadingMc);
        loadingMc = null;

        lunchIn();
    });
}

//==============================lunch部分=======================
let lunch;

function lunchIn() {
    lunch = new Scene1(app);
    lunch.init();
    stage.addChild(lunch);
    lunch.x = app.view.height / 2 - lunch.wid / 2;
    lunch.y = app.view.width / 2 - lunch.hei / 2;

    lunch.begin();
}

function update() {
    if (mainLoader) mainLoader.update();
}

function start() {
    requestAnimationFrame(start);
    update();
}