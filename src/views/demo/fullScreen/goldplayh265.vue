<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-08-24 10:52:49
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-08 17:09:30
-->
<!-- goldplayh265     https://github.com/goldvideo/h265player   -->
<template>
    <div id="PlayerWrapper">
        <div class="play-container"></div>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: {},
    data() {
        return {
            publicPath: process.env.BASE_URL, //获取public静态文件
        };
    },

    computed: {},

    watch: {},

    destroyed() {},

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.initPlay();
    },

    methods: {
        initPlay() {
            const Config = {
                // get basePath() {
                //     let path = win.location.origin;
                //     let pathname = win.location.pathname;
                //     let demoIdx = pathname.lastIndexOf("/demo/");
                //     return path + pathname.substr(0, demoIdx);
                // },
                // get buildPath() {
                //     console.log("basePath------", this.publicPath, this.basePath, process.env.BASE_URL);
                //     return process.env.BASE_URL + "goldplayh265/";
                //     // return this.basePath + "/goldplayh265/";
                // },
                get libPath() {
                    // return this.buildPath + "lib/";
                    return window.location.origin + "/goldplayh265/lib/";
                },
                get src() {
                    return "https://uploads.codesandbox.io/uploads/user/0f72b6d6-22a6-42a9-953f-28918e45f1f0/ooso-playlist.m3u8";
                },
            };

            let el = document.querySelector(".play-container");
            let player = new GoldPlay(el, {
                sourceURL: Config.src,
                type: "HLS",
                libPath: Config.libPath,
                playBackRate: 1,
                controlBarAutoHide: true,
            });

            console.log("--------basePath------", this.publicPath, 'Config.libPath-------',Config.libPath);
        },
    },
};
</script>
<style lang="scss" scoped>
.play-container {
    width: 800px;
    height: 600px;
    /* background-color: #000; */
    margin: 20px 0 0 100px;
    float: left;
}

.inline {
    display: inline-block;
    width: 50px;
}

.play-container2 {
    width: 300px;
    height: 400px;
    background-color: red;
    margin: 20px 0 0 100px;
    float: left;
}
</style>
