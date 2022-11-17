<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="$rules.activity"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="活动区域" prop="activityZone">
        <el-select v-model="form.region" placeholder="请选择区域">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="date1">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="即时交货">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="线上活动" name="type" />
          <el-checkbox label="促销活动" name="type" />
          <el-checkbox label="线下活动" name="type" />
          <el-checkbox label="简单的品牌曝光" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="赞助" />
          <el-radio label="场地" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="onReset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit(form) {
      // this.$message("submit!");
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message.success("成功!");
        } else {
          this.$message.error("error!");
        }
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    onReset(form) {
      this.$refs[form].resetFields();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
