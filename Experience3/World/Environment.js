import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
        this.setSunlight2();
        this.setRealLight();
        this.setAmbientLight();
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientLight);
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 1;
        this.sunLight.shadow.camera.left = -100;
        this.sunLight.shadow.camera.right = 100;
        this.sunLight.shadow.camera.top = 100;
        this.sunLight.shadow.camera.bottom = -100;
        this.sunLight.shadow.camera.near = -100;
        this.sunLight.shadow.camera.far = 100;
        this.sunLight.position.set(-15, 10, -10);
        this.scene.add(this.sunLight);

        // this.helper = new THREE.DirectionalLightHelper(this.sunLight);
        // this.scene.add(this.helper);
    }

    setSunlight2() {
        this.sunLight2 = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight2.castShadow = true;
        this.sunLight2.shadow.mapSize.set(1024, 1024);
        this.sunLight2.shadow.normalBias = 1;
        // this.sunLight2.shadow.camera.left = -100;
        // this.sunLight2.shadow.camera.right = 100;
        // this.sunLight2.shadow.camera.top = 100;
        // this.sunLight2.shadow.camera.bottom = -100;
        // this.sunLight2.shadow.camera.near = -100;
        // this.sunLight2.shadow.camera.far = 100;
         this.sunLight2.position.set(-15, -50, -10);
        this.scene.add(this.sunLight2);

        // this.helper2 = new THREE.DirectionalLightHelper(this.sunLight2);
        // this.scene.add(this.helper2);
    }

    setRealLight() {
        this.realLight = new THREE.HemisphereLight(0xffffff, 0x555555, 1, 5);

        this.scene.add(this.realLight);
    }

    resize() {}

    update() {}
}
