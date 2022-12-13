import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
        this.setSunlight2();
        this.setSunlight3();
        this.setRealLight();
        this.setAmbientLight();
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 8);
        this.scene.add(this.ambientLight);
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#aaaaaa", 10);
        // this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.set(2000, 2000);
        this.sunLight.shadow.normalBias = 1;
        this.sunLight.shadow.camera.left = -50;
        this.sunLight.shadow.camera.right = 50;
        this.sunLight.shadow.camera.top = 50;
        this.sunLight.shadow.camera.bottom = -50;
        this.sunLight.shadow.camera.near = -100;
        this.sunLight.shadow.camera.far = 100;
        this.sunLight.position.set(-15, 10, -20);
        this.scene.add(this.sunLight);
    }

    setSunlight2() {
        this.sunLight2 = new THREE.DirectionalLight("#aaaaaa", 7);
        this.sunLight2.castShadow = true;
        this.sunLight2.shadow.mapSize.set(1024, 1024);
        this.sunLight2.shadow.normalBias = 1;
        this.sunLight2.position.set(-15, -50, -10);
        this.scene.add(this.sunLight2);

    }

    setSunlight3() {
        this.sunLight2 = new THREE.DirectionalLight("#aaaaaa", 10);
        this.sunLight2.castShadow = true;
        this.sunLight2.shadow.mapSize.set(1024, 1024);
        this.sunLight2.shadow.normalBias = 10;
        this.sunLight2.position.set(50, -20, 30);
        this.scene.add(this.sunLight2);
    }

    setRealLight() {
        this.realLight = new THREE.HemisphereLight(0x999999, 5);

        this.scene.add(this.realLight);
    }

    resize() {}

    update() {}
}
