<template>
  <div class="stepComponent">
    <div class="stepsTitle">
      <div style="float:left;width:2px;height:20px; background:#219AFF;margin-right:5px"></div>项目节点要素
    </div>
    <div>
      <el-steps :active="active" finish-status="success" direction="vertical">
        <el-step :title="item.nodename" v-for="(item,index) in nodesList" :key="index">
          <template slot="description">
            <el-button
              size="small"
              type="text"
              @click="addNodeItem($event)"
              :id="item.nid"
              v-if="item.status==1"
            >添加节点信息</el-button>
            <div class="step-row" v-for="(item,index) in item.infolist" :key="index">
              <table
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                class="processing_content"
              >
                <tr>
                  <td style="color:#98A6BE;padding:8px 12px" v-if="item.content!=''">
                    <div style="width:70%">
                      <span>{{item.content}}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td v-if="item.volist.length" style="padding:8px 12px">
                    <div style="width:70%">
                      <div style="width:70%" v-for="(v,k) in item.volist" :key="k">
                        <div
                          style="display:inline-block;vertical-align:middle;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"
                        ></div>
                        <a style="color:#919FB8" :href="v.fileurl" target="_blank">
                          附件：
                          <span style="color:#4db3ff">{{v.filename}}</span>
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              <div class="time">
                <span>
                  <i class="el-icon-time"></i>
                  &nbsp;&nbsp;{{item.createdate}}
                </span>
              </div>
            </div>
          </template>
        </el-step>
      </el-steps>
      <el-button
        style="margin-top: 12px;"
        @click="_next"
        :disabled="active==nodesList.length?true:false"
      >下一步</el-button>
    </div>
    <el-dialog
      :title="addOrEdit?'修改节点信息':'添加节点信息'"
      :visible.sync="addNodeBoxVisible"
      @open="clearInfoForm"
    >
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="节点备注信息" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入节点备注"></el-input>
        </el-form-item>
        <el-form-item label="附件上传" :label-width="formLabelWidth">
          <el-upload
            action="http://192.168.1.12/jzbppt/attachment_uploadNodeFile.do"
            :on-remove="handleRemove"
            :on-success="uploadCallBack"
            :on-error="fuck"
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
import { getStepInfo, saveNodeInfo, next, deleteAttachment } from "/api";
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
    _next() {
      this.$confirm("确认跳至下一步？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          //下一步的xh
          var xh =
            this.active >= this.nodesList.length - 1
              ? ""
              : this.nodesList[Number(this.active) + 1].xh;
          let params = new URLSearchParams();
          params.append("projectid", this.projectid);
          params.append("xh", xh);
          next(params).then(res => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "已为您保存节点!"
              });
              this._getStepInfo();
            } else {
              this.$message.error("切换步骤失败！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消跳至下一步"
          });
        });
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
        var that = this;
        if (this.nodesList[this.nodesList.length - 1].status == 2) {
          this.active = this.nodesList.length;
          console.log(this.active);
        } else {
          this.nodesList.forEach(function(item, idx) {
            if (item.status == 1 && item.xh != 1) {
              that.active = idx;
              console.log(idx);
            }
          });
        }
      });
    },
    handleRemove(file, fileList) {
      let params = new URLSearchParams();
      params.append("fileid", file.response.data[0].fileid);
      deleteAttachment(params).then(res => {
        if (res.data) {
          this.$message({
            type: "success",
            message: "附件删除成功!"
          });
          this.ruleForm.fileids.pop(); //删除附件id
        } else {
          this.$message.error("附件删除失败！");
        }
      });
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
    fuck(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    uploadCallBack(val) {
      this.ruleForm.fileids.push(val.data[0].fileid);
    },
    clearInfoForm() {
      this.ruleForm.content = "";
      this.ruleForm.fileids = [];
      this.fileList = [];
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
      saveNodeInfo(params).then(res => {
        if (res.data == 0) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.addNodeBoxVisible = false;
          this._getStepInfo();
        } else {
          this.$message.error("添加失败！");
        }
      });
    }
  }
};
</script>
<style scoped>
.time {
  position: absolute;
  bottom: 8px;
  right: 12px;
  color: #98a6be;
}
.stepComponent {
  width: 600px;
  padding: 10px;
}
.stepsTitle {
  margin: 10px 0px 10px 10px;
}
.processing_content {
  background-color: #d9e5f9;
}
.step-row {
  min-width: 500px;
  margin-bottom: 12px;
  margin-top: 12px;
  position: relative;
}
.processing_content td {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
.stepComponent .el-step__main {
  width: calc(100% - 28px);
}
</style>