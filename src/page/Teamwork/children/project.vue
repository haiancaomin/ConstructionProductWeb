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
            <el-table-column fixed prop="date" label="日期" width="120"></el-table-column>
            <el-table-column prop="project" label="项目名称" width="310"></el-table-column>
            <el-table-column prop="person" label="联系人" width="120"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="130"></el-table-column>
            <el-table-column prop="company" label="所属公司" width="310"></el-table-column>            
            <el-table-column prop="progress" label="当前节点" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="165">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>             
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>             
                <el-button @click="handleClick(scope.row)" type="text" size="small">添加节点</el-button>             
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="新建项目" :visible.sync="newProjectVisible" id="projectForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="项目名称" :label-width="formLabelWidth" class="required" prop="projectname">
          <el-input v-model="ruleForm.projectname" auto-complete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.contractno" auto-complete="off" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.person" placeholder="请选择项目联系人">
            <el-option label="张三" value="shanghai"></el-option>
            <el-option label="李四" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目开始日期" :label-width="formLabelWidth">
          <el-date-picker v-model="ruleForm.startDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        
        <el-form-item label="项目介绍" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.introduction" placeholder="请输入项目备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="newProjectVisible = false">提 交</el-button>
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
      newProjectVisible: false,
      ruleForm: {
        projectname: "",
        contractno:"",
        person: "",
        startDate: "",
        introduction: ""
      },
       rules: {
          projectname: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]
        },
      formLabelWidth: "120px",
      value1: "",
      projectList: [0],
      userId: "",
      orderStatus: "",
      loading: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [
        {
          date: "2016-05-03",
          project: "抗震支架M-3501 华新建工集团",
          company: "智聚装配式绿色建筑创新中心南通有限公司",
          person: "张三",
          phone: "15195910513",
          progress: "合同已签订"
        }
      ]
    };
  },
  methods: {
    newProject() {
      this.newProjectVisible = true;
    },
    handleClick(row) {
      console.log(row);
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
    orderDetail(orderId) {
      this.$router.push({
        path: "orderDetail",
        query: {
          orderId: orderId
        }
      });
    }
  },
  created() {
    this.userId = getStore("userId");
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
.required label::before{
  content:'*';
  color: red
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
