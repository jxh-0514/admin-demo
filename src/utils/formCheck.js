// 手机号码验证
const validatePhone = (rule, value, callback) => {
  const patter = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$')
  if (!patter.test(value)) {
    return callback(new Error('请输入正确格式的手机号！'))
  } else {
    callback() // 必须有此项回调，否则验证会一直不通过
  }
}
//姓名验证/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,10}$/ || ^[\u4e00-\u9fa5]{2,4}$
const validateName = (rule, value, callback) => {
  const patter = new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,10}$')
  if (!patter.test(value)) {
    return callback(new Error('请输入正确格式的姓名！'))
  } else {
    callback()
  }
}
// 邮箱的正则
const validateEmail = (rule, value, callback) => {
  const mailbox = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
  if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的邮箱！'))
  } else {
    callback()
  }
}
// 身份证号
const validateIdCardNo = (rule, value, callback) => {
  const mailbox = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
  if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的身份证号！'))
  } else {
    callback()
  }
}
//只能输入数字
const validateNumber = (rule, value, callback) => {
  const mailbox = new RegExp(/^[0-9]*$/)
  if (!mailbox.test(value)) {
    return callback(new Error('请输入正确格式的数字！'))
  } else {
    callback()
  }
}


export default {
  // ---------------------公共验证方法
  // ------使用方法：el-form-item标签必须带prop属性，prop属性值为需要验证的字段名
  // ------例如：<el-form-item prop="name">
  // ------<el-input v-model="name" placeholder="请输入姓名" />
  // ------</el-form-item>
  // ------<el-form-item prop="phone">
  // ------<el-input v-model="phone" placeholder="请输入手机号" />
  // ------</el-form-item>
  // ------prop的值与v-model的值一致，即可验证   
  common: {
    Mobile: [{// 手机号
      required: true,
      message: '手机号不能为空'
    }, {
      validator: validatePhone,
      trigger: 'blur'
    }],
    DisplayName: [{// 姓名
      required: true,
      message: '姓名不能为空'
    }, {
      validator: validateName,
      trigger: 'blur'
    }],
    Mail: [{// 邮箱
      required: true,
      message: '邮箱不能为空'
    },
    {
      validator: validateEmail,
      trigger: 'blur'
    }
    ],
    Code: [{// 身份证号码
      required: true,
      message: '身份证号码不能为空'
    },
    {
      validator: validateIdCardNo,
      trigger: 'blur'
    }
    ],
    Sort: [{// 只能输入数字
      required: true,
      message: '只能输入数字'
    },
    {
      validator: validateNumber,
      trigger: 'blur'
    }
    ],
  },
  handle: {
    // ---------------------处理表单的验证方法      
    AccountName: [{
      required: true,
      message: '请填写账号'
    }],
    Role: [{
      required: true,
      message: '请选择角色'
    }],
    Password: [{
      required: true,
      message: '请填写密码'
    }],
    id: [{
      required: true,
      message: '请填写编号'
    }],
    Name: [{
      required: true,
      message: '请填写名称'
    }],
    RoleName: [{
      required: true,
      message: '请填写角色名称'
    }],
    DepartmentID: [{                       //部门管理
      required: true,
      message: '请填写部门编号'
    }],
    DepartmentName: [{
      required: true,
      message: '请填写部门名称'
    }],
    UserTypeID: [{                        //人员类型
      required: true,
      message: '请填写人员类型编号'
    }],
    UserTypeName: [{
      required: true,
      message: '请填写人员类型'
    }],
    DeviceTypeID: [{                      //设备类型
      required: true,
      message: '请填写设备类型编号'
    }],
    DeviceTypeName: [{
      required: true,
      message: '请填写设备类型'
    }],
    CarTypeID: [{                        //车辆类型
      required: true,
      message: '请填写车辆类型编号'
    }],
    CarTypeName: [{
      required: true,
      message: '请填写车辆类型'
    }],
    UserID: [{                           //人员管理
      required: true,
      message: '请填写人员编号'
    }],
    DisplayName: [{
      required: true,
      message: '请填写人员名称'
    }],
    DepartmentID: [{
      required: true,
      message: '请选择部门'
    }],
    BirthDay: [{
      required: true,
      message: '请填写出生日期'
    }],
    ItemValue: [{
      required: true,
      message: '请输入具体值'
    }],
    UnitName: [{
      required: true,
      message: '请填写单位名称'
    }],
    DeviceID: [{
      required: true,
      message: '请填写设备编号'
    }],
    DeviceName: [{
      required: true,
      message: '请填写设备名称'
    }],
    ItemTypeID: [{
      required: true,
      message: '请填写类型编号'
    }],
    ItemTypeName: [{
      required: true,
      message: '请填写类型名称'
    }],
    WorkFlowID: [{
      required: true,
      message: '请填写流程编号'
    }],
    WorkFlowName: [{
      required: true,
      message: '请填写审批名称'
    }],
    StoreID: [{                 //仓库管理
      required: true,
      message: '请填写仓库编号'
    }],
    StoreName: [{
      required: true,
      message: '请填写仓库名称'
    }],
    AreaID: [{
      required: true,
      message: '请填写库区编号'
    }],
    AreaName: [{
      required: true,
      message: '请填写库区名称'
    }],
    SiteID: [{
      required: true,
      message: '请填写货架编号'
    }],
    SiteName: [{
      required: true,
      message: '请填写货架名称'
    }],
    PrintLabelID: [{
      required: true,
      message: '请填写模板编号'
    }],
    PrintLabelName: [{
      required: true,
      message: '请填写模板名称'
    }],
    RegionID: [{
      required: true,
      message: '请填写围栏编号'
    }],
    RegionName: [{
      required: true,
      message: '请填写围栏名称'
    }],                              //摄像头管理
    CameraID: [{
      required: true,
      message: '请填写设备编号'
    }],
    CameraName: [{
      required: true,
      message: '请填写设备名称'
    }],                              //快速业务模板
    FormTemplateID: [{
      required: true,
      message: '请填写模板编号'
    }],
  },
  activity: {
    name: [{
      required: true,
      message: '请填写活动名称'
    }],
    region: [{
      required: true,
      message: '请选择活动区域'
    }],
    date1: [{
      required: true,
      message: '请选择活动时间'
    }],
    type: [{
      required: true,
      message: '请选择活动类型'
    }],
    desc: [{
      required: true,
      message: '请填写活动形式'
    }],
  }
}
