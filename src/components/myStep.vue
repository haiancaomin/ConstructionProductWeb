<template>
  <div class="stepComponent">
    <div class="stepsTitle">
      <div style="float:left;width:2px;height:20px; background:#219AFF;margin-right:5px"></div>项目节点要素
    </div>
    <div class="approvalProcess">
      <el-steps :active="active" finish-status="success" direction="vertical">
        <el-step
          :title="item.label"
          v-for="(item,index) in approvalProcessProject"
          :id="item.id"
          :key="index"
        >
          <template slot="description">
            <el-button size="small" type="text" @click="addNodeItem">添加节点信息</el-button>
            <div class="step-row" v-for="(item,index) in approvalProcessProject" :key="index">
              <table
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                class="processing_content"
              >
                <tr>
                  <td style="color:#98A6BE">
                    <div class="processing_content_detail" style="float:left;width:70%">
                      <span>
                        申请人&nbsp;&nbsp;
                        <span style="color:#219AFF">圆领{{}}</span>&nbsp;&nbsp;提交了割接方案
                      </span>
                    </div>
                    <div class="processing_content_detail" style="float:right;">
                      <span>
                        <i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="processing_content_detail" style="float:left;width:70%">
                      <div
                        style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"
                      ></div>
                      <span style="color:#919FB8">同意，建议通过</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </template>
        </el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
    <el-dialog :title="addOrEdit?'修改人员':'新增人员'" :visible.sync="addNodeBoxVisible" id="memberForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="ruleForm.phone" auto-complete="off" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="companyname">
          <el-input v-model="ruleForm.companyname" auto-complete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth" prop="companyaddress">
          <el-input v-model="ruleForm.companyaddress" auto-complete="off" placeholder="请输入公司地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="_saveMember('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["data", "defaultActive"],
  data() {
    return {
      addNodeBoxVisible: false,
      ruleForm: {
        name: "",
        phone: "",
        companyname: "",
        companyaddress: "",
        role: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        companyname: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        companyaddress: [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
      addOrEdit: "",
      formLabelWidth: "120px",
      active: 0,
      approvalProcessProject: [
        { id: "0", label: "方案制定" },
        { id: "1", label: "割接方案会审" },
        { id: "2", label: "割接审批" },
        { id: "3", label: "审批成功" }
      ]
    };
  },
  watch: {},
  mounted() {},
  computed: {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    addNodeItem() {
      this.addNodeBoxVisible = true;
    }
  }
};
</script>
<style scoped>
.stepComponent {
  background-color: #fff;
  width: 600px;
  padding: 10px;
}
.stepsTitle {
  margin: 10px 0px 10px 10px;
}
.approvalProcess {
  color: #9eadc4;
  font-size: 14px;
  /* width: 100%; */
  background: #fff;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: 10px;
}
.processing_content {
  background-color: #d9e5f9;
}
.processing_content_detail {
  margin-left: 10px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  width: 150px;
  display: inline-block;
}
.step-row {
  min-width: 500px;
  margin-bottom: 12px;
  margin-top: 12px;
}
</style>
<style>
.stepComponent .el-input,
.stepComponent textarea {
  width: 300px;
}
.stepComponent .el-dialog--small {
  width: 500px;
}
.stepComponent .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>