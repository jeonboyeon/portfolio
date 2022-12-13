import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        // 펄스펙티브 카메라
        this.createPerspectiveCamera();
        // 오쏘그래픽 카메라
        this.createOrthographicCamera();
        // 마우스 컨트롤
        this.setOrbitControls();
        // console.log(this.sizes, this.scene, this.canvas);
    }

    // 펄스펙티브 카메라 설정
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.5, 1000);

        this.scene.add(this.perspectiveCamera);

        this.perspectiveCamera.position.z = -80;
        this.perspectiveCamera.position.y = 5;
        this.perspectiveCamera.position.x = -45;
        this.perspectiveCamera.zoom = 1.5;
        this.perspectiveCamera.updateProjectionMatrix();

    }
    // 오쏘그래픽 카메라 설정
    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        );

        this.scene.add(this.orthographicCamera);
    }

    // 마우스 컨트롤
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = false;
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.aspect = this.sizes.aspect;
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
