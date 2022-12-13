import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
        this.test();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            // 모든 자식 요소를 찾아 모두에게 그림자 세팅을 해줌.
            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
        });

        // 3D 요소를 씬에 추가
        this.scene.add(this.actualRoom);
        // 요소 확대 축소
        this.actualRoom.scale.set(10, 10, 10);
        // this.actualRoom.rotation.y = Math.LN10;
        // 애니메이션 축 위치 조절
        this.actualRoom.position.x = 2;
        this.actualRoom.position.y = -14;
    }

    // 애니메이션 세팅
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[1]);
        this.swim.play();

        // 애니메이션 배열 위치 확인 콘솔
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.01;
        });
    }

    test() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            // 모든 자식 요소를 찾아 모두에게 그림자 세팅
            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
            if (child.name === "큐브003") {
                // 진짜 대체 클릭 이벤트 어떻게 하는 겁니까 대체 정말 진심으로다가 모르겠습니다. 하루 버렸어요. 살려주세요 plz
            }
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

        this.actualRoom.rotation.y = this.lerp.current;
        // 애니메이션 업데이트 (마지막 델타 옆 숫자는 애니메이션 속도를 조절할 수 있다.)
        this.mixer.update(this.time.delta * 0.0008);
    }
}
