<template>
  <div class="stepComponent">
    <div class="stepsTitle">
      <div style="float:left;width:2px;height:20px; background:#219AFF;margin-right:5px"></div>项目节点要素
    </div>
    <div class="approvalProcess">
      <el-steps :active="active" finish-status="success" direction="vertical">
        <el-step :title="item.nodename" v-for="(item,index) in nodesList" :key="index">
          <template slot="description">
            <el-button size="small" type="text" @click="addNodeItem($event)" :id="item.nid">添加节点信息</el-button>
            <div class="step-row" v-for="(item,index) in item.infolist" :key="index">
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
                      <span>{{item.content}}</span>
                    </div>
                    <div class="processing_content_detail" style="float:right;">
                      <span>
                        <i class="el-icon-time"></i>
                        &nbsp;&nbsp;{{item.createdate}}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      class="processing_content_detail"
                      style="float:left;width:70%"
                      v-for="(v,k) in item.volist"
                      :key="k"
                    >
                      <div
                        style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"
                      ></div>
                      <a style="color:#919FB8" :href="v.fileurl">
                        附件：
                        <span style="color:#4db3ff">{{v.filename}}</span>
                      </a>
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
    <el-dialog :title="addOrEdit?'修改节点信息':'添加节点信息'" :visible.sync="addNodeBoxVisible">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="节点备注信息" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入节点备注"></el-input>
        </el-form-item>
        <el-form-item label="附件上传" :label-width="formLabelWidth">
          <el-upload
            action="http://192.168.1.188:8080/jzbppt/attachment_uploadNodeFile.do"
            :on-remove="handleRemove"
            :on-success="uploadCallBack"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :data="extraData"
            accept=".jpg, .jpeg, .png, .pdf"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/pdf格式</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNodeBoxVisible = false">取 消</el-button>
        <el-button type="primary" @click="_save('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStepInfo, saveNodeInfo } from "/api";
export default {
  props: ["data", "defaultActive"],
  data() {
    return {
      userid: "B0A11FC2-59AC-443C-894B-5412145473D3",
      projectid: "",
      nodesList: [],
      addNodeBoxVisible: false,
      fileList: [],
      ruleForm: {
        content: "",
        fileids: []
      },
      extraData: {},
      currentNid: "",
      addOrEdit: "",
      formLabelWidth: "120px",
      active: 0
    };
  },
  created() {
    this.projectid = this.$route.query.pid;
    this._getStepInfo();
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    addNodeItem(e) {
      this.addNodeBoxVisible = true;
      this.currentNid = e.target.parentNode.id;
    },
    _getStepInfo() {
      let params = new URLSearchParams();
      params.append("projectid", this.projectid);
      getStepInfo(params).then(res => {
        this.nodesList = res.data;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isPDF = file.type === "application/pdf";
      if (!isJPG && !isPNG && !isPDF) {
        this.$message.error("只能上传jpg/jpeg/png/pdf格式!");
        return;
      }
      this.extraData["userid"] = this.userid;
      this.extraData["names"] = file.name;
    },
    uploadCallBack(val) {
      console.log(val);
      this.ruleForm.fileids.push(val.data[0].fileid);
    },
    _save() {
      if (this.ruleForm.content == "" && this.ruleForm.fileids.length == 0) {
        this.$message.error("不允许提交空表单！");
        return false;
      }
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("nid", this.currentNid);
      params.append("content", this.ruleForm.content);
      params.append("fileids", this.ruleForm.fileids);
      console.log(this.ruleForm.fileids);
      saveNodeInfo(params).then(res => {
        console.log(res);
      });
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