<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-06-20 17:00:32
 * @LastEditors: 杭
 * @LastEditTime: 2023-07-05 15:05:27
-->
<!-- 文物demo -->
<template>
  <div>
    <div ref="container" id="container"></div>
    <div id="loadbar">
      <span id="bar"></span>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default {
  name: "YourComponentName",
  data() {
    return {
      tex: `${process.env.BASE_URL}m_obj/0008702.jpg`,
      mesh: `${process.env.BASE_URL}m_obj/m.obj`,
      controls: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 创建场景
      const scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 250;
      scene.add(camera);

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight - 50);
      renderer.setClearColor(0x3f3f3f, 1);
      this.$refs.container.appendChild(renderer.domElement);

      // 创建光源
      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      // 加载贴图
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(this.tex);

      // 加载OBJ模型
      const objLoader = new OBJLoader();
      objLoader.load(
        this.mesh,
        (object) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshPhongMaterial({
                map: texture,
                shininess: 1000,
              });
            }
          });
          scene.add(object);
          animate();
        },
        (xhr) => {
          // 加载进度条
          if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log("Loading progress: " + percentComplete + "%");
            // 更新进度条显示
            document.getElementById("bar").style.width = percentComplete + "%";
            document.getElementById("bar").innerHTML =
              Math.round(percentComplete) + "%";
            if (percentComplete === 100) {
              setTimeout(function () {
                document.getElementById("loadbar").style.display = "none";
                document.getElementById("bar").style.display = "none";
              }, 500);
            }
          }
        },
        (error) => {
          console.error("Error loading OBJ model:", error);
        }
      );

      // 创建控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 200;
      controls.maxDistance = 2000;

      // 渲染场景
      const renderScene = () => {
        renderer.render(scene, camera);
      };

      // 动画循环
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // 更新控制器
        renderScene();
      };

      animate();

      window.addEventListener(
        "resize",
        () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
          renderScene();
        },
        false
      );
    },
  },
};
</script>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
}

#loadbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
}

#bar {
  display: block;
  width: 0;
  height: 100%;
  background: #4caf50;
}
</style>
