<template>
  <div>
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
            <el-table-column prop="phone" label="联系方式" width="130"></el-table-column>
            <el-table-column prop="company" label="所属公司" width="310"></el-table-column>
            <el-table-column prop="project" label="所属项目" width="310"></el-table-column>
            <el-table-column prop="address" label="地址" width="300"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="新增人员" :visible.sync="newMemberVisible" id="memberForm">
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
        <el-button @click="newMemberVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMember">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { orderList, delOrder } from "/api/goods";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
export default {
  data() {
    return {
      newMemberVisible: false,
      ruleForm: {
        name: "",
        phone: "",
        companyname: "",
        companyaddress: "",
      },
       rules: {
          name: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          companyname: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          companyaddress: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ]
        },
      formLabelWidth: "120px",
      userid: "B0A11FC2-59AC-443C-894B-5412145473D3",
      loading: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [
        {
          name: "王小虎",
          phone: "15195910513",
          company: "智聚装配式绿色建筑创新中心南通有限公司",
          project: "抗震支架M-3501 华新建工集团",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    submitMember(){

    },
    newMember() {
      this.newMemberVisible = true;
    },
    message(m) {
      this.$message.error({
        message: m
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this._orderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._orderList();
    },
    orderPayment(orderId) {
      window.open(window.location.origin + "#/order/payment/" + orderId);
    },
    goodsDetails(id) {
      window.open(window.location.origin + "#/product/" + id);
    },
    orderDetail(orderId) {
      this.$router.push({
        path: "orderDetail",
        query: {
          orderId: orderId
        }
      });
    },
    getOrderStatus(status) {
      if (status === "0") {
        return "支付审核中";
      } else if (status === "2") {
        return "待发货";
      } else if (status === "3") {
        return "待收货";
      } else if (status === "4") {
        return "交易成功";
      } else if (status === "5") {
        return "交易关闭";
      } else if (status === "6") {
        return "支付失败";
      }
    },
    _orderList() {
      let params = {
        params: {
          size: this.pageSize,
          page: this.currentPage
        }
      };
      orderList(params).then(res => {
        this.orderList = res.result.data;
        this.total = res.result.total;
        this.loading = false;
      });
    },
    _delOrder(orderId, i) {
      let params = {
        params: {
          orderId: orderId
        }
      };
      delOrder(params).then(res => {
        if (res.success === true) {
          this.orderList.splice(i, 1);
        } else {
          this.message("删除失败");
        }
      });
    }
  },
  created() {
    this.userId = getStore("userId");
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