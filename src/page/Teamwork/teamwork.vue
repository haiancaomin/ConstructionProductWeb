<template>
  <div class="home">
    <y-shelf title="工作流">
      <div slot="content">
        <div class="container">
          <my-step></my-step>

          <div class="msg-box">
            <div class="stepsTitle">
              <div style="float:left;width:2px;height:20px; background:#219AFF;margin-right:5px"></div>沟通留言区
            </div>
            <div class="submit-comment" v-loading="msgloading" element-loading-text="提交中...">
              <textarea name="content" id rows="10" v-model="content"></textarea>
              <div class="submit-comment-action clearfix">
                <el-button type="success" @click="_sendMsg">提交</el-button>
              </div>
            </div>
            <div class="comment-list">
              <div v-loading="loading" element-loading-text="加载中..." v-if="msgData.length">
                <div class="reply" v-for="(item,index) in msgData" :key="index" v-cloak>
                  <p class="person-name">{{item.companyname}} - {{item.name}} - {{item.phone}}</p>
                  <p class="replyContent">{{item.content}}</p>
                  <p class="operation">
                    <span class="time">{{item.createdate}}</span>
                  </p>
                </div>
              </div>
              <div class="no-info" v-loading="loading" element-loading-text="加载中..." v-else>
                <h5>暂无留言</h5>
              </div>
              <div class="page clearfix">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
import { getMsgList, sendMsg } from "/api";
import { getStore } from "/utils/storage";
import myStep from "/components/myStep";
import YShelf from "/components/shelf";
export default {
  data() {
    return {
      content: "",
      msgData: [],
      nowIndex: -100,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pid: "",
      loading: false,
      msgloading: false,
      content: "",
      userid: ""
    };
  },
  components: {
    myStep,
    YShelf
  },
  methods: {
    _getMsgList(pid) {
      this.loading = true;
      let params = new URLSearchParams();
      params.append("projectid", pid);
      params.append("selectIndex", this.currentPage);
      params.append("pageIndex", (this.currentPage - 1) * 10);
      getMsgList(params).then(res => {
        this.loading = false;
        this.msgData = res.data;
        this.total = res.count;
      });
    },

    _sendMsg() {
      if (this.content.trim() == "") {
        this.$message.error({
          message: "内容不能为空！"
        });
        return;
      }
      this.msgloading = true;
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("projectid", this.pid);
      params.append("content", this.content);
      sendMsg(params).then(res => {
        this.msgloading = false;
        if (res.data == 0) {
          this.$message({
            message: "留言成功！",
            type: "success",
            center: true
          });
          this._getMsgList(this.pid);
          this.content = ""; //重置
        } else {
          this.$message.error({
            message: "留言失败！"
          });
        }
      });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this._getMsgList(this.pid);
    }
  },
  created() {
    this.pid = this.$route.query.pid;
    this.userid = getStore("zjzp_userid");
    this._getMsgList(this.pid);
  }
};
</script>
<style lang="css" scoped>
.stepsTitle {
  margin: 10px 0px 10px 10px;
}
.gray-box {
  width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
}
.home {
  background-color: #f6f7fb;
}
.container {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  padding: 20px 0;
}
.msg-box {
  flex: 1;
  margin-left: 30px;
  background: #fff;
  padding: 20px;
  padding-top: 10px;
}
.submit-comment {
  height: 250px;
  width: 100%;
  margin: 0 auto;
  background-color: #d9edf7;
  padding: 20px 25px;
  border: #a5bcff solid 1px;
}
.comment-list {
  width: 100%;
  margin: 25px auto 40px;
  border: #a5bcff solid 1px;
  background: #fff;
}
textarea {
  padding: 5px;
  width: 100%;
  height: 150px;
  border: 1px solid #636c72;
  box-shadow: inset 0 0 5px 2px #a1a3b0;
}
.submit-comment-action {
  padding-top: 10px;
  height: 50px;
  width: 100%;
}

.submit-comment-action button {
  float: right;
}
.nomess {
  padding: 15px;
  text-align: center;
}
.no-info {
  text-align: center;
  line-height: 50px;
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
.el-pagination {
  float: right;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>