<template>
  <footer>
    <div id="footer">
      <div class="footer-contert">
        <div class="footer_left">
          <div class="foot_logo_div">
            <img src="/static/images/nav_logo.png" class="footer_logo" />
          </div>
          <div class="address">地址：南通市开发区通盛大道188号C座6楼 联系电话： 0513-81055866 (工作时间：工作日10点--17点)</div>
          <div class="power_by">©2018-2019 All Rights Reserved 智聚装配式绿色建筑创新中心南通有限公司 版权所有</div>
        </div>
        <div class="footer_right">
          <img src="/static/images/erweima.jpg" class="erweima_img" />
          <div class="notice">官方微信公众号</div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

export default {
  data() {
    return {};
  },
  methods: {
    
  },
 
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  width: 1220px;
}
#footer {
  width: 100%;
  background: rgb(46, 51, 62);
  height: 180px;
}
#footer > .footer-contert {
  width: 1220px;
  margin: auto;
  overflow: hidden;
  display: flex;
}
.footer_logo {
  height: 30px;
  width: 135px;
}
.footer_left {
  width: 1000px;
}
.footer_right {
  width: 220px;
  margin:30px 0 0 0;
  text-align: center;
}
.erweima_img {
  width: 100px;
  height: 100px;
}
.foot_logo_div {
  margin: 40px 0 0 40px;
}
.address {
  margin: 8px 0 0 40px;
  color:#ddd;
}
.power_by {
  margin: 8px 0 0 40px;
  color:#ddd;
}
.notice {
  margin:5px 0 0 0;
  color:#ddd;
  font-size: 12px;
}
</style>
