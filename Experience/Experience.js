import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";

import World from "./World/World";

export default class Experience {
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;
        this.canvas = canvas; // 캔버스
        this.scene = new THREE.Scene(); // 씬
        this.time = new Time(); // 시간
        this.sizes = new Sizes(); // 사이즈
        this.camera = new Camera(); // 카메라
        this.renderer = new Renderer(); // 렌더링
        this.resources = new Resources(assets); // 리소스
        this.world = new World(); // 전체 요소 공간

        this.sizes.on("resize", () => {
            this.update();
        });

        this.time.on("update", () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}
