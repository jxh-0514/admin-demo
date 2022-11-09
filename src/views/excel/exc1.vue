<template>
  <div>
    <el-button type="primary" @click="on">导入</el-button>
    <el-button type="primary" @click="off">导出</el-button>
    <!--上传文件弹窗-->
    <!--文件上传组件就不多介绍，Element-UI官网还是比较详细的-->
    <el-dialog
      :title="dialogParams.title"
      :visible.sync="dialogParams.visible"
      :close-on-click-modal="false"
      :top="'5%'"
      custom-class="el-dialog--width960"
    >
      <el-form
        :inline="false"
        :model="(data = data01.Content)"
        :rules="rules"
        ref="data01"
      >
        <!--注意，之所以此处加这个提示，是因为后天接口的限制，上传Excel 2007版本以上的Excel文件，文件后缀是xlsx,就会报错，所以此处只能上传xls后缀的Excel文件-->
        <div class="boxTitle">
          <span class="warninger"
            >上传文件后缀必须是(xls)，且根据模板上传，否则不能上传成功</span
          >
        </div>
        <el-form-item
          label="采购详情表"
          prop="MDM017402"
          :label-width="dialogParams.formLabelWidth"
        >
          <el-upload
            :action="uploadParams.url"
            :data="uploadParams.data"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :file-list="fileList"
            :disabled="uploadStatus"
          >
            <el-button size="small" type="success" :disabled="uploadStatus"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <!-- v-if="uploadParams.preview"  控制预览表格，只有上传成功才可以看到表格，否则不显示-->
        <el-form-item
          v-if="uploadParams.preview"
          label="预览"
          prop="MDM017402"
          :label-width="dialogParams.formLabelWidth"
        >
          <el-table
            :data="data01.Content.MDM017402"
            border
            max-height="240"
            style="width: calc(100% - 15px)"
          >
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column
              v-for="(item, index) in uploadParams.colModel"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            >
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitForm(data01)"
          :loading="submitStatus"
          >确定上传</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data01: {
        //获取列表提交单据
        Content: {
          CardName: "", //查询参数1
          UserName: "", //查询参数2
          CardCode: "", //查询参数3
          MDM017402: [], //存放预览表格数据的数组变量
          OMS005301List: [], //用来存放文件上传成功以后解析的数据
          BeginTime: "", //上传文件表格数据所需字段  （开始时间）
          CustomerCode: "", //上传文件表格数据所需字段   （客户代码）
          CustomerName: "", //上传文件表格数据所需字段（客户名称）
          EndTime: "", //上传文件表格数据所需字段（结束时间）
          ItemCode: "", //上传文件表格数据所需字段 （物料代码）
          ItemName: "", //上传文件表格数据所需字段   （物料名称）
        },
        Method: "Q", //接口查询参数
        page: 1, //分页参数
        rows: 50, //分页参数
        sidx: "DocEntry", //排序参数
        sord: "DESC", //排序参数
      },
      data02: {
        Content: {
          CardCode: "",
          CardName: "",
        },
      },
      total: 0,
      DropdownSaler: [],
      selectArr: [], //选中单据
      tableData: [],
      fileList: [],
      Loading: false,
      rules: {}, //表单验证
      dialogParams: {
        // 上传文件模态框参数
        title: "上传",
        visible: false, // 上传文件模态不显示
        formLabelWidth: "85px",
      },
      uploadParams: {
        // uploadParams文件上传参数
        url: "https://jsonplaceholder.typicode.com/posts/", //上传接口
        data: {
          Content: "",
        },
        preview: false, // 上传文件模态不显示
        colModel: [
          //声明一个数组，将上传数据绑定到表格中
          { prop: "ItemCode", label: "物料代码", width: "100" },
          { prop: "ItemName", label: "物料名称", width: "200" },
          { prop: "TaoBaoLink", label: "淘宝链接", width: "200" },
          { prop: "CustomerCode", label: "客户代码", width: "200" },
          { prop: "Remarks", label: "备注", width: "200" },
        ],
      },
      uploadStatus: false,
      submitStatus: false,
    };
  },

  //钩子函数
  created() {
    //在页面创建前调用请求数据接口的函数
    this.MDM017402();
  },
  methods: {
    on() {
      this.dialogParams.visible = true;
    },
    off() {
      this.dialogParams.visible = true;
    },
    pageChange(val) {
      this.data01.page = val;
      this.MDM017402();
    },
    sizeChange(val) {
      this.data01.rows = val;
      this.MDM017402();
    },
    searchClick() {
      //搜索
      this.MDM017402();
    },
    beforeUpload(file) {
      //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      file && (this.uploadStatus = true);
    },
    uploadSuccess(response, fileList) {
      //response为上传文件的表格数据
      //fileList为上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
      console.log("上传", response);
      if (response.Status === 200) {
        this.$notify({
          type: "success",
          titie: "上传成功",
          message: "上传成功",
        });
        this.uploadParams.preview = true;
        this.data01.Content.MDM017402 = JSON.parse(response.Content);
      } else {
        this.$notify.warning({
          title: "解析失败",
          message: response.Status + "：" + response.MessageString,
        });
      }
    },
    //数据获取请求函数
    MDM017402() {
      this.$axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/posts/", //请求接口
        data: this.data01, //请求接口的参数
      }).then(
        (res) => {
          if (res.data.Status === 200) {
            res.data.Content
              ? ((this.tableData = res.data.Content.rows),
                (this.total = res.data.Content.records))
              : ((this.tableData = []), (this.total = 0));
          } else {
            this.$notify({
              type: "warning",
              title: "找不到该数据",
              /*message: res.data.Status + res.data.Message*/
            });
            this.tableData = []; //查询时，如果查不到改项目，整个表格数据为空，此处表格中的data的值就是取自tableData [ ] 数组中
          }
        },
        (err) => {
          this.$notify({
            type: "warning",
            title: "找不到该数据",
            message: err, //抛出后台返回的错误
          });
        }
      );
    },
    submitForm(data) {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
    },
  },
};
</script>

<style></style>
