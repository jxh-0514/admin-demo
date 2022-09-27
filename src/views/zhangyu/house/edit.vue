<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>房源介绍</h3>
      <el-form ref="house" :rules="rules" :model="house" label-width="150px">
        <el-form-item label="房源ID" prop="id">
          <el-input v-model="house.id" disabled />
        </el-form-item>
        <el-form-item label="房源名称" prop="name">
          <el-input v-model="house.name" />
        </el-form-item>
        <el-form-item label="房源地址" prop="address">
          <el-input v-model="house.address" />
        </el-form-item>
        <el-form-item label="是否热卖" prop="isHot">
          <el-radio-group v-model="house.isHot">
            <el-radio :label="false">普通</el-radio>
            <el-radio :label="true">热卖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isRecommend">
          <el-radio-group v-model="house.isRecommend">
            <el-radio :label="true">推荐</el-radio>
            <el-radio :label="false">未推荐</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否优惠" prop="isPreferential">
          <el-radio-group v-model="house.isPreferential">
            <el-radio :label="true">优惠</el-radio>
            <el-radio :label="false">未优惠</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否上架" prop="isPutaway">
          <el-radio-group v-model="house.isPutaway">
            <el-radio :label="true">上架</el-radio>
            <el-radio :label="false">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="分享数量" prop="shareCount">
          <el-input v-model="house.shareCount" />
        </el-form-item>

        <el-form-item label="围观数量" prop="browseCount">
          <el-input v-model="house.browseCount" />
        </el-form-item>

        <el-form-item label="平均价格" prop="averagePrice">
          <el-input v-model="house.averagePrice" />
        </el-form-item>

        <el-form-item label="最低价" prop="minPrice">
          <el-input v-model="house.minPrice" />
        </el-form-item>

        <el-form-item label="最高价" prop="maxPrice">
          <el-input v-model="house.maxPrice" />
        </el-form-item>

        <el-form-item label="最小面积" prop="minArea">
          <el-input v-model="house.minArea" />
        </el-form-item>

        <el-form-item label="最大面积" prop="maxArea">
          <el-input v-model="house.maxArea" />
        </el-form-item>

        <el-form-item label="房型" prop="type">
          <el-input v-model="house.type" />
        </el-form-item>

        <el-form-item label="类别" prop="category">
          <el-input v-model="house.category" />
        </el-form-item>

        <el-form-item label="装修情况" prop="decoration">
          <el-input v-model="house.decoration" />
        </el-form-item>

        <el-form-item label="促销" prop="sale">
          <el-input v-model="house.sale" />
        </el-form-item>

        <!-- <el-form-item label="销售" prop="sale_description"> -->
        <!-- <el-input v-model="house.sale_description" /> -->
        <!-- </el-form-item> -->

        <el-form-item label="别名" prop="alias">
          <el-input v-model="house.alias" />
        </el-form-item>

        <el-form-item label="来源" prop="source">
          <el-input v-model="house.source" />
        </el-form-item>

        <el-form-item label="价值回报" prop="valueRating">
          <el-input v-model="house.valueRating" />
        </el-form-item>

        <el-form-item label="生活配置" prop="lifeRating">
          <el-input v-model="house.lifeRating" />
        </el-form-item>

        <el-form-item label="居住体验" prop="experienceRating">
          <el-input v-model="house.experienceRating" />
        </el-form-item>

        <el-form-item label="总价" prop="totalPriceValue">
          <el-input v-model="house.totalPriceValue" />
        </el-form-item>

        <el-form-item label="学区" prop="schoolValue">
          <el-input v-model="house.schoolValue" />
        </el-form-item>

        <el-form-item label="品牌" prop="brandValue">
          <el-input v-model="house.brandValue" />
        </el-form-item>

        <el-form-item label="户型" prop="houseValue">
          <el-input v-model="house.houseValue" />
        </el-form-item>

        <el-form-item label="地段" prop="locationValue">
          <el-input v-model="house.locationValue" />
        </el-form-item>

        <el-form-item label="销售状态" prop="saleStatus">
          <el-input v-model="house.saleStatus" />
        </el-form-item>

        <el-form-item label="签约立减" prop="sign">
          <el-input v-model="house.sign" />
        </el-form-item>

        <el-form-item label="认购签约" prop="subscription">
          <el-input v-model="house.subscription" />
        </el-form-item>

        <template>
          <div
            class="block"
            style="
              margin-left: 82px;
              font-size: 14px;
              font-weight: bolder;
              color: #606266;
            "
          >
            <span class="demonstration" style="margin-right: 8px"
              >开盘时间</span
            >
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat3"
            />
          </div>
        </template>

        <el-form-item label="开盘时间" prop="openDatetime">
          <el-input v-model="house.openDatetime" />
        </el-form-item>

        <template>
          <div
            class="block"
            style="
              margin-left: 54px;
              font-size: 14px;
              font-weight: bolder;
              color: #606266;
            "
          >
            <span class="demonstration" style="margin-right: 8px"
              >活动开始时间</span
            >
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat2"
            />
          </div>
        </template>

        <el-form-item label="活动开始时间" prop="activityStartDatetime">
          <el-input v-model="house.activityStartDatetime" />
        </el-form-item>

        <template>
          <div
            class="block"
            style="
              margin-left: 54px;
              font-size: 14px;
              font-weight: bolder;
              color: #606266;
            "
          >
            <span class="demonstration" style="margin-right: 8px"
              >活动结束时间</span
            >
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat1"
            />
          </div>
        </template>

        <el-form-item label="活动结束时间" prop="activityEndDatetime">
          <el-input v-model="house.activityEndDatetime" />
        </el-form-item>
        <!-- 测试 -->
        <el-form :model="house" label-width="100px" class="demo-ruleForm">
          <div class="button-search">
            <el-row>
              <span>奖励方案</span>
            </el-row>
            <el-button
              slot="append"
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addHeader()"
              >添加方案</el-button
            >
          </div>
          <!-- 动态增加项目 -->
          <!-- 不止一个项目，用div包裹起来 -->
          <div v-for="(item, index) in house.commissions" :key="index">
            <div class="div-inline">
              <el-form-item
                :prop="'commissions.' + index + '.category'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                房源值
                <el-input v-model="item.category" />
              </el-form-item>
            </div>

            <div class="div-inline distance_style_10">
              <el-form-item
                :prop="'commissions.' + index + '.cash'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
                class="input_width_300"
              >
                现金
                <el-input v-model="item.cash" />
              </el-form-item>
            </div>

            <div class="div-inline distance_style_10">
              <el-form-item
                :prop="'commissions.' + index + '.token'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
                class="input_width_300"
              >
                章鱼币
                <el-input v-model="item.token" />
              </el-form-item>
            </div>

            <div class="div-inline distance_style_10">
              <el-form-item>
                <el-button
                  type="danger"
                  :underline="false"
                  @click.prevent="removeHeader(item, index)"
                  >删除</el-button
                >
              </el-form-item>
            </div>
          </div>
        </el-form>

        <!-- <el-form-item label="奖励" prop="commission">
          <div
            v-for="commission in house.commissions"
            :key="commission.category"
          >
            <el-input v-model="commission.category" />
            <el-input v-model="commission.cash" />
            <el-input v-model="commission.token" />
          </div>
        </el-form-item> -->

        <el-form-item label="房源图片">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="house.thumbnail" :src="house.thumbnail" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="房源图片（窄）">
          <el-upload
            :headers="headers"
            :action="uploadNarrowPath"
            :show-file-list="false"
            :on-success="uploadNarrowPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img
              v-if="house.thumbnailNarrow"
              :src="house.thumbnailNarrow"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="宣传画廊">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :file-list="galleryFileList"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item label="宣传画廊视频">
          <el-upload
            ref="bannerVideo"
            :action="uploadVideoPath"
            :headers="headers"
            :on-preview="handlePreview"
            :file-list="galleryFileList3"
            :on-success="handleGalleryUrl3"
            :on-remove="handleRemove3"
            :before-upload="beforeBannerVideo"
            multiple
            accept=".mp4,.mkv"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <video width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="房源视频">
          <el-upload
            :headers="headers"
            :action="uploadVideoPath"
            :show-file-list="false"
            :on-progress="uploadVideoProcess"
            :on-success="uploadVideoUrl"
            :before-upload="beforeUploadVideo"
            class="avatar-uploader"
            accept=".mp4,.mkv"
          >
            <!-- <img v-if="house.video" :src="house.video" class="avatar" /> -->
            <video v-if="house.video" :src="house.video" class="avatar" />
            <el-input v-if="house.video" v-model="house.video" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top: 30px"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="房源视频链接" prop="baLink">
          <el-input v-model="house.baLink" />
        </el-form-item>

        <el-form-item
          label="添加房源视频"
          :model="house"
          label-width="150px"
          class="demo-ruleForm"
        >
          <!-- 动态增加项目 -->
          <!-- 不止一个项目，用div包裹起来 -->
          <div
            v-for="(item, index) in balinkArr"
            :key="index"
            style="display: flex; margin-bottom: 22px"
          >
            <el-input
              v-model="item.data"
              type="input"
              style="margin-right: 5px"
              placeholder="请填写视频链接"
            />
            <el-button type="danger" @click="deletebaLink(item, index)"
              >删除</el-button
            >
          </div>
          <el-button
            type="primary"
            style="margin: 0 0 22px 0px"
            @click="addbaLink()"
            >添加视频链接</el-button
          >
        </el-form-item>

        <!-- <div class="avatar">
          <video v-if="house.video" :src="house.video" ></video>
        </div> -->

        <!-- 添加标签 -->
        <el-button
          type="primary"
          style="margin-left: 16px"
          @click="drawer = true"
        >
          修改标签
        </el-button>
        <el-drawer title="我是标签" :visible.sync="drawer" :with-header="false">
          <template>
            <el-checkbox-group
              v-model="checkList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="tag in tags" :key="tag.id" :label="tag">{{
                tag.value
              }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-drawer>
        <!-- 标签 -->
        <el-form-item label="标签" prop="tags">
          <el-input v-model="house.tags" />
        </el-form-item>

        <el-form-item label="房源标签">
          <el-tag
            v-for="tag in tagInfos"
            :key="tag"
            closable
            type="primary"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- <el-input v-if="newKeywordVisible" ref="newKeywordInput" v-model="newKeyword" class="input-new-keyword" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" /> -->
          <!-- <el-button v-else class="button-new-keyword" type="primary" @click="showInput">+ 增加</el-button> -->
        </el-form-item>

        <!-- 区域，版块 -->
        <el-button
          type="primary"
          style="margin-left: 16px"
          @click="dialog = true"
        >
          修改区域
        </el-button>
        <el-drawer
          ref="drawer"
          title="我是区域"
          :visible.sync="dialog"
          :with-header="false"
        >
          <template>
            <el-radio-group v-model="radio" @input="limit">
              <el-radio v-for="are in area" :key="are.id" :label="are">{{
                are.value
              }}</el-radio>
            </el-radio-group>
            <!-- <el-radio v-model="radio" label="2">备选项</el-radio> -->
          </template>
        </el-drawer>
        <el-form-item label="区域" prop="area">
          <el-input v-model="house.area" />
        </el-form-item>

        <el-form-item label="房源区域">
          <el-tag
            v-for="are in areaInfos"
            :key="are"
            closable
            type="primary"
            @close="handleClose(are)"
          >
            {{ are }}
          </el-tag>
        </el-form-item>

        <el-form-item label="空中看房视频">
          <el-upload
            ref="bannerVideo"
            :action="uploadVideoPath"
            :headers="headers"
            :on-preview="handlePreview4"
            :file-list="galleryFileList4"
            :on-success="handleGalleryUrl4"
            :on-remove="handleRemove4"
            :before-upload="beforeBannerVideo"
            multiple
            accept=".mp4,.mkv"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible4">
            <video width="100%" :src="dialogImageUrl4" alt="" />
          </el-dialog>
        </el-form-item>

        <!-- <el-form-item label="空中看房视频">
          <el-upload
            :headers="headers"
            :action="uploadVideoPath"
            :show-file-list="false"
            :on-progress="uploadVideoProcess2"
            :on-success="uploadVideoUrl2"
            :before-upload="beforeUploadVideo"
            class="avatar-uploader"
            accept=".mp4,.mkv"
          >
            <video
              v-if="house.videoBannerUrl"
              :src="house.videoBannerUrl"
              class="avatar"
            ></video>
            <el-input
              v-if="house.videoBannerUrl"
              v-model="house.videoBannerUrl"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <el-progress
              v-if="videoFlag2 == true"
              type="circle"
              :percentage="videoUploadPercent2"
              style="margin-top:30px;"
            ></el-progress>
          </el-upload>
        </el-form-item>
        <el-form-item label="空中看房链接" prop="link">
          <el-input v-model="house.link" />
        </el-form-item> -->

        <!-- <el-form :model="house" label-width="100px" class="demo-ruleForm">
          <div>
            <el-row>
              <span>奖励方案<span>
            </el-row>
            <el-button
              slot="append"
              icon="el-icon-plus"
              size="small"
              type="primary"
            >
              添加方案
            </el-button>
          </div>
        <el-form> -->

        <el-form-item
          label="添加画廊视频"
          :model="house"
          label-width="150px"
          class="demo-ruleForm"
        >
          <!-- <div class="button-search">
            <el-row style="margin-left:55px">
              <span>画廊视频链接</span>
            </el-row>
            <el-button
              slot="append"
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addLink()"
              >添加链接</el-button
            >
          </div> -->
          <!-- 动态增加项目 -->
          <!-- 不止一个项目，用div包裹起来 -->
          <div
            v-for="(item, index) in linkArr"
            :key="index"
            style="display: flex; margin-bottom: 22px"
          >
            <el-input
              v-model="item.data"
              type="input"
              style="margin-right: 5px"
              placeholder="请填写视频链接"
            />
            <el-button type="danger" @click="deleteLink(item, index)"
              >删除</el-button
            >
            <!-- <div class="div-inline">
              <el-form-item
                :prop="'commissions.' + index + '.category'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur'
                }"
              >
                房源值
                <el-input v-model="item.category"></el-input>
              </el-form-item>
            </div> -->

            <!-- <div class="div-inline distance_style_10">
              <el-form-item
                :prop="'commissions.' + index + '.cash'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur'
                }"
                class="input_width_300"
              >
                现金
                <el-input v-model="item.cash"></el-input>
              </el-form-item>
            </div> -->

            <!-- <div class="div-inline distance_style_10">
              <el-form-item
                :prop="'commissions.' + index + '.token'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur'
                }"
                class="input_width_300"
              >
                章鱼币
                <el-input v-model="item.token"></el-input>
              </el-form-item>
            </div> -->

            <!-- <div class="div-inline distance_style_10">
              <el-form-item>
                <el-link
                  type="primary"
                  :underline="false"
                  @click.prevent="removeHeader(item, index)"
                  >删除</el-link
                >
              </el-form-item>
            </div> -->
          </div>
          <el-button
            type="primary"
            style="margin: 0 0 22px 0px"
            @click="addLink()"
            >添加视频链接</el-button
          >
        </el-form-item>

        <!-- 微信推客长廊 -->
        <!-- :limit="5"
        :on-exceed="uploadOverrun" -->
        <el-form-item label="微信推客画廊">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :file-list="galleryFileList2"
            :on-success="handleGalleryUrl2"
            :on-remove="handleRemove2"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item label="坐标">
          <!-- <div class="amap-wrapper">
            <el-amap class="amap-box" :vid="'amap-vue'" />
          </div> -->
          <!-- <div id="app"> -->
          <el-button @click="mapVisible = !mapVisible"> 打开 </el-button>
          <Map
            :map-visible="mapVisible"
            @mapLocationClose="mapLocationClose"
            @mapLocationSave="mapLocationSave"
          />
          <!-- </div> -->
        </el-form-item>

        <el-form-item label="经度" prop="longitude">
          <el-input v-model="house.longtitude" disabled />
        </el-form-item>

        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="house.latitude" disabled />
        </el-form-item>

        <el-form-item label="推荐规则">
          <!-- <editor v-model="house.recommendedRules" :init="recommentedInit" /> -->
        </el-form-item>

        <el-form-item label="到访规则">
          <!-- <editor v-model="house.visitedRules" :init="visitInit" /> -->
        </el-form-item>

        <el-form-item label="房源详细介绍">
          <!-- <editor v-model="house.detail" :init="editorInit" /> -->
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleEdit">更新商品</el-button>
    </div>

    <router-view />
  </div>
