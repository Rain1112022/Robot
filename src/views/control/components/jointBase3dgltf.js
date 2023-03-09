import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class jointBase3d3 {
    constructor(canvas) {
        this.gui = new dat.GUI();
        this.gui.hide();
        this.canvas = canvas
        this.sizes = {}
        this.camera = null
        this.renderer = null
        this.D1 = null
        this.D2 = null
        this.B1 = null
        this.itemArr = []
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.group = new THREE.Group()
        this.group1 = new THREE.Group()
        this.group2 = new THREE.Group()
        this.group3= new THREE.Group()
        this.group4 = new THREE.Group()
        this.group5 = new THREE.Group()
        this.group6 = new THREE.Group()
        this.group7 = new THREE.Group()
        this.group8 = new THREE.Group()
        this.group9 = new THREE.Group()
        this.group10 = new THREE.Group()
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
        camera.position.set(0, 700, 200);
        // camera.lookAt(camera.position);
        camera.up = new THREE.Vector3(0,0,1) 
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
        const gridHelper = new THREE.GridHelper(5000, 100);
        gridHelper.rotation.x = Math.PI / 2
        this.scene.add(gridHelper);
    }

    initControls() {
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.enableDamping = true;
        this.controls = controls;
    }

    setControlsEnabled(enabled) {
        this.controls.enabled = enabled
    }

    // 初始化模型
  initModel() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/static/output/TB6-R10-RevA1.glb', glb => {
      // console.log("基底glb", glb);
    //   this.scene.add(glb.scene)
      const children = [...glb.scene.children[0].children]
      this.itemArr = [{
        itemName:'________35937',
        jointName:'底座',
        
      },{
        itemName:'________59467',
        jointName:'关节一',
        sequence: 1,
      },{
        itemName:'________93159',
        jointName:'关节二',
        sequence: 2,
      },{
        itemName:'________93365',
        jointName:'臂1'
      },{
        itemName:'________97393',
        jointName:'关节三',
        sequence: 3,
      },{
        itemName:'________98795',
        jointName:'臂2'
      },{
        itemName:'________104883',
        jointName:'关节四',
        sequence: 4,
      },{
        itemName:'________124705',
        jointName:'关节五',
        sequence: 5,
      },{
        itemName:'________144265',
        jointName:'关节六',
        sequence: 6,
      },{
        itemName:'________222109',
        jointName:'末端',
        sequence: 7,
      },]
      // console.log(children);
      // this.group1.add(children[9])
      // this.group2.add(children[8])
      // this.group3.add(children[7])
      // this.group4.add(children[6])
      // this.group5.add(children[5])
      // this.group6.add(children[4])
      // this.group7.add(children[3])
      // this.group8.add(children[2])
      // this.group9.add(children[1])
      // this.group10.add(children[0])
      this.group1.add(children[0])
      this.group2.add(children[1])
      this.group3.add(children[2])
      this.group4.add(children[3])
      this.group5.add(children[4])
      this.group6.add(children[5])
      this.group7.add(children[6])
      this.group8.add(children[7])
      this.group9.add(children[8])
      this.group10.add(children[9])
      // console.log(this.group1);
      // console.log(this.group2);
      // console.log(this.group3);
      // console.log(this.group4);
      // console.log(this.group5);
      // console.log(this.group6);
      // console.log(this.group7);
      // console.log(this.group8);
      // console.log(this.group9);
      // console.log(this.group10);

      this.group9.add(this.group10)
      this.group8.add(this.group9)
      this.group7.add(this.group8)
      this.group6.add(this.group7)
      this.group5.add(this.group6)
      this.group4.add(this.group5)
      this.group3.add(this.group4)
      this.group2.add(this.group3)
      this.group1.add(this.group2)
      this.group.add(this.group1)


      //  for(const child of children){
      //   console.log(child);

      //   this.group.add(child)
      // }

      this.group.scale.set(0.5,0.5,0.5)
      this.group.position.set(0, 0, -200,)
      this.group2.position.set(0, 0, -200,)
      this.group3.position.set(0, 0, 200,)

      this.group.rotation.x =  Math.PI ;
      this.group.rotation.z =   Math.PI / 2 ;
      this.scene.add(this.group)
    //  console.log(this.group);
    })
   
  }
  setRobotRotation(rotation, name, direction) {
    // console.log("rotation, name, direction", rotation, name, direction); // 1 D1 y
   
    this.group3.rotation.y = rotation*(Math.PI / 180) * 10
    // this.group3.rotateX = rotation*(Math.PI / 180) * 30
    const tempItem = this.itemArr.find((item) => item.jointName == name)
    // console.log(tempItem)
    // if(tempItem.sequence) {
    //   this.itemArr.forEach(ele => {
    //     if(ele.sequence >=tempItem.sequence) {
    //       this.group.children.forEach((child) => {
    //         if(child.name == ele.itemName){
    //           // console.log(child)
    //           child.rotation[direction] = rotation*(Math.PI / 180) * 10
    //         }
    //       })
    //     }
    //   });



      
    // }

   
        // console.log(this.group);
       
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
        //Update controls
        this.controls.update();

        // Render
        this.renderer.render(this.scene, this.camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(() => {
            this.initAnimateTick()
        });
    }
}