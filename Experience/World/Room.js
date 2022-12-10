import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel();
        this.setAnimation();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            if (child.name === "큐브014") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.6;
                child.material.color.set(0xd3e3ff);
                child.material.ior = 3;
                child.material.transmission = 1.1;
                child.material.opacity = 1;
            }
            if (child.name === "큐브013") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.6;
                child.material.color.set(0x7d8db2);
                child.material.ior = 3;
                child.material.transmission = 1.1;
                child.material.opacity = 1;
            }
            // if (child.name === "큐브002") {
            //     child.material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen,
            //     });
            // }
        });
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(10, 10, 10);
        // this.actualRoom.rotation.y = Math.LN10;
        this.actualRoom.position.x = -8;
        this.actualRoom.position.y = -17;
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();

        console.log(this.room.animations[0]);
    }

    resize() {}

    update() {
        this.mixer.update(this.time.delta * 0.0005);
    }
}
