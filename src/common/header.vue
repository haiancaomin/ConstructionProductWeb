<template>
  <div class="header-box">
    <el-dialog title="留言板" :visible.sync="messageBoardFlag" id="messageBoard">
      <div class="message_board_notice1">留言内容</div>
      <el-input type="textarea" v-model="messageBoardDesc" id="messageBoardTextarea"></el-input>
      <div class="message_board_notice2">联系方式（请留下您的手机号或电话号码，方便我们联系您）</div>
      <el-input v-model="userPhone"></el-input>
      <div class="message_board_submit_btn" @click="_messageBoardFun()">提交</div>
    </el-dialog>

    <div class="suspension_frame">
      <div
        class="suspension_zone1"
        @mouseenter="showBoard"
        @mouseleave="hideBoard"
        @click="messageBoardFlag=true"
      >
        <i class="iconfont_suspension" v-show="!showBoradHover">&#xe663;</i>
        <div class="hover_div1" v-show="showBoradHover">我要留言</div>
      </div>
      <div class="split_line">
        <div class="line_div"></div>
      </div>
      <div
        class="suspension_zone2"
        @mouseenter="showConnectionInfo"
        @mouseleave="hideConnectionInfo"
      >
        <i class="iconfont_suspension" v-show="!showConnectionHover">&#xe60f;</i>
        <div class="hover_div2" v-show="showConnectionHover">联系我们</div>
      </div>
      <div class="split_line">
        <div class="line_div"></div>
      </div>
      <div class="suspension_zone3" @mouseenter="showAttention" @mouseleave="hideAttention">
        <i class="iconfont_suspension" v-show="!showAttentionHover">&#xe63c;</i>
        <div class="hover_div3" v-show="showAttentionHover">关注我们</div>
      </div>
    </div>
    <div
      class="connection_info"
      v-show="connectionShow"
      @mouseenter="showConnectionInfo"
      @mouseleave="hideConnectionInfo"
    >
      <div class="connection_info_detail">电话：</div>
      <div class="connection_info_detail">0513-81055866</div>
      <div class="connection_info_detail"></div>
      <div class="connection_info_detail">邮箱：</div>
      <div class="connection_info_detail">MKT_Dept@zhjcx.cn</div>
    </div>
    <div
      class="connection_info_arrow"
      v-show="connectionShow"
      @mouseenter="showConnectionInfo"
      @mouseleave="hideConnectionInfo"
    ></div>

    <div
      class="erweima_body"
      v-show="showAttentionHover"
      @mouseenter="showAttention"
      @mouseleave="hideAttention"
    >
      <img src="/static/images/erweima.jpg" class="erweima_img" />
    </div>
    <div
      class="erweima_arrow"
      v-show="showAttentionHover"
      @mouseenter="showAttention"
      @mouseleave="hideAttention"
    ></div>

    <div>
      <header class="w">
        <div class="w-box">
          <router-link to="/" title="智聚装配">
            <div class="nav-logo">
              <img class="big_index_logo" src="/static/images/favicon.png" />智聚装配
            </div>
          </router-link>
          <div class="nav_search_head index_search_input_head">
            <el-input
              placeholder="请输入商品名称"
              icon="search"
              v-model="input"
              :on-icon-click="handleIconClick"
              @keydown.enter.native="handleIconClick"
            ></el-input>
          </div>
          <div class="right-box" @click="gotoLogin()" v-if="username == ''">
            用户登录
            <i class="iconfont_user">&#xe6fd;</i>
          </div>
          <el-dropdown :show-timeout="0" :hide-timeout="500" @command="handleCommand" v-else>
            <div class="hava_user">欢迎回来，{{username}}</div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="teamWork">项目协同</el-dropdown-item>
              <el-dropdown-item command="changePw">修改密码</el-dropdown-item>
              <el-dropdown-item command="logOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <slot name="nav">
        <div class="nav-sub">
          <div class="zfixed" v-show="st">
            <div class="w">
              <div class="logo_zhuangpei_sub_div">
                <img src="/static/images/nav_logo.png" class="logo_zhuangpei_sub_img" />
              </div>
              <ul class="nav-list2">
                <li>
                  <router-link to="/">
                    <div @click="changGoods(1)" :class="{active:choosePage===1}">首页</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/goods">
                    <div @click="changGoods(2)" :class="{active:choosePage===2}">产品分类</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin">
                    <div @click="changGoods(3)" :class="{active:choosePage===3}">项目协同</div>
                  </router-link>
                </li>
              </ul>
              <div class="nav-search index_search_input">
                <el-input
                  placeholder="请输入商品名称"
                  icon="search"
                  v-model="input"
                  :on-icon-click="handleIconClick"
                  @keydown.enter.native="handleIconClick"
                ></el-input>
              </div>
              <div class="shpping_cart" v-if="username == ''" @click="gotoLogin()">
                用户登录
                <i class="iconfont_user white_bg">&#xe6fd;</i>
              </div>
              <el-dropdown
                :show-timeout="0"
                :hide-timeout="500"
                @command="handleCommand"
                v-if="username != ''"
              >
                <div class="shpping_cart_hava_user">{{username}}</div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="teamWork">项目协同</el-dropdown-item>
                  <el-dropdown-item command="changePw">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logOut">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

          <div class="nav-sub-wrapper">
            <div class="w">
              <ul class="nav-list2">
                <li>
                  <router-link to="/">
                    <div @click="changGoods(1)" :class="{active:choosePage===1}">首页</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/goods">
                    <div @click="changGoods(2)" :class="{active:choosePage===2}">产品分类</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin">
                    <div @click="changGoods(3)" :class="{active:choosePage===3}">项目协同</div>
                  </router-link>
                </li>
              </ul>
              <div _ngcontent-c1 class="container" v-if="!st">
                <ul _ngcontent-c1 class="nav-list">
                  <!---->
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 title="智聚官网" href="http://zhjcx.cn" target="_blank">智聚官网</a>
                  </li>
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 class="active" title="智聚装配" href="/" target>智聚装配</a>
                  </li>
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 title="智聚实训" href="http://www.智聚实训.cn" target="_blank">智聚实训</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { getStore, removeStore } from "/utils/storage";
import { messageBoardFun } from "/api/index";

