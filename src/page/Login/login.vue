<template>
  <div class="login">
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
          <div class="login_zone" v-if="loginFlag == 1">
            <div class="dialog_title">账号登录</div>
            <div class="errorMsg" v-show="errMsg != ''">{{errMsg}}</div>
            <form>
              <div class="username_input_div">
                <div class="username_input_icon_div">
                  <i class="iconfont_username">&#xe735;</i>
                </div>
                <input type="text" placeholder="用户名/手机号" class="username_input" v-model="userName" />
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
            <div class="forget_password_div">
              <span @click="loginFlag=2">忘记密码？</span>
            </div>
          </div>

          <div class="login_zone" v-if="loginFlag == 2">
            <div class="dialog_title_f">忘记密码</div>
            <div class="errorMsg" v-show="errMsg != ''">{{errMsg}}</div>
            <form>
              <div class="username_input_div">
                <div class="username_input_icon_div">
                  <i class="iconfont_username">&#xe735;</i>
                </div>
                <input
                  type="text"
                  placeholder="请输入您的登录手机号"
                  class="username_input"
                  v-model="f_phone"
                />
              </div>
              <div class="user_password_div">
                <div class="user_password_icon_div">
                  <i class="iconfont_password">&#xe6fc;</i>
                </div>
                <input
                  type="password"
                  placeholder="请输入新密码"
                  class="user_password"
                  v-model="f_password"
                />
              </div>
              <div class="code_div">
                <div class="code_icon_div">
                  <i class="iconfont_code">&#xe63d;</i>
                </div>
                <input type="text" placeholder="手机验证码" class="code_input" v-model="f_code" />
                <div class="get_code_btn" v-if="show" @click="getCode()">获取验证码</div>
                <div class="hava_submit_code_btn" v-if="!show">{{count}} 秒后重发</div>
              </div>
              <div class="code_notice">温馨提示：每个手机号每天最多能接收5次验证码</div>
              <div class="submit_btn_f" @click="submintNewPassword()">确&nbsp;认</div>
            </form>
            <div class="forget_password_div_f">
              <span @click="loginFlag=1">去登录</span>
            </div>
          </div>

          <div class="login_zone_3" v-if="loginFlag == 3">
            <div class="dialog_title_f">修改密码</div>
            <div class="errorMsg" v-show="errMsg != ''">{{errMsg}}</div>
            <form>
              <div class="username_input_div">
                <div class="username_input_icon_div">
                  <i class="iconfont_username">&#xe735;</i>
                </div>
                <input
                  type="text"
                  placeholder="请输入您的登录手机号"
                  class="username_input lock_phone"
                  v-model="f_phone"
                  disabled
                />
              </div>
              <div class="user_password_div">
                <div class="user_password_icon_div">
                  <i class="iconfont_password">&#xe6fc;</i>
                </div>
                <input
                  type="password"
                  placeholder="请输入新密码"
                  class="user_password"
                  v-model="f_password"
                />
              </div>
              <div class="code_div">
                <div class="code_icon_div">
                  <i class="iconfont_code">&#xe63d;</i>
                </div>
                <input type="text" placeholder="手机验证码" class="code_input" v-model="f_code" />
                <div class="get_code_btn" v-if="show" @click="getCode()">获取验证码</div>
                <div class="hava_submit_code_btn" v-if="!show">{{count}} 秒后重发</div>
              </div>
              <div class="code_notice">温馨提示：每个手机号每天最多能接收5次验证码</div>
              <div class="submit_btn_f" @click="submintNewPassword()">确&nbsp;认</div>
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
    </div>
  </div>
