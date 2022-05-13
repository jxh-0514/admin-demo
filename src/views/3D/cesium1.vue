<template>
  <!-- <div> -->
    <!-- <div id="map">

    </div> -->
    <div class="viewer">
    <vc-viewer @ready="ready">
      <vc-entity :position="position1" :description="description" :model.sync="model1" :label.sync="label1">
        <vc-graphics-label ref="label" text="Hello Vue Cesium" font="20px sans-serif"></vc-graphics-label>
        <vc-graphics-model ref="model" :uri="uri1"></vc-graphics-model>
      </vc-entity>
    </vc-viewer>
  </div>
  <!-- </div> -->
</template>

<script>
// import * as Cesium from 'cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';
// import * as Cesium from "cesium/Build/Cesium/Cesium.js";
// import * as widgets from "cesium/Build/Cesium/Widgets/widgets.css";
import VueCesium from 'vue-cesium'
export default {
    name: 'Cesium1',
    data() {
        return {
            description: 'Hello Vue Cesium',
            model1: {},
            label1: {},
            position1: { lng: 114.0, lat: 40.0, height: 1.0 },
            uri1: `${process.env.BASE_URL}skull_downloadable/scene.gltf`
            // uri1: `${process.env.BASE_URL}glb/Soldier.glb`
        }
    },
    mounted() {
        this.mapInit();
        Promise.all([this.$refs.label.createPromise, this.$refs.model.createPromise]).then((instances) => {
        instances[0].viewer.zoomTo(instances[0].viewer.entities)
      })
    },
    methods: {
         ready(cesiumInstance) {
            const { Cesium, viewer } = cesiumInstance
        },
        mapInit() {
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZlM2I0MS0wMGI0LTQ0NjUtOTZjNy01NWZlYjhmMzU4ODciLCJpZCI6ODkyMjcsImlhdCI6MTY0OTY2ODA2MX0.Y5Bz32xq7WtR_CNH6sdrfbEhEzlsSktGhSRtbR9MLjc';
            // const viewer = new Cesium.Viewer('map')
            // const numberOfBalloons = 13;
            // const lonIncrement = 0.00025;
            // const initialLon = -122.99875;
            // const lat = 44.0503706;
            // const height = 100;
            // const url = `${process.env.BASE_URL}glb/Soldier.glb`;
            // for (let i = 0; i < numberOfBalloons; ++i) {
            //     let lon = initialLon + i * lonIncrement;
            //     createModel(url, lon, lat, height);
            // }
            // const target = Cesium.Cartesian3.fromDegrees(initialLon + lonIncrement, lat, height + 7.5);
            // const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245, 4.352023653686047);
            // viewer.scene.camera.lookAt(target, offset);
            // function createModel(url, x, y, height) {
            //     const position = Cesium.Cartesian3.fromDegrees(x, y, height);
            //     viewer.entities.add({
            //     name : url,
            //     position : position,
            //     model : {
            //         uri : url
            //     }
            //     });
            // }
            //
        }
    }
}
</script>

<style>
.viewer {
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>