export default {
  data() {
    return {
      input: "",
      choosePage: -1,
      token: "",
      navList: [],
      connectionShow: false,
      showConnectionHover: false,
      showBoradHover: false,
      showAttentionHover: false,
      messageBoardFlag: false,
      messageBoardDesc: "",
      userPhone: "",
      username: "",
      st: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("/product") >= 0) {
        this.changePage(2);
      } else if (to.fullPath.indexOf("/home") >= 0) {
        this.changePage(1);
      } else if (to.fullPath.indexOf("/goods") >= 0) {
        this.changePage(2);
      } else if (to.fullPath.indexOf("/admin") >= 0) {
        this.changePage(3);
      }
    },
    messageBoardFlag: function(val) {
      if (!val) {
        this.messageBoardDesc = "";
        this.userPhone = "";
      }
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "logOut") {
        this.logOut();
      } else if (command == "teamWork") {
        this.$router.push({ path: `/admin/member` });
      } else if (command == "changePw") {
        this.$router.push({
        path: "/login",
        query: {
          changePassword: true
        }
      });
      }
    },
    logOut() {
      removeStore("zjzp_userid");
      removeStore("zjzp_name");
      removeStore("zjzp_phone");
      removeStore("zjzp_token");
      removeStore("zjzp_role");
           

      this.username = "";
      this.$router.push({ path: "/home" });
    },
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    _messageBoardFun() {
      let paramz = new URLSearchParams();
      if (this.messageBoardDesc.trim() == "") {
        this.$message({
          message: "留言内容不要为空",
          type: "error",
          center: true
        });
      } else if (this.messageBoardDesc.length > 100) {
        this.$message({
          message: "内容不能超过100个字符",
          type: "error",
          center: true
        });
      } else if (this.userPhone.trim() == "") {
        this.$message({
          message: "请留下您的联系方式",
          type: "error",
          center: true
        });
      } else if (this.userPhone.length > 15) {
        this.$message({
          message: "手机号或电话号码过长",
          type: "error",
          center: true
        });
      } else {
        paramz.append("question", this.messageBoardDesc);
        paramz.append("phone", this.userPhone);
        messageBoardFun(paramz).then(res => {
          this.messageBoardFlag = false;
          this.$message({
            message: "提交成功！",
            type: "success",
            center: true
          });
        });
      }
    },
    showAttention() {
      this.showAttentionHover = true;
    },
    hideAttention() {
      this.showAttentionHover = false;
    },
    showBoard() {
      this.showBoradHover = true;
    },
    hideBoard() {
      this.showBoradHover = false;
    },
    showConnectionInfo() {
      this.connectionShow = true;
      this.showConnectionHover = true;
    },
    hideConnectionInfo() {
      this.connectionShow = false;
      this.showConnectionHover = false;
    },
    handleIconClick() {
      if (this.$route.query.keyWord == this.input) {
        if (this.input.toString().trim() != this.input) {
          this.input = this.input.toString().trim();
        } else {
          this.input = this.input + " ";
        }
      }
      this.$router.push({
        path: "/goods",
        query: {
          keyWord: this.input
        }
      });
    },
    changePage(v) {
      this.choosePage = v;
    },
    changGoods(v, item) {
      this.changePage(v);
    },
    navFixed() {
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      st >= 100 ? (this.st = true) : (this.st = false);
    }
  },
  mounted() {
    let that = this;
    this.bus.$on("clearKeyWord", function(val) {
      that.input = val.keyWord;
    });
    if (getStore("zjzp_name")) {
      this.username = getStore("zjzp_name");
    }
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
    this.$route.query.keyWord = "";
    if (this.$router.history.current.path == "/home") {
      this.changePage(1);
    } else if (this.$router.history.current.path == "/goods") {
      this.changePage(2);
    } else if (
      this.$router.history.current.path.toString().indexOf("/admin") >= 0
    ) {
      this.changePage(3);
    } else if (
      this.$router.history.current.path.toString().indexOf("/product") >= 0
    ) {
      this.changePage(2);
    } else if (
      this.$router.history.current.path.toString().indexOf("/teamwork") >= 0
    ) {
      this.changePage(3);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/mixin";

.logo_zhuangpei_sub_div {
  height: 60px;
  width: 200px;
  display: flex;
  align-items: center;
  .logo_zhuangpei_sub_img {
    height: 30px;
    width: 130px;
  }
}
.zfixed {
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 5s;
  z-index: 999999999999;
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: rgb(46, 51, 62);
  .nav-list2 {
    display: flex;
    height: 100%;
    width: 650px;
    li {
      position: relative;
      width: 120px;
      text-align: center;
      div {
        font-size: 16px;
        color: #fff;
        &.active {
          color: #39cf41;
          font-weight: 100;
          border: 0px solid #333;
        }
      }
      div:hover {
        color: #ffd04b;
      }
    }
  }
  .nav-search {
    position: relative;
    width: 250px;
    .el-autocomplete {
      width: 100%;
    }
  }
  .shpping_cart {
    width: 90px;
    font-size: 14px;
    color: #fff;
    margin-left: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    // font-weight: 100;
  }
  .shpping_cart:hover {
    color: #39cf41;
  }
  .shpping_cart:hover .iconfont_user {
    color: #39cf41;
  }
  .shpping_cart_hava_user {
    width: 90px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin-left: 30px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: underline;
    transition: all 0.3s;
  }
  .shpping_cart_hava_user:hover {
    color: #39cf41;
  }
}
.header-box {
  background: #fff;
  width: 100%;
  padding-top: 25px;
}
header {
  height: 50px;
  z-index: 30;
  position: relative;
}
.w-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 0 20px 0;
  h1 {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .right-box {
    display: flex;
    margin-right: 20px;
    height: 30px;
    line-height: 30px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
  }
  .right-box:hover {
    color: #cf1132;
  }
  .right-box:hover .iconfont_user {
    color: #cf1132;
    font-weight: 100;
  }
}

.nav-sub {
  position: relative;
  z-index: 20;
  background: #f7f7f7;
  width: 100%;
  .nav-sub-wrapper {
    background: #fff;
    position: relative;
    .nav-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px 0 20px 220px;
      .el-autocomplete {
        width: 305px;
      }
      a {
        width: 110px;
        color: #666;
        display: block;
        font-size: 14px;
        padding: 0 25px;
        &:hover {
          color: #39cf41;
        }
      }
      a:nth-child(2) {
        margin-left: -10px;
      }
    }
    .nav-list2 {
      position: relative;
      display: flex;
      width: 650px;

      li {
        position: relative;
        width: 120px;
        text-align: center;
        cursor: pointer;
        div {
          font-size: 16px;
          color: #333;
          height: 40px;
          font-family: "Microsoft YaHei";
          &.active {
            color: #cf1132;
            font-weight: bold;
            border-bottom: 2px solid #cf1132;
          }
        }
        div:hover {
          color: #cf1132;
        }
      }
    }
    .nav-search {
      position: relative;
      width: 250px;
      .el-autocomplete {
        width: 100%;
      }
    }
    &:after {
      content: " ";
      position: absolute;
      top: 89px;
      left: 50%;
      margin-left: -610px;
      width: 1220px;
      background: #000;
      height: 1px;
      display: none;
      opacity: 0;
      -webkit-transition: opacity 0.3s ease-in;
      transition: opacity 0.3s ease-in;
    }
  }
  .w {
    display: flex;
    position: relative;
  }
}
@font-face {
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.eot");
  src: url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_ftssw8yz3u.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 3px;
}
.iconfont_user {
  font-family: "iconfont" !important;
  font-size: 28px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 3px;
  color: #999;
  transition: all 0.3s;
}
.white_bg {
  color: #f2f2f2;
}
.w-box .nav_search_head {
  width: 320px;
}
.w-box .nav_search_head .el-autocomplete {
  width: 320px;
}
.nav-logo {
  display: flex;
  align-items: center;
  font-size: 23px;
  color: #555;
  font-weight: bold;
  font-weight: "Microsoft YaHei";
}
.big_index_logo {
  width: 28px;
  height: 28px;
  margin-right: 4px;
}
.suspension_frame {
  position: fixed;
  right: 20px;
  bottom: 200px;
  z-index: 99;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}
.suspension_zone1 {
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
}
.suspension_zone2 {
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1px;
}
.suspension_zone3 {
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1px;
}
.split_line {
  display: flex;
  align-items: center;
  width: 60px;
  background: #fff;
  height: 10px;
  cursor: pointer;
}
.line_div {
  width: 50px;
  border-top: 1px solid #ccc;
  height: 2px;
  margin: auto;
}
.iconfont_suspension {
  font-family: "iconfont" !important;
  font-size: 26px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.hover_div1 {
  background: #49af4f;
  color: #fff;
  padding: 10px;
  width: 58px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.hover_div2 {
  background: #49af4f;
  color: #fff;
  padding: 10px;
  width: 58px;
  text-align: center;
  cursor: pointer;
}
.hover_div3 {
  background: #49af4f;
  color: #fff;
  padding: 10px;
  width: 58px;
  text-align: center;
  cursor: pointer;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.connection_info {
  position: fixed;
  bottom: 250px;
  right: 75px;
  width: 150px;
  height: 100px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  z-index: 199;
  padding: 10px 0;
}
.connection_info_detail {
  width: 100%;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #333;
  font-size: 12px;
  font-weight: bold;
}
.connection_info_arrow {
  border: 1px solid #ccc;
  border-width: 7px 4px;
  border-color: transparent transparent transparent #fff;
  width: 0;
  height: 0;
  position: fixed;
  bottom: 290px;
  right: 68px;
  z-index: 399;
}
.erweima_body {
  position: fixed;
  bottom: 180px;
  right: 75px;
  width: 100px;
  height: 100px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  z-index: 199;
  padding: 5px;
}
.erweima_img {
  width: 90px;
  width: 90px;
}
.erweima_arrow {
  border: 1px solid #ccc;
  border-width: 7px 4px;
  border-color: transparent transparent transparent #fff;
  width: 0;
  height: 0;
  position: fixed;
  bottom: 220px;
  right: 68px;
  z-index: 399;
}
.message_board_notice1 {
  line-height: 30px;
}
.message_board_notice2 {
  margin-top: 20px;
  line-height: 30px;
}
.message_board_submit_btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #409eff;
  margin: 20px auto 0;
  cursor: pointer;
}
.message_board_submit_btn:hover {
  background: rgb(120, 184, 248);
}
.login_logo_div {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #555;
  font-weight: bold;
  font-weight: "Microsoft YaHei";
}
.login_logo {
  width: 25px;
  height: 25px;
  margin-right: 4px;
}
.form_body {
  margin-top: 20px;
}
.el-button {
  width: 100%;
  height: 42px;
  border-radius: 0px;
}
.hava_user {
  cursor: pointer;
  text-decoration: underline;
  font-family: "Microsoft YaHei";
  transition: all 0.3s;
}
.hava_user:hover {
  color: #cf1132;
}
</style>
<style>
.index_search_input .el-input input {
  height: 34px;
  border-radius: 17px;
}
.index_search_input_head .el-input input {
  height: 36px;
  border-radius: 18px;
}
#messageBoard .el-dialog__header {
  text-align: center;
}
#messageBoard .el-dialog--small {
  width: 500px;
}
#messageBoard .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
#messageBoardTextarea .el-textarea__inner {
  height: 100px;
}
</style>