</template>
<script>
import {
  createCodeFun,
  userLoginFun,
  getPhoneCodeFun,
  submintNewPasswordFun
} from "/api/index.js";
import { setStore, getStore } from "/utils/storage";
export default {
  data() {
    return {
      userName: "",
      userPwd: "",
      captcha: "",
      errMsg: "",
      caodeImg: "",
      loginFlag: 1,
      f_phone: "",
      f_password: "",
      f_code: "",
      show: true,
      count: "",
      timer: null
    };
  },
  watch: {
    loginFlag: function(val) {
      this.errMsg = "";
      if (val==1) {
        this.f_phone = "";
        this.f_password = "";
        this.f_code = "";
      } else if((val==2)){
        this.userName = "";
        this.userPwd = "";
        this.captcha = "";
      }
    }
  },
  methods: {
    submintNewPassword() {
      if (this.f_phone == "") {
        this.errMsg = "手机号不能为空!";
      } else if (this.f_password == "") {
        this.errMsg = "新密码不能为空!";
      } else if (this.f_phone.length != 11) {
        this.errMsg = "请输入正确的手机号!";
      } else if (this.f_password.length < 6) {
        this.errMsg = "密码不能少于6个字符!";
      } else if (this.f_password.length > 12) {
        this.errMsg = "密码不能超过12个字符!";
      } else if (this.f_code == "") {
        this.errMsg = "验证码不能为空!";
      } else if (this.f_code.length > 10) {
        this.errMsg = "验证码错误!";
      } else {
        let paramSubmit = new URLSearchParams();
        paramSubmit.append("newpassword", this.f_password);
        paramSubmit.append("phone", this.f_phone);
        paramSubmit.append("code", this.f_code);
        submintNewPasswordFun(paramSubmit).then(res => {
          if (res.data == 0) {
            this.loginFlag = 1;
            this.$message({
              message: "修改成功",
              type: "success",
              center: true
            });
          } else if (res.data == 1) {
            this.$message({
              message: "验证码错误！",
              type: "error",
              center: true
            });
          } else if (res.data == 2) {
            this.$message({
              message: "该手机号不能访问本平台，请仔细确认您的登陆手机号！",
              type: "error",
              center: true
            });
          }
        });
      }
    },
    getCode() {
      if (this.f_phone.trim() == "") {
        this.$message({
          message: "请先输入手机号！",
          type: "error",
          center: true
        });
      } else if (this.f_phone.trim().length != 11) {
        this.$message({
          message: "请输入正确的手机号！",
          type: "error",
          center: true
        });
      } else {
        let paramCode = new URLSearchParams();
        paramCode.append("phone", this.f_phone);
        getPhoneCodeFun(paramCode).then(res => {
          if (res.data == 1) {
            this.$message({
              message: "该手机号今日收取验证码数量已达上限!",
              type: "error",
              center: true
            });
          } else if (res.data == 0) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          }
        });
      }
    },
    _createCodeFun() {
      createCodeFun().then(res => {
        this.caodeImg = res.data;
      });
    },
    login() {
      if (this.userName == "" || this.userPwd == "") {
        this.errMsg = "账号或密码不能为空!";
      } else if (this.userName.length > 20) {
        this.errMsg = "用户名不能超过20个字符!";
      } else if (this.userPwd.length > 12) {
        this.errMsg = "密码不能超过12个字符!";
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
            setStore("zjzp_phone", res.data.phone);
            setStore("zjzp_role", res.data.role);
            setStore("zjzp_token", res.data.token);

            this.$router.go(-1);
          }
        });
      }
    }
  },
  mounted() {
    let changePassword = this.$route.query.changePassword;
    if(changePassword) {
      this.loginFlag = 3;
      this.f_phone = getStore("zjzp_phone");
    } else if(getStore("zjzp_userid")!=undefined) {
      this.$router.push({ path:'/home'})
    } else {
      this._createCodeFun();
    }
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
  .wrapper {
    background: url("http://192.168.1.12/jzbppt/login/login.jpg") no-repeat;
    background-size: cover;
    overflow: hidden;
    min-height: 750px;
    min-width: 1280px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
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
  height: 457px;
}
.login_body {
  width: 1280px;
  margin: 0 auto;
}
.login_zone {
  width: 350px;
  background: rgba(0, 0, 0, 0.6);
  margin: 110px 0 0 850px;
  padding-bottom: 30px;
}
.login_zone_3 {
  width: 350px;
  background: rgba(0, 0, 0, 0.6);
  margin: 110px 0 0 850px;
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
.dialog_title_f {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px #39cf41 solid;
  color: #39cf41;
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
.get_code_btn {
  height: 44px;
  line-height: 44px;
  width: 100px;
  text-align: center;
  background: #39cf41;
  color: #fff;
  cursor: pointer;
}
.hava_submit_code_btn {
  height: 44px;
  line-height: 44px;
  width: 100px;
  text-align: center;
  background: #9ecfa0;
  color: #fff;
  cursor: not-allowed;
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
.submit_btn_f {
  width: 284px;
  height: 44px;
  background: #39cf41;
  margin: 0 auto;
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
.forget_password_div {
  box-sizing: border-box;
  width: 100%;
  text-align: right;
  margin: 20px 0 0;
  padding: 0 30px 0 0;
}
.forget_password_div_f {
  box-sizing: border-box;
  width: 100%;
  text-align: right;
  margin: 20px 0 0;
  padding: 0 35px 0 0;
}
.forget_password_div span,
.forget_password_div_f span {
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.forget_password_div span:hover,
.forget_password_div_f span:hover {
  color: #bbb;
}
.code_notice {
  width: 284px;
  color: #ddd;
  font-size: 12px;
  height: 25px;
  line-height: 25px;
  margin: 0 auto;
}
.lock_phone {
  cursor: not-allowed;
}
</style>
