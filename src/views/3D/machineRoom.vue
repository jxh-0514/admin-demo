<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-06-25 17:22:02
 * @LastEditors: 杭
 * @LastEditTime: 2023-07-03 22:29:05
-->
<template>
  <div id="container" @mousemove="mouseMove"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  data() {
    return {
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      animationId: null,
      public: process.env.BASE_URL,
      maps: null,
      cabinets: [], //机柜集合
      curCabinet: "", // 鼠标划入的机柜
    };
  },
  beforeDestroy() {
    // 停止动画循环
    cancelAnimationFrame(this.animationId);
  },
  mounted() {
    this.maps = new Map();
    this.crtTexture(`cabinet-hover.jpg`); // 为maps添加机柜高亮贴图,鼠标滑过将贴图更换为高亮贴图
    this.init();
    // this.animate();
  },
  methods: {
    init() {
      this.createScene();
      this.loadGLTF();
      this.createCamera();
      this.createRender();
      this.createControls();
      this.render();
    },
    /**
     * @description: 创建场景
     * @return {*}
     * @author: 杭
     */
    createScene() {
      this.scene = new THREE.Scene();
    },
    /**
     * @description: 加载模型
     * @return {*}
     * @author: 杭
     */
    loadGLTF() {
      const loader = new GLTFLoader();
      loader.load(
        `${this.public}models_room/machineRoom.gltf`,
        ({ scene: { children } }) => {
          console.log("children", ...children);

          // 修改Mesh对象材质
          children.forEach((obj) => {
            const { map, color } = obj.material;
            this.changeMat(obj, map, color);
            if (obj.name.includes("cabinet")) {
              this.cabinets.push(obj);
            }
          });

          this.scene.add(...children);
        }
      );
    },
    /**
     * @description: 创建光源
     * @return {*}
     * @author: 杭
     */
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); //创建环境光
      this.scene.add(ambientLight); // 将环境光添加到场景

      const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
      spotLight.position.set(150, 150, 150);
      spotLight.castShadow = true;
      this.scene.add(spotLight);
    },
    /**
     * @description: 创建相机
     * @return {*}
     * @author: 杭
     */
    createCamera() {
      const element = document.getElementById("container");
      const width = element.clientWidth; // 窗口宽度
      const height = element.clientHeight; // 窗口高度
      const k = width / height; // 窗口宽高比

      this.camera = new THREE.PerspectiveCamera(45, k, 0.1, 1000);
      this.camera.position.set(0, 10, 15); // 设置相机位置
      this.camera.lookAt(0, 0, 0); // 设置相机方向
      this.scene.add(this.camera);
    },
    /**
     * @description: 创建渲染器
     * @return {*}
     * @author: 杭
     */
    createRender() {
      const element = document.getElementById("container");
      this.renderer = new THREE.WebGL1Renderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染器区域尺寸
      // this.renderer.shadowMap.enabled = true // 显示阴影
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.setClearColor(0x3f3f3f, 1); // 设置背景颜色
      element.appendChild(this.renderer.domElement);
    },
    /**
     * @description: 创建控件对象
     * @return {*}
     * @author: 杭
     */
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    /**
     * @description: 渲染
     * @return {*}
     * @author: 杭
     */
    render() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
    /**
     * @description: 修改材质
     * @param {*} obj
     * @param {*} map
     * @param {*} color
     * @return {*}
     * @author: 杭
     */
    changeMat(obj, map, color) {
      //若Mesh模型有贴图，就为其换一个材质和贴图；否则，就换一个材质,并继承原GLTF 模型颜色
      if (map) {
        obj.material = new THREE.MeshBasicMaterial({
          map: this.crtTexture(map.name),
        });
      } else {
        obj.material = new THREE.MeshBasicMaterial({ color });
      }
    },
    /**
     * @description: 添加建立纹理对象
     * @param {*} imgName
     * @return {*}
     * @author: 杭
     */
    crtTexture(imgName) {
      let curTexture = this.maps.get(imgName);
      if (!curTexture) {
        curTexture = new THREE.TextureLoader().load(
          `${this.public}models_room/${imgName}`
        );
        curTexture.flipY = false;
        curTexture.wrapS = 1000;
        curTexture.wrapT = 1000;
        this.maps.set(imgName, curTexture);
      }
      return curTexture;
    },
    /**
     * @description: 建立射线投射器，一个二维点，避免在鼠标选择机柜时重复实例化
     * @param {*} x
     * @param {*} y
     * @return {*}
     * @author: 杭
     */
    selectCabinet(x, y) {
      const { cabinets, renderer, camera, maps, curCabinet } = this;
      const { width, height } = renderer.domElement;
      // 射线投射器，可基于鼠标点和相机，在世界坐标系内建立一条射线，用于选中模型
      const raycaster = new THREE.Raycaster();
      // 鼠标在裁剪空间中的点位
      const pointer = new THREE.Vector2();

      // 鼠标的canvas坐标转裁剪坐标
      pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
      // 基于鼠标点的裁剪坐标和相机设置射线投射器
      raycaster.setFromCamera(pointer, camera);
      // 选择机柜
      const intersect = raycaster.intersectObjects(cabinets)[0];
      let intersectObj = intersect ? intersect.object : null;
      // 若之前已有机柜被选择，且不等于当前所选择的机柜，取消之前选择的机柜的高亮
      if (curCabinet && curCabinet !== intersectObj) {
        const material = curCabinet.material;
        material.setValues({
          map: maps.get("cabinet.jpg"),
        });
      }
      // 若当前所选对象不为空：触发鼠标在机柜上移动的事件。若当前所选对象不等于上一次所选对象：更新curCabinet。将模型高亮。触发鼠标划入机柜事件。否则若上一次所选对象存在：置空curCabinet。 触发鼠标划出机柜事件。
      if (intersectObj) {
        this.onMouseMoveCabinet(x, y);
        if (intersectObj !== curCabinet) {
          this.curCabinet = intersectObj;
          const material = intersectObj.material;
          material.setValues({
            map: maps.get("cabinet-hover.jpg"),
          });
          this.onMouseOverCabinet(intersectObj);
        }
      } else if (curCabinet) {
        this.curCabinet = null;
        this.onMouseOutCabinet();
      }
    },
    /**
     * @description: 鼠标移动事件
     * @param {*} clientX
     * @param {*} clientY
     * @return {*}
     * @author: 杭
     */
    mouseMove({ clientX, clientY }) {
      this.selectCabinet(clientX, clientY);
    },
    //鼠标划入机柜事件，参数为机柜对象
    onMouseOverCabinet(cabinet) {
      console.log(cabinet);
    },
    //鼠标在机柜上移动的事件，参数为鼠标在canvas画布上的坐标位
    onMouseMoveCabinet(x, y) {
      console.log(x, y);
    },
    //鼠标划出机柜的事件
    onMouseOutCabinet() {},
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      console.log(this.animate, "132");
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
      renderer.render(scene, camera);
    },
  },
};
</script>
<style scoped>
#container {
  width: 100vw;
  height: calc(100vh - 50px);
}
</style>
