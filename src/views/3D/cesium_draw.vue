<template>
  <div>
   <div id='map'></div>
   <cesium-draw ref='drawManager' :extendMarkerImage="images" :extendMarkerModel='model' ></cesium-draw>
 </div>
</template>
<script>
import cesiumDraw from 'cesium-draw'
//You can use theme
// import 'cesium-draw/dist/theme/dark.css'
import 'cesium-draw/dist/theme/default.css'
export default{
    name:'your-component',
    components:{cesiumDraw},
    data(){
        return {
            images:["./static/images/markers/1.png",
                "./static/images/markers/2.png",
                "./static/images/markers/3.png",
                "./static/images/markers/4.png",
                "./static/images/markers/5.png"
                ],
            model:[
                { id: "model0",
                name: "tower",
                url: `${process.env.BASE_URL}skull_downloadable/scene.gltf` },
                {
                id: "model1",
                name: "people",
                url: `${process.env.BASE_URL}glb/yiz.glb`
                }]
        }
    },    
    mounted(){
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZlM2I0MS0wMGI0LTQ0NjUtOTZjNy01NWZlYjhmMzU4ODciLCJpZCI6ODkyMjcsImlhdCI6MTY0OTY2ODA2MX0.Y5Bz32xq7WtR_CNH6sdrfbEhEzlsSktGhSRtbR9MLjc';
        const viewer=new Cesium.Viewer('map')
        this.$refs.drawManager.init(viewer)
    }
}
</script>