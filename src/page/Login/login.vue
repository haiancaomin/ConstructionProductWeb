<template>
  <div class="login v2">
    <!-- <y-header>
    </y-header>-->
    <div class="wrapper">
      <div class="login_head">
        <div class="login_head_zone">
          <div class="logo_zhuangpei_img_div">
            <router-link to="/">
              <img src="/static/images/nav_logo.png" class="logo_zhuangpei_img" />
            </router-link>
          </div>
          <div class="gotoIndexBtn">
            <router-link to="/">
              <div class="toBtn">首页</div>
            </router-link>
            <div class="split_line_div">
              <div class="split_line"></div>
            </div>
            <router-link to="/goods">
              <div class="toBtn">产品分类</div>
            </router-link>
            <div class="split_line_div">
              <div class="split_line"></div>
            </div>
            <router-link to="/admin">
              <div class="toBtn">协同办公</div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="login_outbody">
        <div class="login_body">
          <div class="login_zone">
            <div class="dialog_title">账号登录</div>
            <div class="errorMsg" v-show="errMsg != ''">{{errMsg}}</div>
            <form>
              <div class="username_input_div">
                <div class="username_input_icon_div">
                  <i class="iconfont_username">&#xe735;</i>
                </div>
                <input type="text" placeholder="用户名" class="username_input" v-model="userName" />
              </div>
              <div class="user_password_div">
                <div class="user_password_icon_div">
                  <i class="iconfont_password">&#xe6fc;</i>
                </div>
                <input type="password" placeholder="密码" class="user_password" v-model="userPwd" />
              </div>
              <div class="code_div">
                <div class="code_icon_div">
                  <i class="iconfont_code">&#xe63d;</i>
                </div>
                <input type="text" placeholder="验证码" class="code_input" v-model="captcha" />
                <img :src="caodeImg" class="code_img" @click="_createCodeFun()" />
              </div>

              <div class="submit_btn" @click="login()">登&nbsp;录</div>
            </form>
          </div>
        </div>
      </div>

      <div class="foot_outbody_div">
        <div class="foot_div">
          <div class="foot_con">地址：南通市开发区通盛大道188号C座6楼 联系电话：0513-81055866 (工作时间：工作日10点--17点)</div>
          <div class="foot_con">©2018-2019 All Rights Reserved 智聚装配式绿色建筑创新中心南通有限公司 版权所有</div>
        </div>
      </div>
      <!-- <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title">
          <h4>使用 智聚装配 账号 登录</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.userName" placeholder="账号">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="text" v-model="ruleForm.captcha" placeholder="验证码"/>
                &nbsp;&nbsp;&nbsp;
                <img id="imageCode" :src="imageCode" @click="init_geetest()"/>
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <el-checkbox class="auto-login" v-model="autoLogin">记住密码</el-checkbox>
             
              <a href="javascript:;" class="register" @click="toRegister">注册 GPmall 账号</a>
              <a style="padding: 1px 0 0 10px" @click="open('找回密码','请联系作者邮箱找回密码或使用测试账号登录：test | test')">忘记密码 ?</a>
            </li>
          </ul>
         
          <div style="margin-top: 25px">
            <y-button :text="logintxt"
                      :classStyle="ruleForm.userPwd&& ruleForm.userName&& logintxt === '登录'?'main-btn':'disabled-btn'"
                      @btnClick="login"
                      style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"></y-button>
          </div>
         
          <div>
            <y-button text="返回" @btnClick="login_back"
              style="marginTop: 10px;marginBottom: 15px;width: 100%;height: 48px;font-size: 18px;line-height: 48px">
            </y-button>
          </div>
          <div class="border"></div>
          <div class="footer">
            <div class="other">其它账号登录：</div>
            <a><img @click="open('待开发','此功能开发中...')" style="height: 15px; margin-top: 22px;" src="/static/images/other-login.png"></a>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script src="../../../static/geetest/gt.js"></script>
