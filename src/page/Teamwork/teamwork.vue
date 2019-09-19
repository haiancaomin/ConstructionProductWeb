<template>
  <div class="container" id="app">
    <div class="row submit-comment">
      <textarea name="content" id rows="10" v-model="content" @keydown.enter="add"></textarea>
      <div class="submit-comment-action">
        <el-button @click="add" type="success">提交</el-button>
        <span class="text-muted">(可按Enter 回复)</span>
      </div>
    </div>
    <div class="comment-list">
      <div class="nomess text-muted" v-show="msgData.length==0">
        <h5>暂无留言</h5>
      </div>
      <div class="messlist">
        <div class="reply" v-for="(item,index) in msgData" v-cloak>
          <p class="replyContent">{{item.content}}</p>
          <p class="operation">
            <span class="time">{{item.time}}</span>
          </p>
        </div>
      </div>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      msgData: [],
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
[v-cloak] {
  display: none;
}
.title {
  padding: 20px;
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
  height: auto;
  width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 25px;
  border: #a5bcff solid 1px;
}
textarea {
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
.submit-comment-action span {
  /* display: inline-block; */
  width: 150px;
  float: right;
  text-align: center;
  padding: 10px;
}
.submit-comment-action button {
  /* display: inline-block; */
  float: right;
}
.nomess {
  padding: 5px;
  height: 40px;
  text-align: center;
}
.messlist {
  font-family: "Microsoft YaHei UI";
  font-weight: 300;
}
.reply {
  border-bottom: 1px solid #8d92a0;
}
.replyContent {
  padding: 10px;
}
.operation {
  padding: 10px;
}
.operation .time {
  /* display: inline-block; */
  float: left;
}
.operation .handle {
  float: right;
}
.handle a {
  text-decoration: none;
  display: inline-block;
  padding-right: 5px;
}
.page {
  background-color: #f3f8fd;
  clear: right;
  height: 50px;
  padding: 5px;
}
.pagination {
  margin: 0;
  padding: 0;
  float: right;
}
</style>