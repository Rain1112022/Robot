import { logic } from "blockly/blocks";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
export default class jointBase3d {
    constructor(canvas) {
        this.gui = new dat.GUI();
        this.gui.hide();
        this.canvas = canvas
        this.sizes = {}
        this.camera = null
        this.renderer = null
        this.B1 = null
        this.B2 = null
        this.J1 = null
        this.J2 = null
        this.J3 = null
        this.J4 = null
        this.J5 = null
        this.J6 = null
        this.A1 = null
        this.A2 = null
        this.T1 = null
       
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.previousTime = 0;
        this.initWindowSizes()
        this.initcamera()
        this.inLights()
        this.initHelper()
        this.initControls()
        this.initModel()
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
            100,
            this.sizes.width / this.sizes.height,
            1,
            10000
        );
        camera.position.set(0, 1000, 300);
        // camera.lookAt(camera.position);
        camera.up = new THREE.Vector3(0, 0, 1)
        this.scene.add(camera);
        this.camera = camera;
    }

    inLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 25;
        directionalLight.shadow.camera.left = -7;
        directionalLight.shadow.camera.top = 7;
        directionalLight.shadow.camera.right = 7;
        directionalLight.shadow.camera.bottom = -7;
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        // console.log(ambientLight, directionalLight);
    }

    initHelper() {
        const axes = new THREE.AxesHelper(2000);
        this.scene.add(axes);
        //坐标格尺寸 ,坐标格细分次数,中线颜色设置， 参数值是Three.js颜色对象THREE.Color,THREE.Color默认值0x444444,坐标格网格线颜色设置， 参数值是Three.js颜色对象THREE.Color,THREE.Color默认值 0x888888
        const gridHelper = new THREE.GridHelper(5000, 100);
        gridHelper.rotation.x = Math.PI / 2
        this.scene.add(gridHelper);
    }

    initControls() {
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        // controls.enableRotate = false; 
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.maxPolarAngle = Math.PI / 3;
        controls.minPolarAngle = Math.PI / 3;
        controls.maxDistance = 1500
        controls.minDistance = 1000
        this.controls = controls;
    }

    setControlsEnabled(enabled) {
        this.controls.enabled = enabled
    }

    // 初始化模型
    initModel() {
        const stlLoader = new STLLoader();
        var self = this;
        //TB6-R10-RevA1 - base_link-1.STL
        stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - base_link-1.STL', stl => {
            //   console.log("基底stl", stl);
            const material = new THREE.MeshPhongMaterial({ color: '#505050' });
            self.B1 = new THREE.Mesh(stl.center(), material);
            self.B1.scale.set(0.5, 0.5, 0.5,)
            self.B1.rotation.set(0, 0, - Math.PI / 4, )
            self.scene.add(self.B1);

            stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link1-1.STL', stl => {
                //   console.log("link1-1", stl);
                const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                self.J1 = new THREE.Mesh(stl.center(), material);
                self.J1.position.set(-15, 0, 125)
                self.B1.add(self.J1);

                stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link2-1 J2_RJSII-32-1.STL', stl => {
                    //   console.log("link2-1_J2", stl);
                    const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                    self.J2 = new THREE.Mesh(stl.center(), material);
                    self.J2.position.set(-180, 0, 10)
                    self.J1.add(self.J2);

                    stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link2-1 B1-1.STL', stl => {
                        // console.log("link2-1_B1-1", stl);
                        const material = new THREE.MeshPhongMaterial({ color: '#505050' });
                        self.A1 = new THREE.Mesh(stl.center(), material);
                        self.A1.position.set(0, 0, 330)
                        self.J2.add(self.A1);

                        stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link2-1 J3_RJSII-25-1.STL', stl => {
                            // console.log("link2-1_J3", stl);
                            const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                            self.J3 = new THREE.Mesh(stl.center(), material);
                            self.J3.position.set(0, 0, 305)
                            // console.log("self.J3,", self.J3 );
                            self.A1.add(self.J3);

                            self.B2 = new THREE.Mesh(
                                new THREE.SphereGeometry(5, 16, 16),
                                new THREE.MeshStandardMaterial({
                                    color: "#E45826",
                                })
                            );
                            self.B2.position.set(80, 0,10)
                            self.J3.add(self.B2);

                            stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link3-1 B2-1.STL', stl => {
                                // console.log("link3-1_B2", stl);
                                const material = new THREE.MeshPhongMaterial({ color: '#505050' });
                                self.A2 = new THREE.Mesh(stl.center(), material);
                                self.A2.position.set(52, 0, 215)
                                // console.log("self.A2,", self.A2 );
                                self.B2.add(self.A2);

                                stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link3-1 J4_RJII-17-1.STL', stl => {
                                    // console.log("link3-1_J4", stl);
                                    const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                                    self.J4 = new THREE.Mesh(stl.center(), material);
                                    self.J4.position.set(10, 0, 320)
                                    self.A2.add(self.J4);

                                    stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link4-1.STL', stl => {
                                        // console.log("link4-1", stl);
                                        const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                                        self.J5 = new THREE.Mesh(stl.center(), material);
                                        self.J5.position.set(-120, 0, 0)
                                        self.J4.add(self.J5);

                                        stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link5-1.STL', stl => {
                                            // console.log("link5-1", stl);
                                            const material = new THREE.MeshPhongMaterial({ color: '#E45826' });
                                            self.J6 = new THREE.Mesh(stl.center(), material);
                                            self.J6.position.set(0, 0, 120)
                                            self.J5.add(self.J6);

                                            stlLoader.load('/static/robot_taike_model/robot_taike10_stl_component/TB6-R10-RevA1 - link6-1.STL', stl => {
                                                // console.log("link6-1", stl);
                                                const material = new THREE.MeshPhongMaterial({ color: '#505050' });
                                                self.T1 = new THREE.Mesh(stl.center(), material);
                                                self.T1.position.set(-90, 0, 0)
                                                self.J6.add(self.T1);
                                            })
                                        })
                                    })
                                })
                            })
                        })

                    })

                })
            })

        })

    }
    //角度 转 弧度 THREE.MathUtils.degToRad(deg)
    //弧度 转 角度 THREE.MathUtils.radToDeg (rad)
    setRobotRotation(clickStep, name, direction) {
        // console.log("clickStep, name, direction", clickStep, name, direction); 
        if (typeof clickStep === 'number') { 
            this[name].rotation[direction] = direction == 'x' ?  this[name].rotation[direction] - THREE.MathUtils.degToRad(clickStep) : this[name].rotation[direction] + THREE.MathUtils.degToRad(clickStep)
            // console.log(THREE.MathUtils.radToDeg (this[name].rotation[direction]));
        } else if (Array.isArray(clickStep)) {
            clickStep.forEach((item) => {
                this[item.joint].rotation[item.direction] = item.direction == 'x' ?  this[item.joint].rotation[item.direction] - item.num * THREE.MathUtils.degToRad(1) : this[item.joint].rotation[item.direction] + item.num * THREE.MathUtils.degToRad(1)
            })
        }
        
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xcfcfcf, 1)
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // this.renderer.setClearColor("#fff");
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