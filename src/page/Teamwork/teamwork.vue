<template>
  <div class="container">
    <div class="submit-comment">
      <textarea name="content" id rows="10" v-model="content" @keydown.enter="add"></textarea>
      <div class="submit-comment-action clearfix">
        <el-button @click="add" type="success">提交</el-button>
      </div>
    </div>
    <div class="comment-list">
      <div class="nomess" v-show="msgData.length==0">
        <h5>暂无留言</h5>
      </div>
      <div>
        <div class="reply" v-for="(item,index) in msgData" :key="index" v-cloak>
          <p class="person-name">{{item.creater}}</p>
          <p class="replyContent">{{item.content}}</p>
          <p class="operation">
            <span class="time">{{item.time}}</span>
          </p>
        </div>
      </div>
      <div class="page">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      msgData: [
        {
          content: "真特么帅气",
          time: "2019-9-19 15:22:00",
          creater:'华新集团 - 张三 - 15195910513'
        },
        {
          content:
            "行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。",
          time: "2019-9-19 15:22:00",
          creater:'智聚公司 - 黄徐林 - 15195910513'
        }
      ],
      nowIndex: -100,
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this._orderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._orderList();
    },
    add: function() {},
    getPageData: function(n) {},
    top: function(id, index) {},
    down: function(id, index) {},
    del: function(nowIndex) {},
    send: function() {}
  },
  created: function() {}
};
</script>
<style lang="css" scoped>
.container {
  background: #fff;
}
.submit-comment {
  height: 250px;
  width: 800px;
  margin: 0 auto;
  background-color: #d9edf7;
  padding: 20px 25px;
  border: #a5bcff solid 1px;
}
.comment-list {
  width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 25px;
  border: #a5bcff solid 1px;
}
textarea {
  padding: 5px;
  width: 750px;
  height: 150px;
  border: 1px solid #636c72;
  box-shadow: inset 0 0 5px 2px #a1a3b0;
}
.submit-comment-action {
  padding-top: 10px;
  height: 50px;
  width: 750px;
}

.submit-comment-action button {
  float: right;
}
.nomess {
  padding: 15px;
  text-align: center;
}

.reply {
  border-bottom: 1px solid #8d92a0;
}
.replyContent,
.operation,
.person-name {
  padding: 8px 10px;
  text-align: justify;
}
.person-name,
.time {
  font-size: 12px;
  color: #999;
}
.page {
  background-color: #f3f8fd;
  padding: 10px 5px;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>