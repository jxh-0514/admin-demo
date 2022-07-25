<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>房源上架</h3>
      <el-form ref="house" :rules="rules" :model="house" label-width="150px">
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
        <!-- 3.27新加 -->
        <el-form-item label="销售状态" prop="saleStatus">
          <el-input v-model="house.saleStatus" />
        </el-form-item>
        <!--  -->
        <el-form-item label="签约立减" prop="sign">
          <el-input v-model="house.sign" />
        </el-form-item>

        <el-form-item label="认购签约" prop="subscription">
          <el-input v-model="house.subscription" />
        </el-form-item>
        <!-- 3.27新加 -->
        <template>
          <div class="block">
            <span class="demonstration">开盘时间</span>
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat3"
            >
            </el-date-picker>
          </div>
        </template>
        <el-form-item label="开盘时间" prop="openDatetime">
          <el-input v-model="house.openDatetime" :disabled="true" />
        </el-form-item>

        <template>
          <div class="block">
            <span class="demonstration">开始时间</span>
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat"
            >
            </el-date-picker>
          </div>
        </template>

        <el-form-item label="活动开始时间" prop="activityStartDatetime">
          <el-input v-model="house.activityStartDatetime" :disabled="true" />
        </el-form-item>

        <template>
          <div class="block">
            <span class="demonstration">结束时间</span>
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              @change="dateFormat2"
            >
            </el-date-picker>
          </div>
        </template>

        <el-form-item label="活动结束时间" prop="activityEndDatetime">
          <el-input v-model="house.activityEndDatetime" :disabled="true" />
        </el-form-item>

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
                  trigger: 'blur'
                }"
              >
                房源值
                <el-input v-model="item.category"></el-input>
              </el-form-item>
            </div>

            <div class="div-inline distance_style_10">
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
            </div>

            <div class="div-inline distance_style_10">
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
            </div>

            <div class="div-inline distance_style_10">
              <el-form-item>
                <el-link
                  type="primary"
                  :underline="false"
                  @click.prevent="removeHeader(item, index)"
                  >删除</el-link
                >
              </el-form-item>
            </div>
          </div>
        </el-form>

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

        <!-- 2021.3.15添加 -->
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
            <video width="100%" :src="this.dialogImageUrl" alt=""></video>
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
            <video v-if="house.video" :src="house.video" class="avatar"></video>
            <el-input v-if="house.video" v-model="house.video" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
          </el-upload>
        </el-form-item>
        <el-form-item label="房源视频链接" prop="baLink">
          <el-input v-model="house.baLink" />
        </el-form-item>
        <!-- 2021. 3.15-->

        <el-form-item label="添加房源视频" :model="house" label-width="150px" class="demo-ruleForm">         
          <!-- 动态增加项目 -->
          <!-- 不止一个项目，用div包裹起来 -->
          <div v-for="(item, index) in balinkArr" :key="index" style="display: flex;margin-bottom: 22px;">
            <el-input
              type="input"
              style="margin-right:5px"
              placeholder="请填写视频链接"
              v-model="item.data"
            >
            </el-input>
            <el-button type="danger" @click="deletebaLink(item,index)">删除</el-button>            
          </div>
          <el-button type="primary" @click="addbaLink()" style="margin:0 0 22px 0px">添加视频链接</el-button>
        </el-form-item>

        <!-- 标签 -->
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px;"
        >
          添加标签
        </el-button>

        <el-drawer title="我是标签" :visible.sync="drawer" :with-header="false">
          <template>
            <el-checkbox-group
              v-model="checkList"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="tag in tags" :label="tag" :key="tag.id">{{
                tag.value
              }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-drawer>
        <!-- 标签 -->
        <el-form-item label="标签" prop="tags">
          <el-input v-model="house.tags" />
        </el-form-item>
        <!-- 区域，版块 -->
        <el-button
          @click="dialog = true"
          type="primary"
          style="margin-left: 16px;"
        >
          添加区域
        </el-button>
        <el-drawer
          title="我是区域"
          :visible.sync="dialog"
          :with-header="false"
          ref="drawer"
        >
          <template>
            <el-radio-group v-model="radio" @input="limit">
              <el-radio :label="are" v-for="are in area" :key="are.id">{{
                are.value
              }}</el-radio>
            </el-radio-group>
            <!-- <el-radio v-model="radio" label="2">备选项</el-radio> -->
          </template>
        </el-drawer>
        <el-form-item label="区域" prop="area">
          <el-input v-model="house.area" />
        </el-form-item>
        <!-- 2021.3.15添加 -->
        <!-- :limit="5" -->
        <!-- <el-form-item label="宣传画廊">
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
        </el-form-item> -->
        <!-- 2021.3.15添加 -->

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
            <video width="100%" :src="this.dialogImageUrl4" alt=""></video>
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
            <video v-if="house.videoBannerUrl" :src="house.videoBannerUrl" class="avatar"></video>
            <el-input v-if="house.videoBannerUrl" v-model="house.videoBannerUrl" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <el-progress v-if="videoFlag2 == true" type="circle" :percentage="videoUploadPercent2" style="margin-top:30px;"></el-progress>
          </el-upload>
        </el-form-item>

        <el-form-item label="空中看房链接" prop="link">
          <el-input v-model="house.link" />
        </el-form-item> -->

        <el-form-item label="添加画廊视频" :model="house" label-width="150px" class="demo-ruleForm">          
          <div v-for="(item, index) in linkArr" :key="index" style="display: flex;margin-bottom: 22px;">
            <el-input
              type="input"
              style="margin-right:5px"
              placeholder="请填写视频链接"
              v-model="item.data"
            >
            </el-input>
            <el-button type="danger" @click="deleteLink(item,index)">删除</el-button>            
          </div>
          <el-button type="primary" @click="addLink()" style="margin:0 0 22px 0px">添加视频链接</el-button>
        </el-form-item>

        <!-- 微信推客画廊 -->
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
            :mapVisible="mapVisible"
            v-on:mapLocationClose="mapLocationClose"
            v-on:mapLocationSave="mapLocationSave"
          ></Map>
          <!-- </div> -->
        </el-form-item>

        <el-form-item label="经度" prop="longitude">
          <el-input v-model="house.longtitude" disabled />
        </el-form-item>

        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="house.latitude" disabled />
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="address" disabled />
        </el-form-item>

        <!-- 测试文件上传 -->
        <!-- <el-form-item label="测试腾讯云上传图片">
          <el-upload
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
            action="#"
            :http-request="uploadImg"
            :limit="1"
            list-type="picture-card"
            :on-change="changeHandel"
            :auto-upload="true"
            :show-file-list="false"
          > -->
        <!-- <span id="text">点击上传封面</span> -->
        <!-- <img v-if="imgURL" :src="imgURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item> -->

        <el-form-item label="房源详细介绍">
          <Editor v-model="house.detail" :init="editorInit" />
        </el-form-item>

        <el-form-item label="预览富文本">
          <div style="width: 100%;min-height:500px;background: #ccc" class="content" v-html="house.detail"></div>
        </el-form-item>

      </el-form>      

    </el-card>


    <!-- <div style="width: 100%;min-height:500px;background: #ccc">
        <div class="content" v-html="house.detail"></div>
    </div> -->

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">上架</el-button>
    </div>

    <router-view />
    
  </div>
</template>

<style>
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

.button-new-keyword {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.avatar-uploader .el-upload {
  width: 145px;
  height: 145px;
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
.el-drawer__body {
  display: flex;
  flex-wrap: wrap;
}
.el-checkbox-group {
  width: 100%;
  height: 500px;
  overflow: auto;
}
.el-radio-group {
  width: 100%;
  height: 90%;
  overflow: auto;
}
.block {
  margin-left: 90px;
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}
</style>

<script>
// import { publishHouse } from "@/api/house";
// import { listAllHouseTag, listAllHouseArea } from "@/api/dic";
// import { createStorage, uploadPath, uploadNarrowPath, uploadVideoPath } from "@/api/storage";
import Editor from "@tinymce/tinymce-vue";
// import { MessageBox, Upload } from "element-ui";
// import { getToken } from "@/utils/auth";
import Map from "../../../components/Map";

export default {
  name: "HouseCreate",
  components: { Editor, Map },

  data() {
    return {
      mapVisible: false, //地图
      uploadPath: 'http://www.baidu.com', //房源图片
      uploadNarrowPath: 'http://www.baidu.com', //房源图片窄
      uploadVideoPath: 'http://www.baidu.com',
      newKeywordVisible: false,
      newKeywordVisible1: false,
      newKeyword: "", //标签
      newKeyword1: "",
      newKeyword2: "",
      newKeyword3: "",
      galleryFileList: [], //长廊
      galleryFileList2: [], //微信长廊
      galleryFileList3: [], //房源视频
      galleryFileList4: [], //空中看房视频
      dialogImageUrl:'', //预览宣传画廊视频
      dialogVisible:false,
      dialogImageUrl4:'', //预览视频
      dialogVisible4:false,
      videoFlag: false,//进度条
      videoFlag2: false,//进度条
      videoUploadPercent: "",//进度条的进度，
      videoUploadPercent2: "",//进度条的进度
      // keywords: [],
      // categoryList: [],
      // brandList: [],
      house: {
        thumbnail: "",
        // gallery: [],
        // galleryTwo:[],
        isHot: false, //是否热卖
        isPreferential: true, //是否优惠
        isRecommend: true, //是否推荐
        isPutaway:true,
        commissions: [], //方案
        category: "",
        token: "",
        cash: "",
        area: "",
        activityStartDatetime: "",
        activityEndDatetime: "",
        openDatetime:"1970-01-01 00:00:00",//开盘时间
        sale:'',//促销
        subscription:'',//认购签约
        sign:'',//签约立减
        baLink:'',
        link:''
      },
      linkArr:[
        {
          id:"",
          data:""
        }
      ],
      balinkArr:[
        {
          id:"",
          data:""
        }
      ],
      dataNum: 0,
      dataNum2: 0,
      address: "",
      // testInfo: {
      //   headers: [],
      //   headerKey: "",
      //   headerVal: ""
      // },
      tagInfos: [], // 标签
      drawer: false, //弹窗
      dialog: false,
      tags: {}, //标签
      area: {}, //区域
      checkList: [],
      radio: "", //区域，版块
      checkAll: false, //全选
      a: [],
      value1: "", //开始时间
      value2: "", //结束时间
      value3: "1970-01-01 00:00:00", //开盘时间
      isIndeterminate: true,
      //测试文件上传
      // 修改作品信息弹窗显示与否
      dialogVisible: false,
      // 图片文件
      imgFile: "",
      // 图片文件名称
      fileName: "",
      // 上传成功后的地址
      imgURL: "",

      // house: { tagInfos: []},
      rules: {
        name: [{ required: true, message: "房源不能为空", trigger: "blur" }]
      },
      editorInit: {
        language: "zh_CN",
        height: 500,
        convert_urls: false,
        content_style:'.mce-content-body{background-color:#33384b;color:#fff;}',
        plugins: [
          "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"
        ],
        toolbar: [
          "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
          "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          createStorage(formData)
            .then(res => {
              console.log('====================================');
              console.log('富文本编辑器', res);
              console.log('====================================');
              success(res.data.data.url);
            })
            .catch(() => {
              failure("上传失败，请重新上传");
            });
        }
      }
    };
  },

  computed: {
    headers() {
      return {
        // "X-Litemall-Admin-Token": getToken()
      };
    }
  },
  created() {
    // this.init();
    // this.getList();
    console.log('房源创建');
  },

  methods: {
    getList() {
    //   //测试

    //   listAllHouseTag().then(response => {
    //     this.tags = response.data.data.list;
    //     console.log("测试标签");
    //     console.log(response);
    //   });
    //   listAllHouseArea().then(response => {
    //     this.area = response.data.data;
    //     console.log("测试区域");
    //     console.log(response);
    //   });
    },

    // // 点击取消回到房源列表
    handleCancel: function() {
    //   this.$store.dispatch("tagsView/delView", this.$route);
    //   this.$router.push({ path: "/house/list" });
    },
    // // 点击上架
    handlePublish: function() {
      console.log('====================================');
      console.log('上架', this.house);
      console.log('====================================');
    //   if (this.house.name !== undefined) {
    //     console.log("打印");
    //     console.log(this.house.name);
    //     if (this.house.gallery !== undefined) {
    //       this.galleryFileList = [];
    //       for (var i = 0; i < this.house.gallery.length; i++) {
    //         this.galleryFileList.push({
    //           url: this.house.gallery[i]
    //         });
    //       }
    //     }

    //     //微信推客图片
    //     if (this.house.galleryTwo != undefined) {
    //       this.galleryFileList2 = [];
    //       for (var j = 0; j < this.house.galleryTwo.length; j++) {
    //         this.galleryFileList2.push({
    //           url: this.house.galleryTwo[j]
    //         });
    //         console.log(this.galleryFileList2);
    //       }
    //     }
        
    //     //微信推客图片
    //     if (this.house.galleryC != undefined) {
    //       this.galleryFileList3 = [];
    //       for (var j = 0; j < this.house.galleryC.length; j++) {
    //         this.galleryFileList3.push({
    //           url: this.house.galleryC[j]
    //         });
    //         console.log(this.galleryFileList3);
    //       }
    //     }

    //     //微信推客图片
    //     if (this.house.galleryD != undefined) {
    //       this.galleryFileList4 = [];
    //       for (var j = 0; j < this.house.galleryD.length; j++) {
    //         this.galleryFileList4.push({
    //           url: this.house.galleryD[j]
    //         });
    //         console.log(this.galleryFileList4);
    //       }
    //     }

    //     //点击提交的时候把标签传给house
    //     let a = [];
    //     this.checkList.forEach(item => {
    //       a.push(item.id);
    //     });
    //     // this.house.tags=a
    //     this.house.linkArr = this.linkArr;
    //     this.house.balinkArr = this.balinkArr;
    //     const finalHouse = {
    //       house: this.house
    //     };
    //     console.log(finalHouse);
    //     // console.log(this.checkList.id)
    //     // console.log(this.house.tags)
    //     publishHouse(finalHouse.house)
    //       .then(response => {
    //         this.$notify.success({
    //           title: "成功",
    //           message: "创建成功"
    //         });
    //         // 不执行这里
    //         console.log("成功"),
    //         console.log(response);
    //         this.$store.dispatch("tagsView/delView", this.$route);
    //         this.$router.push({ path: "/house/list" });
    //       })
    //       .catch(e => {
    //         console.log("失败1");
    //         console.log(e);
    //         MessageBox.alert("业务错误：" + e.data.errmsg, "警告", {
    //           confirmButtonText: "确定",
    //           type: "error"
    //         });
    //         // 点击直接执行这步
    //         console.log("失败2");
    //         console.log(e);
    //       });
    //   } else {
    //     MessageBox.alert("业务错误：" + "名字为空", "警告", {
    //       confirmButtonText: "确定",
    //       type: "error"
    //     });
    //     console.log("名字为空");
    //   }
    },
    // // handleClose(tag) {
    // //   // 标签
    // //   this.tagInfos.splice(this.tagInfos.indexOf(tag), 1);

    // //   // this.keywords.splice(this.keywords.indexOf(tag), 1);
    // //   // this.goods.keywords = this.keywords.toString();
    // // },
    // // handleClose1(commissions){
    // //   //方案
    // //   console.log(commissions)

    // //   this.house.commissions.splice(this.commissions.indexOf(commissions.category),1)

    // // },
    // // 标签
    showInput() {
    //   this.newKeywordVisible = true;
    //   this.$nextTick(_ => {
    //     this.$refs.newKeywordInput.$refs.input.focus();
    //   });
    },
    // //方案
    // // showInput2() {
    // //   this.newKeywordVisible1 = true
    // //   this.$nextTick((_) => {
    // //     this.$refs.newKeywordInput1.$refs.input.focus()
    // //     // this.$refs.newKeywordInput2.$refs.input.focus()
    // //     // this.$refs.newKeywordInput3.$refs.input.focus()
    // //   })
    // // },
    // // 标签
    handleInputConfirm() {
    //   const newKeyword = this.newKeyword;
    //   if (newKeyword) {
    //     this.tagInfos.push(newKeyword);
    //     // this.keywords.push(newKeyword);
    //     // this.goods.keywords = this.keywords.toString();
    //   }
    //   this.newKeywordVisible = false;
    //   this.newKeyword = "";
    },
    // // handleInputConfirm1() {
    // //   const newKey={
    // //     category : this.newKeyword1,
    // //     cash : this.newKeyword2,
    // //     token : this.newKeyword3
    // //   }
    // //   // const newKeyword1 = this.newKeyword1
    // //   // const newKeyword2 = this.newKeyword2
    // //   // const newKeyword3 = this.newKeyword3
    // //   if (newKey) {
    // //     this.house.commissions.push(newKey)
    // //     // this.keywords.push(newKeyword);
    // //     // this.goods.keywords = this.keywords.toString();
    // //   }
    // //   this.newKeywordVisible1 = false
    // //   this.newKeyword1= ''
    // //   this.newKeyword2=''
    // //   this.newKeyword3=''
    // //   console.log(this.house.commissions)
    // // },
    // //房源图片
    uploadPicUrl: function(response) {
    //   this.house.thumbnail = response.data.url;
    //   console.log("房源图片");
    //   console.log(response);
    },
    // //房源图片窄图
    uploadNarrowPicUrl: function(response) {
    //   this.house.thumbnailNarrow = response.data.url;
    //   console.log("房源图片窄");
    //   console.log(response);
    },
    handleGalleryUrl(response, file, fileList) {
    //   console.log("画廊");
    //   console.log(response);
    //   if (this.house.gallery === undefined) {
    //     this.house.gallery = [];
    //   }
    //   if (response.errno === 0) {
    //     this.house.gallery.push(response.data.url);
    //   }
    },
    // // 微信推客图片
    handleGalleryUrl2(response, file, fileList) {
    //   console.log("微信推客");
    //   console.log(response);
    //   if (this.house.galleryTwo === undefined) {
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
    handleRemove: function(file, fileList) {
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
    handleRemove2: function(file, fileList) {
    //   for (var i = 0; i < this.house.galleryTwo.length; i++) {        
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
    handleRemove3: function(file, fileList) {
    //   for (var i = 0; i < this.house.galleryC.length; i++) {        
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
    handleRemove4: function(file, fileList) {
    //   for (var i = 0; i < this.house.galleryD.length; i++) {        
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
    // //视频链接
    deleteLink(item, index) {
    //   if (this.linkArr.length <= 1) {
    //     //如果只有一个输入框则不可以删除
    //     return false;
    //   }
    //   console.log("当前下标" + index);
    //   this.linkArr.splice(index, 1); //删除了数组中对应的数据也就将这个位置的输入框删除
    },
    addLink(item) {
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
    addbaLink(item) {
    //   this.balinkArr.push(
    //     //增加就push进数组一个新值
    //     {
    //       id: this.dataNum2++,
    //       data: ""
    //     }
    //   );
    //   console.log(this.balinkArr);
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
    // // 地图
    mapLocationClose() {
      this.mapVisible = false;
    },
    mapLocationSave(e) {
      console.log(e);
      // this.house.longtitude = e.longitude;
    //   this.house.latitude = e.latitude;
      this.address = e.address; //显示所选地址
    //   console.log(this.house);
    //   this.mapVisible = false;
    },
    // //方案
    addHeader() {
      this.house.commissions.push({
        category: "",
        cash: "",
        token: ""
      });
      console.log(this.house.commissions);
    },
    removeHeader(item, index) {
      this.house.commissions.splice(index, 1);
    },
    // // handleCheckAllChange(val) {
    // //     this.checkList = val ? tags.value : [];
    // //     this.isIndeterminate = false;
    // //   },
    handleCheckedCitiesChange(value) {
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
    uploadVideoUrl: function(response) {
    //   console.log("上传")
    //   console.log(response)
    //   this.videoFlag = false;
    //   this.videoUploadPercent = 0;
    //   this.house.video = response.data.url;
    },
    uploadVideoUrl2: function(response) {
    //   console.log("上传画廊视频")
    //   console.log(response)
    //   this.videoFlag2 = false;
    //   this.videoUploadPercent2 = 0;
    //   this.house.videoBannerUrl = response.data.url;
    },
    // //视频验证
    beforeUploadVideo: function(file) {
    //   console.log("视频")
    //   console.log(file)
    //   const isLt500M = file.size / 1024 / 1024  < 500;
    // if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
    //     this.$message.error('请上传正确的视频格式');
    //     return false;
    // }
    // if (!isLt500M) {
    //     this.$message.error('上传视频大小不能超过500MB哦!');
    //     return false;
    // }
    },
    uploadVideoProcess(event, file, fileList){
    //   console.log('加载')
    //   console.log(file)
    //   this.videoFlag = true;
    //   this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    // //画廊视频
    uploadVideoProcess2(event, file, fileList){
    //   console.log('加载画廊视频')
    //   console.log(file)
    //   this.videoFlag2 = true;
    //   this.videoUploadPercent2 = file.percentage.toFixed(0) * 1;
    },
    handlePreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    },
    handlePreview4(file) {
    //     this.dialogImageUrl4 = file.url;
    //     this.dialogVisible4 = true;
    },
    dateFormat(e) {
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
    //   return (this.house.activityEndDatetime = time);
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
    // 测试文件上传
    // 获取封面对象
    changeHandel(file, fileList) {
    //   console.log("文件");
    //   console.log(file);
    //   this.imgFile = file;
    //   this.fileName = file.name;
    //   this.imgURL = file.url; //把图片地址赋值，显示
    //   // 上传之后将上传封面隐藏，避免频繁操作
    //   const upload = document.getElementById("text");
    //   // const parent = upload.parentNode
    //   // parent.style.display = 'none'
    },
    // // 封面上传
    // async uploadImg() {
    //   // 创建COS实例  获取签名
    //   //这里写你们后端提供的请求接口即可
    //   const res = await this.$axios.get("/xxxxxxxx/xxxxxxxx");
    //   // console.log(JSON.parse(res.data.data))
    //   //这里是因为我们后端返回的是一组JSON字符串，所以进行了一次转化，如果你们直接返回的就是json对象，直接忽略即可
    //   // const data = JSON.parse(res.data.data)
    //   const cos = new COS({
    //     // 必选参数
    //     getAuthorization: (options, callback) => {
    //       const obj = {
    //         TmpSecretId: data.credentials.tmpSecretId,
    //         TmpSecretKey: data.credentials.tmpSecretKey,
    //         XCosSecurityToken: data.credentials.sessionToken,
    //         StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
    //         ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
    //       };
    //       callback(obj);
    //       console.log("返回obj");
    //       console.log(obj);
    //     }
    //     // SecretId: 'AKIDzOegSd5Pu0qQjiuMHrA5kERs3yXojfEZ',
    //     //   SecretKey: 'JyNVO3SaV80e5NJ4i4x2oWDvsjMkulOl',
    //   });
    //   // 上传图片  其中Bucket 和 Region找你们负责人拿
    //   //key 在前面加上路径写法可以生成文件夹
    //   cos.putObject(
    //     {
    //       Bucket: "suzhouhaofang-1304398889" /* 必须 */,
    //       Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
    //       Key: "/img/" + new Date().getTime() + this.fileName /* 必须 */,
    //       StorageClass: "STANDARD",
    //       Body: this.imgFile.raw, // 上传文件对象
    //       onProgress: progressData => {
    //         console.log(JSON.stringify(progressData));
    //       }
    //     },
    //     (err, data) => {
    //       // 将上传后的封面进行路径拼接保存到本地
    //       console.log(err || data);
    //       const url = "https://" + data.Location;
    //       // console.log(url)
    //       this.imgURL = url;
    //     }
    //   );
    // }

    //版块区域
    // handleCheckedCitiesChange2(value) {
    //   let checkedCount2 = value.length;
    //   this.checkAll = checkedCount2 === this.area.length;
    //   this.isIndeterminate = checkedCount2 > 0 && checkedCount2 < this.area.length;
    //   var d=[]
    //   value.forEach(item => {
    //     d.push(item.id)
    //     let e = d.join(",");
    //     this.house.tags=e
    //     console.log(e)
    //     })
    // }
    // uploadOverrun: function() {
    //   this.$message({
    //     type: 'error',
    //     message: '上传文件个数超出限制!最多上传5张图片!'
    //   })
    // },
    // handleGalleryUrl(response, file, fileList) {
    //   if (response.errno === 0) {
    //     this.goods.gallery.push(response.data.url)
    //   }
    // },
    // handleRemove: function(file, fileList) {
    //   for (var i = 0; i < this.goods.gallery.length; i++) {
    //     // 这里存在两种情况
    //     // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
    //     //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
    //     // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
    //     var url
    //     if (file.response === undefined) {
    //       url = file.url
    //     } else {
    //       url = file.response.data.url
    //     }

    //     if (this.goods.gallery[i] === url) {
    //       this.goods.gallery.splice(i, 1)
    //     }
    //   }
    // },
  }
};
</script>
