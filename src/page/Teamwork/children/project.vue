<template>
  <div>
    <y-shelf title="项目管理">
      <div slot="right">
        <el-button @click="newProject">新建项目</el-button>
      </div>
      <div slot="content">
        <div
          id="teamworkTableList"
          v-loading="loading"
          element-loading-text="加载中..."
          v-if="tableData.length"
          style="min-height: 10vw;"
        >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="projectname" label="项目名称" width="250"></el-table-column>
            <el-table-column prop="contractno" label="合同编号" width="120"></el-table-column>
            <el-table-column prop="userinfo" label="联系人/电话" width="310"></el-table-column>
            <el-table-column prop="introduction" label="项目备注" width="310"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">沟通</el-button>
                <el-button @click="_updateProject(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_deleteProject(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">你还未创建过任何项目</div>
        </div>
      </div>
    </y-shelf>
    <div style="float:right">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="addOrEdit?'修改项目':'新建项目'"
      :visible.sync="newProjectVisible"
      id="projectForm"
      @open="_getSelectUsers"
      @close="clearAddOrEdit"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="项目名称"
          :label-width="formLabelWidth"
          class="required"
          prop="projectname"
        >
          <el-input v-model="ruleForm.projectname" auto-complete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.contractno" auto-complete="off" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.personids" placeholder="请选择项目联系人" multiple>
            <el-option
              v-for="(item,index) in selectUsers"
              :key="index"
              :label="item.name +'  '+ item.phone+'  '+item.companyname"
              :value="item.userid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目介绍" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.introduction" placeholder="请输入项目备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="_saveProject('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveProject,
  updateProject,
  getProjectList,
  deleteProject,
  getSelectUsers
} from "/api";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
export default {
  data() {
    return {
      newProjectVisible: false,
      userid: "B0A11FC2-59AC-443C-894B-5412145473D3",
      ruleForm: {
        projectname: "",
        contractno: "",
        personids: [],
        introduction: ""
      },
      rules: {
        projectname: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      name: "",
      selectUsers: [],
      addOrEdit: ""
    };
  },
  methods: {
    newProject() {
      this.newProjectVisible = true;
      this.reset();
    },
    _getProjectList() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("name", this.name);
      params.append("userid", this.userid);
      params.append("selectIndex", this.currentPage);
      params.append("pageIndex", (this.currentPage - 1) * 10);
      getProjectList(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    _saveProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("projectname", this.ruleForm.projectname);
          params.append("contractno", this.ruleForm.contractno);
          params.append("personids", this.ruleForm.personids);
          params.append("introduction", this.ruleForm.introduction);
          params.append("userid", this.userid);

          if (this.addOrEdit) {
            params.append("pid", this.addOrEdit);
            updateProject(params).then(res => {
              if (res.data == 0) {
                this.newProjectVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getProjectList();
              }
            });
          } else {
            saveProject(params).then(res => {
              if (res.data == 0) {
                this.newProjectVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getProjectList();
              }
            });
          }
        } else {
          this.$message.error({
            message: "表单验证未通过！"
          });
        }
      });
    },
    _getSelectUsers() {
      getSelectUsers().then(res => {
        this.selectUsers = res.data;
      });
    },
    _updateProject(row) {
      this.newProjectVisible = true;
      this.addOrEdit = row.pid;
      var ids = [];
      row.plist.forEach(element => {
        ids.push(element.personid);
      });
      this.ruleForm.projectname = row.projectname;
      this.ruleForm.contractno = row.contractno;
      this.ruleForm.personids = ids;
      this.ruleForm.introduction = row.introduction;
    },
    _deleteProject(row) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("pid", row.pid);
          deleteProject(params).then(res => {
            if (res.data == true) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this._getProjectList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._getProjectList();
    },
    clearAddOrEdit() {
      this.addOrEdit = "";
    },
    reset() {
      this.ruleForm.projectname = "";
      this.ruleForm.contractno = "";
      this.ruleForm.personids = [];
      this.ruleForm.introduction = "";
    }
  },
  created() {
    // this.userId = getStore("userId");
    this._getProjectList();
  },
  components: {
    YShelf
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/style/mixin";

.gray-sub-title {
  height: 38px;
  padding: 0 24px;
  background: #eee;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  line-height: 38px;
  font-size: 12px;
  color: #666;
  display: flex;
  span {
    display: inline-block;
    height: 100%;
  }
  .first {
    display: flex;
    justify-content: space-between;
    flex: 1;
    .f-bc {
      > span {
        width: 112px;
        text-align: center;
      }
    }
  }
  .last {
    width: 230px;
    text-align: center;
    display: flex;
    border-left: 1px solid #ccc;
    span {
      flex: 1;
    }
  }
}

.bt {
  border-top: 1px solid #efefef;
}

.date {
  padding-left: 0px;
}

.order-id {
  margin-left: 25px;
}

.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  &:hover {
    .del-order {
      display: block;
    }
  }
  .del-order {
    display: none;
  }
  .cart-l {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 15px 0;
    justify-content: space-between;
    position: relative;
    &:before {
      position: absolute;
      content: " ";
      right: -1px;
      top: 0;
      width: 1px;
      background-color: #efefef;
      height: 100%;
    }
    .ellipsis {
      margin-left: 20px;
      width: 220px;
    }
    .img-box {
      border: 1px solid #ebebeb;
    }
    img {
      display: block;
      @include wh(80px);
    }
    .cart-l-r {
      display: flex;
      > div {
        text-align: center;
        width: 112px;
      }
    }
    .car-l-l {
      display: flex;
      align-items: center;
    }
  }
  .cart-r {
    width: 230px;
    display: flex;
    span {
      text-align: center;
      flex: 1;
    }
  }
}

.prod-operation {
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 254px;
  div {
    width: 100%;
    text-align: center;
  }
  div:last-child {
    padding-right: 24px;
  }
}
.el-pagination {
  margin-bottom: 30px;
}
</style>
<style>
.required label::before {
  content: "*";
  color: red;
}
#teamworkTableList .el-table td,
#teamworkTableList .el-table th {
  height: 45px;
}
#projectForm .el-input,
#projectForm textarea {
  width: 300px;
}
#projectForm .el-dialog--small {
  width: 500px;
}
#projectForm .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>
