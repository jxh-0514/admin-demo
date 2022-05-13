<template>
  <div>
    <el-dialog
      title="定位设置"
      :visible.sync="mapVisible"
      :before-close="close"
      id="mapDialog"
      width="65%"
      top="8vh"
      :close-on-click-modal="false"
    >
      <div>
        <el-select
          class="select"
          v-model="search"
          filterable
          remote
          clearable
          reserve-keyword
          @clear="clearSearch"
          placeholder="请输入地址"
          :remote-method="mapNameChange"
          @change="mapNameChange($event, 'change')"
          :loading="loading"
          style="width: 100%;"
        >
          <el-option
            v-for="item in searchOption"
            :key="item.title"
            :label="item.title"
            :value="item.title"
          >
          </el-option>
        </el-select>
      </div>
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :scroll-wheel-zoom="true"
        @click="clickEvent"
        ak="33B192o1jPaqOHASGGAIkoMuwi8W76j3"
      >
        <!-- 地图控件位置 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <!-- 城市列表 -->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <!-- 定位当前位置 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
          @locationSuccess="getLoctionSuccess"
        ></bm-geolocation>
        <!-- 地图容器 -->
        <bm-view
          :style="{
            width: '100%',
            height: this.clientHeight + 'px',
            flex: 1,
            marginBottom: '-30px'
          }"
        ></bm-view>
      </baidu-map>
      <div class="demo-input-suffix">
        <el-link type="info">lng：</el-link
        ><el-input
          class="lineinput"
          style="width:100px"
          size="mini"
          v-model.number="locData.longitude"
        ></el-input>
        <el-link type="info">lat：</el-link
        ><el-input
          class="lineinput"
          style="width:100px"
          size="mini"
          v-model.number="locData.latitude"
        ></el-input>
        <el-link type="info">地址：</el-link
        ><el-input
          class="lineinput"
          style="width:250px"
          size="mini"
          v-model="locData.address"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="warning"
          size="small"
          icon="el-icon-close"
          @click.native="close"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click.native="findlocation"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
let geoc = null;
import {
  BaiduMap,
  BmNavigation,
  BmView,
  BmGeolocation,
  BmCityList
} from "vue-baidu-map";
export default {
  name: "mapDialog",
  components: {
    BaiduMap,
    BmNavigation,
    BmView,
    BmGeolocation,
    BmCityList
  },
  props: {
    mapVisible: ""
  },
  data() {
    return {
      center: { lng: 120.592412, lat: 31.303565 },
      zoom: 12,
      locData: {
        longitude: "",
        latitude: "",
        address: ""
      },
      clientHeight: document.documentElement.clientHeight - 450, // 屏幕高度
      iconUrl:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1505732009,4176072429&fm=26&gp=0.jpg",
      search: "",
      searchOption: [],
      loading: false
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          console.log(r);
          _this.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
          _this.initLocation = true;
        },
        { enableHighAccuracy: true }
      );

      window.map = map;
    },
    //点击地图监听
    clickEvent(e) {
      map.clearOverlays();
      let Icon_0 = new BMap.Icon(
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1505732009,4176072429&fm=26&gp=0.jpg",
        new BMap.Size(64, 64),
        { anchor: new BMap.Size(18, 32), imageSize: new BMap.Size(36, 36) }
      );
      var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat), {
        icon: Icon_0
      });
      map.addOverlay(myMarker);
      //用所定位的经纬度查找所在地省市街道等信息
      var point = new BMap.Point(e.point.lng, e.point.lat);
      var gc = new BMap.Geocoder();
      let _this = this;
      gc.getLocation(point, function(rs) {
        var addComp = rs.addressComponents;
        //console.log(rs.address);//地址信息
        _this.locData.address = rs.address;
      });
      this.locData.longitude = e.point.lng;
      this.locData.latitude = e.point.lat;
    },
    //定位成功回调
    getLoctionSuccess(point, AddressComponent, marker) {
      map.clearOverlays();
      let Icon_0 = new BMap.Icon(
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1505732009,4176072429&fm=26&gp=0.jpg",
        new BMap.Size(64, 64),
        { anchor: new BMap.Size(18, 32), imageSize: new BMap.Size(36, 36) }
      );
      var myMarker = new BMap.Marker(
        new BMap.Point(point.point.lng, point.point.lat),
        { icon: Icon_0 }
      );
      map.addOverlay(myMarker);
      this.locData.longitude = point.point.lng;
      this.locData.latitude = point.point.lat;
    },
    //2022.5.13----新增unique() 数组过滤方法  防止搜索结果有重复数据
    unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.title) && res.set(arr.title, 1));
    },
    mapNameChange(e, data) {
      this.loading = true;
      if (!e && !this.search) {
        return false;
      }
      let that = this,
        point,
        marker = null;
      geoc = new BMap.Geocoder();
      let local = new BMap.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: res => {
          this.loading = false;
          console.log('res', res);
          if (res) {
            if (data !== "change") {
              // that.searchOption = res.Kr;
              that.searchOption = this.unique(res.Kr);
            }
            if (res.Kr.length > 0) {
              that.$set(that.locData, "longitude", res.Kr[0].point.lng);
              that.$set(that.locData, "latitude", res.Kr[0].point.lat);
            }
          }
          if (local.getResults() != undefined) {
            map.clearOverlays(); //清除地图上所有覆盖物
            if (local.getResults().getPoi(0)) {
              point = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
              map.centerAndZoom(point, 10);
              marker = new BMap.Marker(point); // 创建标注
              map.addOverlay(marker); // 将标注添加到地图中
              marker.enableDragging(); // 可拖拽
              geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                that.$set(
                  that.locData,
                  "address",
                  addComp.province +
                    addComp.city +
                    addComp.district +
                    addComp.street +
                    addComp.streetNumber
                );
              });
            } else {
              this.$message("未匹配到地点!可拖动地图上的红色图标到精确位置");
            }
          } else {
            this.$message("未找到搜索结果");
          }
        }
      });
      local.search(e || this.search);
    },
    findlocation() {
      this.$emit("mapLocationSave", this.locData);
      this.$emit("mapLocationClose");
    },
    clearSearch() {
      this.loading = false;
    },
    close() {
      this.$emit("mapLocationClose");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map {
  margin-top: 5px;
}
.demo-input-suffix {
  width: 100%;
  margin-top: 40px;
}
.BMap_bubble_title a {
  /* 隐藏搜索结果的详情按钮 */
  display: none;
}
.anchorBL {
  display: none;
} /* 去除百度地图左下角的介绍文字 */
</style>
