<template>
  <div>
    <div id="demo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mesh: null,

      renderer: null,

      scene: null,

      camera: null,
    };
  },

  mounted() {
    this.init();
    // this.line();
  },

  methods: {
    init() {
      // 创建场景

      this.scene = new THREE.Scene(); // 创建相机（第一个参数视野夹角0~180°，第二参数相机大小，第三，四参数可看像素）

      this.camera = new THREE.PerspectiveCamera(
        75,

        window.innerWidth / window.innerHeight,

        1,

        1000
      ); // 创建渲染器

      this.renderer = new THREE.WebGLRenderer(); // 设置渲染器大小

      this.renderer.setSize(window.innerWidth, window.innerHeight); // 拿到dom

      let demo = document.getElementById("demo"); // 把渲染器放到dom中

      demo.appendChild(this.renderer.domElement); // 创建一个立方体(长，宽，高)

      let geometry = new THREE.BoxGeometry(10, 10, 10); // 创建材料(定义立方体由这个材料组成)

      let material = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
      }); // 创建网格(合并立方体和材料)

      this.mesh = new THREE.Mesh(geometry, material); // 将网格放入场景中

      this.scene.add(this.mesh); // 因默认情况相机与场景重合，需要先设定相机位置

      this.camera.position.z = 50;

      this.camera.position.y = 0; // 用渲染器渲染场景，相机

      this.renderer.render(this.scene, this.camera);

      this.animate();
    }, // 定义3D效果
    line() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        demo.appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        this.camera.position.set( 0, 0, 100 );
        this.camera.lookAt( 0, 0, 0 );

        this.scene = new THREE.Scene();
        //create a blue LineBasicMaterial
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const points = [];
        points.push( new THREE.Vector3( - 10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );

        this.scene.add( line );
        this.renderer.render( this.scene, this.camera );
    },

    animate() {
      // 执行动画函数，执行完上一帧在执行下一帧

      requestAnimationFrame(this.animate);

      this.mesh.rotation.x += 0.05; // this.mesh.rotation.y += 0.05;

      this.mesh.rotateY(0.01);

      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style>

body{
margin:0;
overflow: hidden;
/* 隐藏body窗口区域滚动条 */
}
</style>
