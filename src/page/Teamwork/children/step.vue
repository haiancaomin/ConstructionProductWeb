<template>
  <div>
    <y-shelf title="项目节点">
      <div slot="right">
        <el-button @click="newStep">新建节点</el-button>
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
            <el-table-column prop="nodename" label="节点名称"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="_updateStep(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_deleteStep(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">你还未添加任何节点</div>
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
      :title="addOrEdit?'修改节点':'新增节点'"
      :visible.sync="newStepVisible"
      id="stepForm"
      @close="clearAddOrEdit"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="节点名称" :label-width="formLabelWidth" prop="nodename">
          <el-input v-model="ruleForm.nodename" auto-complete="off" placeholder="请输入节点名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newStepVisible = false">取 消</el-button>
        <el-button type="primary" @click="_saveStep('ruleForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveStep, getStepList, deleteStep, updateStep } from "/api";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
export default {
  data() {
    return {
      newStepVisible: false,
      ruleForm: {
        nodename: ""
      },
      rules: {
        nodename: [
          { required: true, message: "请输入节点名称", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      userid: "B0A11FC2-59AC-443C-894B-5412145473D3",
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      addOrEdit: ""
    };
  },
  methods: {
    newStep() {
      this.newStepVisible = true;
      this.reset();
    },
    _getStepList() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("selectIndex", this.currentPage);
      params.append("pageIndex", (this.currentPage - 1) * 10);
      getStepList(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.count;
      });
    },
    _saveStep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("nodename", this.ruleForm.nodename);
          params.append("userid", this.userid);

          if (this.addOrEdit) {
            params.append("nodeid", this.addOrEdit);

            updateStep(params).then(res => {
              if (res.data == 0) {
                this.newStepVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getStepList();
              } else {
                this.$message.error({
                  message: "保存失败！"
                });
              }
            });
          } else {
            saveStep(params).then(res => {
              if (res.data == 0) {
                this.newStepVisible = false;
                this.$message({
                  message: "保存成功！",
                  type: "success",
                  center: true
                });
                this._getStepList();
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
    _updateStep(row) {
      this.newStepVisible = true;
      this.ruleForm.nodename = row.nodename;
      this.addOrEdit = row.did;
    },
    _deleteStep(row) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("nodeid", row.did);
          deleteStep(params).then(res => {
            if (res.data == true) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this._getStepList();
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
      this._getStepList();
    },

    clearAddOrEdit() {
      this.addOrEdit = "";
    },
    reset() {
      this.ruleForm.nodename = "";
    }
  },
  created() {
    this._getStepList();
    // this.userid = getStore("userid");
    // this._orderList();
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
#stepForm .el-input,
#stepForm textarea {
  width: 300px;
}
#stepForm .el-dialog--small {
  width: 500px;
}
#stepForm .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>