<script>
// import YHeader from '/common/header'
import YFooter from "/common/footer";
import YButton from "/components/YButton";
import {
  userLogin,
  initKaptcha,
  createCodeFun,
  userLoginFun
} from "/api/index.js";
import { addCart } from "/api/goods.js";
import { setStore, getStore, removeStore } from "/utils/storage.js";
require("../../../static/geetest/gt.js");
export default {
  data() {
    return {
      cart: [],
      loginPage: true,
      registered: {
        userName: "",
        userPwd: "",
        userPwd2: "",
        errMsg: ""
      },
      autoLogin: false,
      logintxt: "登录",
      imageCode: "",
      userName: "",
      userPwd: "",
      captcha: "",
      errMsg: "",
      caodeImg: ""
    };
  },
  computed: {
    count() {
      return this.$store.state.login;
    }
  },
  methods: {
    _createCodeFun() {
      createCodeFun().then(res => {
        this.caodeImg = res.data;
      });
    },
    open(t, m) {
      this.$notify.info({
        title: t,
        message: m
      });
    },
    messageSuccess() {
      this.$message({
        message: "恭喜您，注册成功！赶紧登录体验吧",
        type: "success"
      });
    },
    message(m) {
      this.$message.error({
        message: m
      });
    },
    getRemembered() {
      var judge = getStore("remember");
      if (judge === "true") {
        this.autoLogin = true;
        this.ruleForm.userName = getStore("rusername");
        this.ruleForm.userPwd = getStore("rpassword");
      }
    },
    rememberPass() {
      if (this.autoLogin === true) {
        setStore("remember", "true");
        setStore("rusername", this.ruleForm.userName);
        setStore("rpassword", this.ruleForm.userPwd);
      } else {
        setStore("remember", "false");
        removeStore("rusername");
        removeStore("rpassword");
      }
    },
    toRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    // 登录返回按钮
    login_back() {
      this.$router.go(-1);
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart() {
      let cartArr = [];
      let locaCart = JSON.parse(getStore("buyCart"));
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore("userId"),
            productId: item.productId,
            productNum: item.productNum
          });
        });
      }
      this.cart = cartArr;
    },
    login() {
      this.logintxt = "登录中...";
      this.rememberPass();
      if (this.userName == "" || this.userPwd == "") {
        this.errMsg = "账号或密码不能为空!";
      } else if (this.userName.length > 20) {
        this.errMsg = "用户名不能超过20个字符!";
      } else if (this.userPwd.length > 20) {
        this.errMsg = "密码不能超过20个字符!";
      } else if (this.captcha == "") {
        this.errMsg = "验证码不能为空!";
      } else if (this.captcha.length > 10) {
        this.errMsg = "验证码错误!";
      } else {
        let paramLogin = new URLSearchParams();
        paramLogin.append("userName", this.userName);
        paramLogin.append("userPwd", this.userPwd);
        paramLogin.append("code", this.captcha);
        userLoginFun(paramLogin).then(res => {
          console.log(res.data);
          if (res.errMsg == "用户名或密码错误") {
            this.errMsg = "";
            this._createCodeFun();
            this.$message({
              message: "用户名或密码错误！",
              type: "error",
              center: true
            });
          } else if (res.errMsg == "用户名或密码不能为空") {
            this.errMsg = "";
            this._createCodeFun();
            this.$message({
              message: "用户名或密码不能为空！",
              type: "error",
              center: true
            });
          } else if (res.errMsg == "验证码错误") {
            this.errMsg = "";
            this._createCodeFun();
            this.$message({
              message: "验证码错误！",
              type: "error",
              center: true
            });
          } else {
            this.$message({
              message: "登录成功！",
              type: "success",
              center: true
            });
            setStore("zjzp_userid", res.data.userid);
            setStore("zjzp_name", res.data.name);
            setStore("zjzp_token", res.data.token);
            
            this.$router.go(-1);
          }
        });
      }
    },
    init_geetest() {
      initKaptcha().then(res => {
        this.imageCode = "data:image/gif;base64," + res.result;
      });
    }
  },
  mounted() {
    this._createCodeFun();
    // this.getRemembered();
    // this.login_addCart();
    // this.init_geetest();
    // this.open('登录提示', '测试体验账号密码：test | test')
  },
  components: {
    // YHeader,
    YFooter,
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  // position: relative;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/login_bg.jpg) no-repeat;
    // background-size: 100%;
    background-size: cover;
    // background-position:center;
    overflow: hidden;
    min-height: 750px;
    min-width: 1280px;

    // min-height: 800px;
    // min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(/static/images/logo_login.png);
    background-size: 240px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .register {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
.login_head {
  width: 100%;
  height: 40px;
  background: #1e1b29;
}
.login_head_zone {
  width: 1280px;
  margin: 0 auto;
  display: flex;
}
.logo_zhuangpei_img_div {
  height: 40px;
  display: flex;
  align-items: center;
}
.logo_zhuangpei_img {
  height: 28px;
  width: 130px;
}
.gotoIndexBtn {
  height: 40px;
  line-height: 40px;
  margin-left: 950px;
  display: flex;
}
.toBtn {
  color: #aaabaf;
  transition: all 0.3s;
}
.toBtn:hover {
  color: #f0f0f0;
}
.split_line_div {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
}
.split_line {
  width: 2px;
  height: 14px;
  border-left: 1px solid #aaabaf;
}
.login_outbody {
  width: 100%;
  height: 431px;
}
.login_body {
  width: 1280px;
  margin: 0 auto;
}
.login_zone {
  width: 350px;
  background: rgba(0, 0, 0, 0.6);
  margin: 150px 0 0 850px;
  padding-bottom: 40px;
}
.dialog_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px #cf1132 solid;
  color: #cf1132;
}
.username_input_div {
  width: 100%;
  margin: 30px 0px 0px 0px;
  display: flex;
  justify-content: center;
}
.username_input_icon_div {
  width: 44px;
  height: 44px;
  background: #aaabab;
  line-height: 44px;
  text-align: center;
}
.username_input {
  width: 240px;
  height: 44px;
  box-sizing: border-box;
  padding: 0 10px;
}
.user_password_div {
  margin: 25px 0px 0px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.user_password_icon_div {
  width: 44px;
  height: 44px;
  background: #aaabab;
  line-height: 44px;
  text-align: center;
}
.user_password {
  width: 240px;
  height: 44px;
  box-sizing: border-box;
  padding: 0 10px;
}
.code_div {
  margin: 25px 0px 0px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.code_icon_div {
  width: 44px;
  height: 44px;

  background: #aaabab;
  line-height: 44px;
  text-align: center;
}
.code_input {
  width: 130px;
  height: 44px;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 0 10px;
}
.code_img {
  height: 44px;
  width: 100px;
  cursor: pointer;
}
.submit_btn {
  width: 284px;
  height: 44px;
  background: #cf1132;
  margin: 25px auto 0;
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.foot_outbody_div {
  position: absolute;
  width: 100%;
  bottom: 50px;
}
.foot_div {
  width: 1280px;
  margin: 0 auto;
}
.foot_con {
  color: #fff;
  text-align: center;
  margin-top: 8px;
  width: 100%;
}
.errorMsg {
  box-sizing: border-box;
  margin: 30px auto 0;
  padding-left: 10px;
  font-size: 12px;
  color: #4d4d4d;
  width: 284px;
  height: 28px;
  line-height: 28px;
  background: #fdeee9;
  border: 1px solid #fadcd3;
}
@font-face {
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_now8zjimxyn.eot");
  src: url("//at.alicdn.com/t/font_1414486_now8zjimxyn.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_now8zjimxyn.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_now8zjimxyn.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_now8zjimxyn.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_now8zjimxyn.svg#iconfont") format("svg");
}
.iconfont_username {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
.iconfont_password {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
.iconfont_code {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
</style>