</template>

<style>
.app-container {
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: auto;
}
.el-card {
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
.amap-wrapper {
  width: 500px;
  height: 500px;
}
.op-container {
  display: flex;
  justify-content: center;
}
/* 测试 */
.div-inline {
  display: inline-block;
}
.button-search {
  display: flex;
  justify-content: space-between;
}
.el-row {
  margin-left: 80px;
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}
</style>

<script>
// import { detailHouse, editHouse } from "@/api/house";
// import { listAllHouseTag, listAllHouseArea } from "@/api/dic";
// import {
//   createStorage,
//   uploadPath,
//   uploadNarrowPath,
//   uploadVideoPath
// } from "@/api/storage";
// import Editor from "@tinymce/tinymce-vue";
// import { MessageBox } from "element-ui";
// import { getToken } from "@/utils/auth";
import _ from "lodash";
import Map from "../../../components/Map";

export default {
  name: "Edit",
  components: { Map },
  data() {
    return {
      mapVisible: false, // 地图
      uploadPath: "http://www.baidu.com", // 房源图片
      uploadNarrowPath: "http://www.baidu.com", // 房源图片窄
      uploadVideoPath: "http://www.baidu.com",
      newKeywordVisible: false,
      newKeyword: "",
      keywords: [],
      galleryFileList: [],
      galleryFileList2: [],
      galleryFileList3: [],
      galleryFileList4: [],
      categoryList: [],
      brandList: [],
      categoryIds: [],
      house: {
        gallery: [],
        galleryTwo: [],
        galleryC: [],
        galleryD: [],
        video: "",
        videoBannerUrl: "",
        baLink: "",
        link: "",
      },
      linkArr: [
        {
          id: "",
          data: "",
        },
      ],
      balinkArr: [
        {
          id: "",
          data: "",
        },
      ],
      dataNum: 0,
      dataNum2: 0,
      map: [],
      value1: "", // 开始时间
      value2: "", // 结束时间
      value3: "", // 开盘时间
      houseTagMap: {}, // 所有标签
      houseAreaMap: {}, // 所有区域
      tags: {}, // 修改标签
      area: {}, // 修改区域
      checkList: [],
      radio: "", // 区域，版块
      drawer: false, // 弹窗
      dialog: false,
      videoFlag: false, // 进度条
      videoFlag2: false, // 进度条
      videoUploadPercent: "", // 进度条的进度，
      videoUploadPercent2: "", // 进度条的进度，
      specVisiable: false,
      dialogImageUrl: "", // 预览宣传画廊视频
      dialogVisible: false,
      dialogImageUrl4: "", // 预览视频
      dialogVisible4: false,
      specForm: { specification: "", value: "", picUrl: "" },
      specifications: [{ specification: "规格", value: "标准", picUrl: "" }],
      productVisiable: false,
      productForm: {
        id: 0,
        specifications: [],
        price: 0.0,
        number: 0,
        url: "",
      },
      products: [
        { id: 0, specifications: ["标准"], price: 0.0, number: 0, url: "" },
      ],
      attributeVisiable: false,
      attributeAdd: true,
      attributeForm: { attribute: "", value: "" },
      attributes: [],
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
      },
      editorInit: {
        language: "zh_CN",
        height: "400px",
        convert_urls: false,
        plugins: [
          "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        ],
        toolbar: [
          "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
        ],
        images_upload_handler: function (blobInfo, success, failure) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          // --------
          // var Bucket = 'suzhouhaofang-1304398889';
          // var Region = 'ap-shanghai';

          // var cos = new COS({                            //生成签名
          //   SecretId: 'AKIDzOegSd5Pu0qQjiuMHrA5kERs3yXojfEZ',
          //   SecretKey: 'JyNVO3SaV80e5NJ4i4x2oWDvsjMkulOl',
          // });

          // cos.putObject({
          //   Bucket: Bucket, /* 必须 */
          //   Region: Region,     /* 存储桶所在地域，必须字段 */
          //   Key: 'test/testfile.jpg',              /* 必须 */
          //   StorageClass: 'STANDARD',
          //   Body: blobInfo.blob(), // 上传文件对象
          //   onProgress: function(progressData) {
          //       console.log(JSON.stringify(progressData));
          //   }
          // }, function(err, data) {
          //   console.log(err || data);
          //   success('https://' + data.Location);
          // });
          // transeferCOD(formData, auth)
          // --------
          createStorage(formData)
            .then((res) => {
              success(res.data.data.url);
            })
            .catch(() => {
              failure("上传失败，请重新上传");
            });
        },
        file_picker_callback: function (callback, value, meta) {},
      },
      recommentedInit: {
        language: "zh_CN",
        height: "200px",
        convert_urls: false,
        plugins: [
          "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        ],
        toolbar: [
          "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
        ],
        images_upload_handler: function (blobInfo, success, failure) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          createStorage(formData)
            .then((res) => {
              success(res.data.data.url);
            })
            .catch(() => {
              failure("上传失败，请重新上传");
            });
        },
        file_picker_callback: function (callback, value, meta) {},
      },
      visitInit: {
        language: "zh_CN",
        height: "200px",
        convert_urls: false,
        plugins: [
          "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount",
        ],
        toolbar: [
          "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
        ],
        images_upload_handler: function (blobInfo, success, failure) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          createStorage(formData)
            .then((res) => {
              success(res.data.data.url);
            })
            .catch(() => {
              failure("上传失败，请重新上传");
            });
        },
        file_picker_callback: function (callback, value, meta) {},
      },
    };
  },
  computed: {
    headers() {
      return {
        // "X-Litemall-Admin-Token": getToken()
      };
    },
    attributesData() {
      var attributesData = [];
      for (var i = 0; i < this.attributes.length; i++) {
        if (this.attributes[i].deleted) {
          continue;
        }
        attributesData.push(this.attributes[i]);
      }
      return attributesData;
    },
    tagInfos() {
      // var tagInfos = []
      var originalTags = _.split(this.house.tags, ",");

      var _this = this;
      var result = _.map(originalTags, function (tagId) {
        return _this.houseTagMap[_.trim(tagId)];
      });
      return result;
    },
    areaInfos() {
      var originalArea = _.split(this.house.area, ",");
      var _this = this;
      var result2 = _.map(originalArea, function (areaId) {
        return _this.houseAreaMap[_.trim(areaId)];
      });
      return result2;
    },
  },
  created() {
    this.init();
    console.log("房源编辑");
  },
  methods: {
    init: function () {
      //   if (this.$route.query.id == null) {
      //     return;
      //   }
      //   const houseId = this.$route.query.id;
      //   //获取所有标签名
      //   listAllHouseTag()
      //     .then(response => {
      //       var _this = this;
      //       _.map(response.data.data.list, function(tag) {
      //         _this.houseTagMap[tag.id] = tag.value;
      //       });
      //       this.tags = response.data.data.list;
      //       console.log("测试标签");
      //       console.log(response);
      //     })
      //     .catch(() => {});
      //   //获取所有区域
      //   listAllHouseArea()
      //     .then(response => {
      //       var _this = this;
      //       _.map(response.data.data, function(area) {
      //         _this.houseAreaMap[area.id] = area.value;
      //       });
      //       this.area = response.data.data;
      //       console.log("测试区域");
      //       console.log(response);
      //     })
      //     .catch(() => {});
      //   detailHouse(houseId).then(response => {
      //     this.house = response.data.data.house;
      //     if (response.data.data.house.linkArr !== undefined) {
      //       this.linkArr = response.data.data.house.linkArr;
      //     }
      //     if (response.data.data.house.balinkArr !== undefined) {
      //       this.balinkArr = response.data.data.house.balinkArr;
      //     }
      //     console.log("打印detailHouse")
      //     console.log(response);
      //     // 稍微调整一下前后端不一致
      //     if (this.house.keywords === "") {
      //       this.house.keywords = null;
      //     }
      //     // this.specifications = response.data.data.specifications
      //     // this.products = response.data.data.products
      //     // this.attributes = response.data.data.attributes
      //     // this.categoryIds = response.data.data.categoryIds
      //     if (this.house.gallery !== undefined) {
      //       this.galleryFileList = [];
      //       for (var i = 0; i < this.house.gallery.length; i++) {
      //         this.galleryFileList.push({
      //           url: this.house.gallery[i]
      //         });
      //       }
      //     }
      //     //微信推客图片
      //     if (this.house.galleryTwo !== undefined) {
      //       this.galleryFileList2 = [];
      //       for (var j = 0; j < this.house.galleryTwo.length; j++) {
      //         this.galleryFileList2.push({
      //           url: this.house.galleryTwo[j]
      //         });
      //       }
      //     }
      //     //宣传画廊视频
      //     if (this.house.galleryC !== undefined) {
      //       this.galleryFileList3 = [];
      //       for (var j = 0; j < this.house.galleryC.length; j++) {
      //         this.galleryFileList3.push({
      //           url: this.house.galleryC[j]
      //         });
      //       }
      //     }
      //     //空中看房视频
      //     if (this.house.galleryD !== undefined) {
      //       this.galleryFileList4 = [];
      //       for (var j = 0; j < this.house.galleryD.length; j++) {
      //         this.galleryFileList4.push({
      //           url: this.house.galleryD[j]
      //         });
      //       }
      //     }
      //     // }
      //     // const keywords = response.data.data.goods.keywords
      //     // if (keywords !== null) {
      //     //   this.keywords = keywords.split(',')
      //     // }
      //   });
      //   // listCatAndBrand().then(response => {
      //   //   this.categoryList = response.data.data.categoryList
      //   //   this.brandList = response.data.data.brandList
      //   // })
    },
    handleCategoryChange(value) {
      //   this.house.categoryId = value[value.length - 1];
    },
    handleCancel: function () {
      //   this.$store.dispatch("tagsView/delView", this.$route);
      //   this.$router.push({ path: "/house/list" });
    },
    // //更新商品
    handleEdit: function () {
      //   this.house.linkArr = this.linkArr;
      //   this.house.balinkArr = this.balinkArr;
      //   const finalHouse = this.house;
      //   console.log("更新房源");
      //   console.log(finalHouse);
      //   // console.log('打印')
      //   // console.log(this.house.galleryTwo)
      //   // console.log(this.house.galleryTwo.length)
      //   editHouse(finalHouse)
      //     .then(response => {
      //       this.$notify.success({
      //         title: "成功",
      //         message: "编辑成功"
      //       });
      //       this.$store.dispatch("tagsView/delView", this.$route);
      //       this.$router.push({ path: "/house/list" });
      //     })
      //     .catch(response => {
      //       MessageBox.alert("业务错误：" + response.data.errmsg, "警告", {
      //         confirmButtonText: "确定",
      //         type: "error"
      //       });
      //     });
    },
    handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1);
      this.house.keywords = this.keywords.toString();
    },
    showInput() {
      //   this.newKeywordVisible = true;
      //   this.$nextTick(_ => {
      //     this.$refs.newKeywordInput.$refs.input.focus();
      //   });
    },
    handleInputConfirm() {
      //   const newKeyword = this.newKeyword;
      //   if (newKeyword) {
      //     this.keywords.push(newKeyword);
      //     this.house.keywords = this.keywords.toString();
      //   }
      //   this.newKeywordVisible = false;
      //   this.newKeyword = "";
    },
    uploadPicUrl: function (response) {
      //   this.house.thumbnail = response.data.url;
    },
    uploadNarrowPicUrl: function (response) {
      //   this.house.thumbnailNarrow = response.data.url;
    },
    uploadVideoUrl: function (response) {
      //   console.log("上传");
      //   console.log(response);
      //   this.videoFlag = false;
      //   this.videoUploadPercent = 0;
      //   this.house.video = response.data.url;
    },
    uploadVideoUrl2: function (response) {
      //   console.log("上传画廊视频");
      //   console.log(response);
      //   this.videoFlag2 = false;
      //   this.videoUploadPercent2 = 0;
      //   this.house.videoBannerUrl = response.data.url;
    },
    // //视频验证
    beforeUploadVideo: function (file) {
      //   console.log("视频");
      //   console.log(file);
      //   const isLt500M = file.size / 1024 / 1024 < 500;
      //   if (
      //     [
      //       "video/mp4",
      //       "video/ogg",
      //       "video/flv",
      //       "video/avi",
      //       "video/wmv",
      //       "video/rmvb"
      //     ].indexOf(file.type) == -1
      //   ) {
      //     this.$message.error("请上传正确的视频格式");
      //     return false;
      //   }
      //   if (!isLt500M) {
      //     this.$message.error("上传视频大小不能超过500MB哦!");
      //     return false;
      //   }
    },
    uploadVideoProcess(event, file, fileList) {
      //   console.log("加载");
      //   console.log(file);
      //   this.videoFlag = true;
      //   this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    // //画廊视频
    uploadVideoProcess2(event, file, fileList) {
      //   console.log("加载画廊视频");
      //   console.log(file);
      //   this.videoFlag2 = true;
      //   this.videoUploadPercent2 = file.percentage.toFixed(0) * 1;
    },
    // // uploadOverrun: function() {
    // //   this.$message({
    // //     type: 'error',
    // //     message: '上传文件个数超出限制!最多上传5张图片!'
    // //   })
    // // },
    handleGalleryUrl(response, file, fileList) {
      //   if (this.house.gallery === undefined) {
      //     this.house.gallery = [];
      //   }
      //   if (response.errno === 0) {
      //     this.house.gallery.push(response.data.url);
      //   }
    },
    // // 微信推客图片
    handleGalleryUrl2(response, file, fileList) {
      //   if (this.house.galleryTwo == undefined) {
      //     this.house.galleryTwo = [];
      //   }
      //   if (response.errno === 0) {
      //     this.house.galleryTwo.push(response.data.url);
      //   }
    },
    // // 宣传画廊视频
    handleGalleryUrl3(response, file, fileList) {
      //   if (this.house.galleryC == undefined) {
      //     this.house.galleryC = [];
      //   }
      //   if (response.errno === 0) {
      //     this.house.galleryC.push(response.data.url);
      //   }
    },
    // // 空中看房视频
    handleGalleryUrl4(response, file, fileList) {
      //   if (this.house.galleryD == undefined) {
      //     this.house.galleryD = [];
      //   }
      //   if (response.errno === 0) {
      //     this.house.galleryD.push(response.data.url);
      //   }
    },
    handleRemove: function (file, fileList) {
      //   for (var i = 0; i < this.house.gallery.length; i++) {
      //     // 这里存在两种情况
      //     // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
      //     //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
      //     // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
      //     var url;
      //     if (file.response === undefined) {
      //       url = file.url;
      //     } else {
      //       url = file.response.data.url;
      //     }
      //     if (this.house.gallery[i] === url) {
      //       this.house.gallery.splice(i, 1);
      //     }
      //   }
    },
    // //微信推客
    handleRemove2: function (file, fileList) {
      //   for (var i = 0; i < this.house.galleryTwo.length; i++) {
      //     // 这里存在两种情况
      //     // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
      //     //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
      //     // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
      //     var url;
      //     if (file.response === undefined) {
      //       url = file.url;
      //     } else {
      //       url = file.response.data.url;
      //     }
      //     if (this.house.galleryTwo[i] === url) {
      //       this.house.galleryTwo.splice(i, 1);
      //     }
      //   }
    },
    // //宣传画廊视频
    handleRemove3: function (file, fileList) {
      //   for (var i = 0; i < this.house.galleryC.length; i++) {
      //     // 这里存在两种情况
      //     // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
      //     //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
      //     // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
      //     var url;
      //     if (file.response === undefined) {
      //       url = file.url;
      //     } else {
      //       url = file.response.data.url;
      //     }
      //     if (this.house.galleryC[i] === url) {
      //       this.house.galleryC.splice(i, 1);
      //     }
      //   }
    },
    // //空中看房视频
    handleRemove4: function (file, fileList) {
      //   for (var i = 0; i < this.house.galleryD.length; i++) {
      //     // 这里存在两种情况
      //     // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
      //     //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
      //     // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
      //     var url;
      //     if (file.response === undefined) {
      //       url = file.url;
      //     } else {
      //       url = file.response.data.url;
      //     }
      //     if (this.house.galleryD[i] === url) {
      //       this.house.galleryD.splice(i, 1);
      //     }
      //   }
    },
    // //画廊视频
    beforeBannerVideo(file) {
      //   console.log("打印画廊视频");
      //   console.log(this.$refs);
      //   console.log(this.$refs.bannerVideo);
      //   console.log(file)
      //   const typeAll = file.type.split('/');
      //   if (typeAll[0] === 'video') {
      //     //视频
      //     const isLt500M = file.size / 1024 / 1024 < 500
      //     if (['video/mp4'].indexOf(file.type) === -1) {
      //       this.$message.error('上传视频只能是mp4格式')
      //       return false;
      //     }
      //     if (!isLt500M) {
      //       this.$message.error('上传视频大小不能超过500M')
      //       return false;
      //     }
      //   }
    },
    specChanged: function (label) {
      //   if (label === false) {
      //     this.specifications = [
      //       { specification: "规格", value: "标准", picUrl: "" }
      //     ];
      //     this.products = [
      //       { id: 0, specifications: ["标准"], price: 0.0, number: 0, url: "" }
      //     ];
      //   } else {
      //     this.specifications = [];
      //     this.products = [];
      //   }
    },
    uploadSpecPicUrl: function (response) {
      //   this.specForm.picUrl = response.data.url;
    },
    handleSpecificationShow(row) {
      //   this.specForm = Object.assign({}, row);
      //   this.specVisiable = true;
    },
    handleSpecificationEdit() {
      //   this.specForm.updateTime = "";
      //   for (var i = 0; i < this.specifications.length; i++) {
      //     const v = this.specifications[i];
      //     if (v.id === this.specForm.id) {
      //       this.specifications.splice(i, 1, this.specForm);
      //       break;
      //     }
      //   }
      //   this.specVisiable = false;
    },
    handleProductShow(row) {
      //   this.productForm = Object.assign({}, row);
      //   this.productVisiable = true;
    },
    uploadProductUrl: function (response) {
      //   this.productForm.url = response.data.url;
      // },
      // handleProductEdit() {
      //   this.productForm.updateTime = "";
      //   for (var i = 0; i < this.products.length; i++) {
      //     const v = this.products[i];
      //     if (v.id === this.productForm.id) {
      //       this.products.splice(i, 1, this.productForm);
      //       break;
      //     }
      //   }
      //   this.productVisiable = false;
    },
    handleAttributeShow(row) {
      //   if (row.id) {
      //     this.attributeForm = Object.assign({}, row);
      //     this.attributeAdd = false;
      //   } else {
      //     this.attributeForm = {};
      //     this.attributeAdd = true;
      //   }
      //   this.attributeVisiable = true;
    },
    handleAttributeAdd() {
      //   this.attributes.unshift(this.attributeForm);
      //   this.attributeVisiable = false;
    },
    handleAttributeEdit() {
      //   // 这是一个trick，设置updateTime的值为空，告诉后端这个记录已编辑需要更新。
      //   this.attributeForm.updateTime = "";
      //   for (var i = 0; i < this.attributes.length; i++) {
      //     const v = this.attributes[i];
      //     if (v.id === this.attributeForm.id) {
      //       this.attributes.splice(i, 1, this.attributeForm);
      //       break;
      //     }
      //   }
      //   this.attributeVisiable = false;
    },
    handleAttributeDelete(row) {
      //   row.deleted = true;
    },
    // // 地图
    mapLocationClose() {
      this.mapVisible = false;
    },
    mapLocationSave(e) {
      //   console.log(e);
      //   this.house.longtitude = e.longitude;
      //   this.house.latitude = e.latitude;
      //   console.log(this.house);
      //   this.mapVisible = false;
    },
    // //方案
    addHeader() {
      //   this.house.commissions.push({
      //     category: "",
      //     cash: "",
      //     token: ""
      //   });
      //   console.log(this.house.commissions);
      // },
      // removeHeader(item, index) {
      //   this.house.commissions.splice(index, 1);
    },
    // //视频链接
    deleteLink(item, index) {
      //   if (this.linkArr.length <= 1) {
      //     //如果只有一个输入框则不可以删除
      //     return false;
      //   }
      //   console.log("当前下标" + index);
      //   this.linkArr.splice(index, 1); //删除了数组中对应的数据也就将这个位置的输入框删除
    },
    addLink() {
      //   this.linkArr.push(
      //     //增加就push进数组一个新值
      //     {
      //       id: this.dataNum++,
      //       data: ""
      //     }
      //   );
      //   console.log(this.linkArr);
    },
    deletebaLink(item, index) {
      //   if (this.balinkArr.length <= 1) {
      //     //如果只有一个输入框则不可以删除
      //     return false;
      //   }
      //   console.log("当前下标" + index);
      //   this.balinkArr.splice(index, 1); //删除了数组中对应的数据也就将这个位置的输入框删除
    },
    addbaLink() {
      //   this.balinkArr.push(
      //     //增加就push进数组一个新值
      //     {
      //       id: this.dataNum2++,
      //       data: ""
      //     }
      //   );
      //   console.log(this);
      //   console.log(this.balinkArr);
    },
    // //标签
    handleCheckedCitiesChange(value) {
      //   console.log(value);
      //   let checkedCount = value.length;
      //   this.checkAll = checkedCount === this.tags.length;
      //   this.isIndeterminate =
      //     checkedCount > 0 && checkedCount < this.tags.length;
      //   var b = [];
      //   value.forEach(item => {
      //     b.push(item.id);
      //     let c = b.join(",");
      //     this.house.tags = c;
      //     console.log(c);
      //   });
    },
    // //区域
    limit(e) {
      //   this.house.area = e.id;
      //   console.log(e.id);
    },
    handlePreview(file) {
      //     this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    handlePreview4(file) {
      //     this.dialogImageUrl4 = file.url;
      //     this.dialogVisible4 = true;
    },
    dateFormat1(e) {
      //   var date = new Date(e);
      //   var y = date.getFullYear();
      //   var m = date.getMonth() + 1;
      //   m = m < 10 ? "0" + m : m;
      //   var d = date.getDate();
      //   d = d < 10 ? "0" + d : d;
      //   var a = date.getHours();
      //   a = a < 10 ? "0" + a : a;
      //   var b = date.getMinutes();
      //   b = b < 10 ? "0" + b : b;
      //   var c = date.getSeconds();
      //   c = c < 10 ? "0" + c : c;
      //   const time = y + "-" + m + "-" + d + " " + a + ":" + b + ":" + c;
      //   return (this.house.activityEndDatetime = time);
    },
    dateFormat2(e) {
      //   var date = new Date(e);
      //   var y = date.getFullYear();
      //   var m = date.getMonth() + 1;
      //   m = m < 10 ? "0" + m : m;
      //   var d = date.getDate();
      //   d = d < 10 ? "0" + d : d;
      //   var a = date.getHours();
      //   a = a < 10 ? "0" + a : a;
      //   var b = date.getMinutes();
      //   b = b < 10 ? "0" + b : b;
      //   var c = date.getSeconds();
      //   c = c < 10 ? "0" + c : c;
      //   const time = y + "-" + m + "-" + d + " " + a + ":" + b + ":" + c;
      //   return (this.house.activityStartDatetime = time);
    },
    dateFormat3(e) {
      //   var date = new Date(e);
      //   var y = date.getFullYear();
      //   var m = date.getMonth() + 1;
      //   m = m < 10 ? "0" + m : m;
      //   var d = date.getDate();
      //   d = d < 10 ? "0" + d : d;
      //   var a = date.getHours();
      //   a = a < 10 ? "0" + a : a;
      //   var b = date.getMinutes();
      //   b = b < 10 ? "0" + b : b;
      //   var c = date.getSeconds();
      //   c = c < 10 ? "0" + c : c;
      //   const time = y + "-" + m + "-" + d + " " + a + ":" + b + ":" + c;
      //   return (this.house.openDatetime = time);
    },
  },
};
</script>
