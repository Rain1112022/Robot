import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class gridHelper {
    constructor(canvas) {
        this.canvas = canvas
        this.sizes = {}
        this.camera = null
        this.renderer = null
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.previousTime = 0;
        this.initWindowSizes()
        this.initcamera()
        this.initHelper()
        this.initControls()
        this.initRenderer()
        this.initAnimateTick()
    }

    initWindowSizes() {
        const sizes = {
            width: this.canvas.parentNode.clientWidth,
            height: this.canvas.parentNode.clientHeight,
        };

        window.addEventListener("resize", () => {
            // Update sizes
            sizes.width = this.canvas.parentNode.clientWidth;
            sizes.height = this.canvas.parentNode.clientHeight;
            // 手动更新相机的投影矩阵
            this.camera.aspect = sizes.width / sizes.height;
            this.camera.updateProjectionMatrix();

            // Update renderer设置设备的像素比
            this.renderer.setSize(sizes.width, sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        this.sizes = sizes;
    }

    initcamera() {
        const camera = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        camera.position.set(0, 5, 10);
        this.scene.add(camera);
        this.camera = camera;
    }

    initHelper() {
        //坐标格尺寸 ,坐标格细分次数,中线颜色设置， 参数值是Three.js颜色对象THREE.Color,THREE.Color默认值0x444444,坐标格网格线颜色设置， 参数值是Three.js颜色对象THREE.Color,THREE.Color默认值 0x888888
        const gridHelper = new THREE.GridHelper(100, 50,'#D8D8D8','#D8D8D8');
        this.scene.add(gridHelper);
    }

    initControls() {
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.enableDamping = true;
        this.controls = controls;
        this.controls.enabled = false
    }
   
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.setClearColor(0xcfcfcf, 1)
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor("#fff");
    }

    initAnimateTick() {
        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(() => {
            this.initAnimateTick()
        });
    }
}