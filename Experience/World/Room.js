import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
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
        });
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(11, 11, 11);
        this.actualRoom.position.x = -3;
        this.actualRoom.position.y = -14;
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();


    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.01;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

        this.actualRoom.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.0005);
    }
}
