import * as PixiUtils from 'chc-pixi-utils';
import Scene from './Scene.js';

export default class Scene1 extends Scene {

    init() {
        this.VIDEO_PLAY = 'video_play';

        this.bg = PixiUtils.CSprite('bg', 'fromFrame');

        super.init(); //再执行父类的init()
    }

    get wid() {
        return 1338;
    }

    get hei() {
        return 640;
    }

    begin() {
        this.addChild(this.bg);

        this.emit(this.SCENE_IN);
        this._isSceneIn = true;
    }

    out() {
        super.out();
    }


    //Scene类update方法执行的方法，在这里自定义逐帧内容
    updateFun() {
        //console.log('33333');
    }
}

