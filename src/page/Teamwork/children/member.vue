<template>
  <div v-if="showFlag">
    <y-shelf title="人员管理">
      <div slot="right">
        <el-button @click="newMember">新增人员</el-button>
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
            <el-table-column fixed prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="rolename" label="角色" width="120"></el-table-column>
            <el-table-column prop="phone" label="联系方式" width="130"></el-table-column>
            <el-table-column prop="companyname" label="所属公司" width="320"></el-table-column>
            <el-table-column prop="companyaddress" label="公司地址" width="320"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="_updateMember(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_deleteMember(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">你还未添加任何人员</div>
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
      :title="addOrEdit?'修改人员':'新增人员'"
      :visible.sync="newMemberVisible"
      id="memberForm"
      @open="_getRoles"
      @close="clearAddOrEdit"
    >
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
        <el-form-item label="用户角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择用户角色">
            <el-option
              v-for="(item,index) in roles"
              :key="index"
              :label="item.rolename"
              :value="item.rid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newMemberVisible = false">取 消</el-button>
        <el-button type="primary" @click="_saveMember('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveMember,
  getMemberList,
  deleteMember,
  updateMember,
  getRoles
} from "/api";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
export default {
  data() {
    return {
      newMemberVisible: false,
      showFlag: false,
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
      formLabelWidth: "120px",
      userid: "",
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      name: "", //查询人员字段
      addOrEdit: "",
      roles: []
    };
  },
  methods: {
    newMember() {
      this.newMemberVisible = true;
      this.reset();
    },
    _getMemberList() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("name", this.name);
      params.append("selectIndex", this.currentPage);
      params.append("pageIndex", (this.currentPage - 1) * 10);
      getMemberList(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    _saveMember(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("name", this.ruleForm.name);
          params.append("phone", this.ruleForm.phone);
          params.append("companyname", this.ruleForm.companyname);
          params.append("companyaddress", this.ruleForm.companyaddress);
          params.append("role", this.ruleForm.role);
          if (this.addOrEdit) {
            params.append("personid", this.addOrEdit);
            updateMember(params).then(res => {
              if (res.data == 0) {
                this.newMemberVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getMemberList();
              } else if (res.data == 2) {
                this.$message.error({
                  message: "手机号已存在！"
                });
              } else {
                this.$message.error({
                  message: "保存失败！"
                });
              }
            });
          } else {
            params.append("userid", this.userid);
            saveMember(params).then(res => {
              if (res.data == 0) {
                this.newMemberVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getMemberList();
              } else if (res.data == 2) {
                this.$message.error({
                  message: "手机号已存在！"
                });
              } else {
                this.$message.error({
                  message: "保存失败！"
                });
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
    _getRoles() {
      getRoles().then(res => {
        this.roles = res.data;
      });
    },
    _updateMember(row) {
      this.newMemberVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.phone = row.phone;
      this.ruleForm.companyname = row.companyname;
      this.ruleForm.companyaddress = row.companyaddress;
      this.ruleForm.role = row.roleid;
      this.addOrEdit = row.userid;
    },
    _deleteMember(row) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("personid", row.userid);
          deleteMember(params).then(res => {
            if (res.data == true) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this._getMemberList();
            } else {
              this.$message.error({
                message: "删除失败！"
              });
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
      this._getMemberList();
    },

    clearAddOrEdit() {
      this.addOrEdit = "";
    },
    reset() {
      this.ruleForm.name = "";
      this.ruleForm.phone = "";
      this.ruleForm.companyname = "";
      this.ruleForm.companyaddress = "";
      this.ruleForm.role = "";
    }
  },
  created() {
    this.userid = getStore("zjzp_userid");
    this._getMemberList();
    // this.userid = getStore("userid");
    // this._orderList();
  },
  mounted() {
    if (getStore("zjzp_role") == 1) {
      this.showFlag = true;
    }
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
#teamworkTableList .el-table td,
#teamworkTableList .el-table th {
  height: 45px;
}
#memberForm .el-input,
#memberForm textarea {
  width: 300px;
}
#memberForm .el-dialog--small {
  width: 500px;
}
#memberForm .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>