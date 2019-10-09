<template>
  <div class="home">
    <!-- <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;"> -->
    <div>
      <div class="banner" v-for="(item, i) in carouselList" :key="i" v-show="i===mark">
        <!-- :style="{background: item.bgColor}" -->
        <div class="bg">
          <transition name="fade">
            <div
              v-show="i===mark"
              style="position:absolute"
              @mouseover="stopTimer"
              @mouseout="startTimer"
            >
              <!-- <img v-if="item.picUrl" class="img1" :src="item.picUrl" /> -->
              <div class="imgtest" :style="{backgroundImage: 'url(' + item.picurl + ')' }"></div>
            </div>
          </transition>
        </div>
        <div class="page">
          <ul class="dots">
            <li
              class="dot-active"
              v-for="(item, i) in carouselList"
              :class="{ 'dot':i!=mark }"
              :key="i"
              @click="change(i)"
            ></li>
          </ul>
        </div>
      </div>

      <div class="product_hot_new_body">
        <div class="hot_list_outbody">
          <div class="hot_title">热门商品</div>
          <div class="hot_list_body">
            <div class="hot_product_body" v-for="(iitem,j) in hotList" :key="j">
              <div class="hot_product_img_div">
                <!-- <img v-lazy="ss" class="hot_product_img" /> -->
                <img v-lazy="iitem.picurl" class="hot_product_img" />
                <!-- <img src="http://192.168.1.188:8080/jzbppt/att/2019/09/18/1568795856986.jpg" class="hot_product_img" /> -->
                <div class="hot_product_hover"></div>
                <div class="hot_hover_product_name" @click="gotoDetail(iitem.pid)">
                  查看详情
                  <i class="iconfont_cart">&#xe61f;</i>
                </div>
              </div>
              <div class="hot_product_info_div">
                <div class="hot_product_name" @click="gotoDetail(iitem.pid)">{{iitem.name}}</div>
                <div class="hot_product_description">{{iitem.description}}</div>
                <div class="hot_split_line_div">
                  <div class="hot_split_line"></div>
                </div>
                <div class="hot_product_price">
                  ¥
                  <span class="hot_price_span">{{iitem.price}}</span>
                  <span class="hot_check_detail_btn" @click="gotoDetail(iitem.pid)">
                    查看详情
                    <i class="iconfont">&#xe64b;</i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="new_list_outbody">
          <div class="hot_title">新品上线</div>
          <div class="new_list_body">
            <div
              class="new_product_body"
              v-for="(iitem,j) in nweList"
              :key="j"
              @click="gotoDetail(iitem.pid)"
            >
              <i class="iconfont_new_right_arrow">&#xe606;</i>
              <div class="new_product_img_div">
                <img v-lazy="iitem.picurl" class="new_product_img" />
              </div>
              <div class="new_product_info_div">
                <div class="new_product_name">{{iitem.name}}</div>
                <div class="new_product_description">{{iitem.description}}</div>
                <div class="new_product_price">
                  <span>¥</span>
                  {{iitem.price}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="friend_zone_div">
        <div class="hot_title">友情链接</div>
        <div class="friend_out_body">
          <div class="friend_body1"></div>
          <div class="friend_body2"></div>
          <div class="friend_body3"></div>
          <div class="friend_body4"></div>
        </div>
      </div>
      <!-- <section class="w mt30 clearfix">

          <div slot="content" class="hot">
            <div
              class="imgbanner"
              v-for="(iitem,j) in hotList"
              :key="j"
              v-if="j == 0"
              @click="linkTo(iitem)"
            >
              <img v-lazy="iitem.picurl" />
              <a class="cover-link"></a>
            </div>
            <mall-goods :msg="iitem" v-for="(iitem,j) in hotList" :key="j" v-if="j != 0"></mall-goods>
          </div>
        
      </section>-->

      <!-- <section class="w mt30 clearfix" v-if="item.type === 3">
        <y-shelf :title="item.name">
          <div slot="content" class="floors">
            <div
              class="imgbanner"
              v-for="(iitem,j) in item.panelContentItems"
              :key="j"
              v-if="iitem.type === 2 || iitem.type === 3"
              @click="linkTo(iitem)"
            >
              <img v-lazy="iitem.picUrl" />
              <a class="cover-link"></a>
            </div>
            <mall-goods
              :msg="iitem"
              v-for="(iitem,j) in item.panelContentItems"
              :key="j+'key'"
              v-if="iitem.type != 2 && iitem.type != 3"
            ></mall-goods>
          </div>
        </y-shelf>
      </section>-->
    </div>

    <!-- <div class="no-info" v-if="error">
      <div class="no-data">
        <img src="/static/images/error.png" />
        <br />抱歉！出错了...
      </div>
    </div>-->

    <!--<el-dialog
      title="通知"
      :visible.sync="dialogVisible"
      width="30%"
      style="width:70%;margin:0 auto">
      <span>测试消息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import { productHome } from "/api/index.js";
import YShelf from "/components/shelf";
import product from "/components/product";
import mallGoods from "/components/mallGoods";
import { setStore, getStore } from "/utils/storage.js";
import { indexCarousel, homeHotList, homeNewListFun } from "/api/index";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      
      banner: [],
      mark: 0,
      bgOpt: {
        px: 0,
        py: 0,
        w: 0,
        h: 0,
      },
      home: [],
      loading: true,
      notify: "1",
      dialogVisible: false,
      timer: "",
      carouselList: [],
      hotList: [],
      nweList: []
    };
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    addIntoCart(pid) {
      this.ADD_CART({productId: pid})
    },
    gotoDetail(pid) {
      this.$router.push({
        path: "/product",
        query: {
          productId: pid
        }
      });
    },
    _homeNewListFun() {
      homeNewListFun("").then(res => {
        console.log(res.data);
        this.nweList = res.data;
      });
    },
    _homeHotList() {
      homeHotList("").then(res => {
        console.log(res.data);
        this.hotList = res.data;
      });
    },
    _indexCarousel() {
      indexCarousel("").then(res => {
        this.carouselList = res.data;
        this._homeHotList();
        this._homeNewListFun();
      });
    },
    autoPlay() {
      this.mark++;
      if (this.mark > this.carouselList.length - 1) {
        // 当遍历到最后一张图片置零
        this.mark = 0;
      }
    },
    play() {
      // 每2.5s自动切换
      this.timer = setInterval(this.autoPlay, 4500);
    },
    change(i) {
      this.mark = i;
    },
    startTimer() {
      this.timer = setInterval(this.autoPlay, 4500);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    linkTo(item) {
      if (item.type === 0 || item.type === 2) {
        // 关联商品
        this.$router.push({
          path: "/product/" + item.productId
        });
      } else {
        // 完整链接
        window.location.href = item.fullUrl;
      }
    },
    // bgOver(e) {
    //   this.bgOpt.px = e.offsetLeft;
    //   this.bgOpt.py = e.offsetTop;
    //   this.bgOpt.w = e.offsetWidth;
    //   this.bgOpt.h = e.offsetHeight;
    // },
    // bgMove(dom, eve) {
    //   let bgOpt = this.bgOpt;
    //   let X, Y;
    //   let mouseX = eve.pageX - bgOpt.px;
    //   let mouseY = eve.pageY - bgOpt.py;

    //   X = mouseX - bgOpt.w / 2;
    //   Y = bgOpt.h / 2 - mouseY;

    //   dom.style["transform"] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
    //   dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`;
    // },
    // bgOut(dom) {
    //   dom.style["transform"] = "rotateY(0deg) rotateX(0deg)";
    //   dom.style.transform = "rotateY(0deg) rotateX(0deg)";
    // },
    showNotify() {
      var value = getStore("notify");
      if (this.notify !== value) {
        this.dialogVisible = true;
        setStore("notify", this.notify);
      }
    }
  },
  mounted() {
    // productHome().then(res => {
    //   if (res.success === false) {
    //     this.error = true;
    //     return;
    //   }
    //   let data = res.result;
    //   this.home = data;

    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].type === 0) {
    //       this.banner = data[i].panelContentItems;
    //     }
    //   }
    // });
    this.showNotify();
    this._indexCarousel();
  },
  created() {
    this.play();
  },
  components: {
    YShelf,
    product,
    mallGoods
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 1260px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #f6f7fb;
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page {
  position: absolute;
  width: 100%;
  top: 470px;
  z-index: 30;
  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .dot-active {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: whitesmoke;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
    .dot {
      opacity: 0.2;
    }
  }
}

.activity-panel {
  width: 1220px;
  margin: 0 auto;
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 25px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
  .content {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 25%;
    height: 200px;
    text-align: center;
  }
  .content ::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-left: 1px solid #f2f2f2;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    content: "";
    pointer-events: none;
  }
  .i {
    width: 305px;
    height: 200px;
  }
  .cover-link {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
      repeat;
  }
  a {
    color: #5079d9;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-decoration: none;
  }
  a:hover {
    box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
}

.banner,
.banner span,
.banner div {
  font-family: "Microsoft YaHei";
  transition: all 0.3s;
  transition-timing-function: linear;
}

.banner {
  cursor: pointer;
  // perspective: 3000px;
  position: relative;
  z-index: 19;
  // margin: 0 auto;
  width: 100%;
}
.bg {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin: 0px auto;
  background-size: 100% 100%;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  & div {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}
.imgtest {
  position: absolute;
  width: 100%;
  height: 500px;
  top: 0;
  left: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
}

.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.a {
  z-index: 20;
  transform: translateZ(40px);
}

.b {
  z-index: 20;
  transform: translateZ(30px);
}

.c {
  transform: translateZ(0px);
}

.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 25%;
  }
}

.hot {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 50%;
      height: 430px;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
        repeat;
    }
    .cover-link:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.product_hot_new_body {
  width: 1280px;
  margin: 30px auto 0px;
  display: flex;
}
.hot_list_body {
  width: 960px;
  display: flex;
  flex-wrap: wrap;
}
.new_list_outbody {
  width: 300px;
}
.hot_title {
  line-height: 22px;
  font-size: 22px;
  color: #272a2c;
  display: block;
  text-indent: 15px;
  border-left: 4px #cf1132 solid;
  margin-bottom: 30px;
}
.hot_product_body {
  margin: 0 20px 24px 0;
  background: #fff;
}
.hot_product_img_div {
  width: 300px;
  height: 170px;
  position: relative;
  overflow: hidden;
}
.hot_product_hover {
  position: absolute;
  width: 300px;
  height: 170px;
  top: -100%;
  left: 0;
  background: rgb(180, 15, 45);
  opacity: 0;
  transition: all 0.4s;
}
.hot_product_body:hover .hot_product_hover {
  top: 0%;
  opacity: 0.8;
}
.hot_hover_product_name {
  position: absolute;
  width: 140px;
  height: 36px;
  line-height: 36px;
  top: -100%;
  left: 80px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s;
  color: #cf1132;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.hot_product_body:hover .hot_hover_product_name {
  top: 70px;
  opacity: 1;
}
.hot_product_img {
  width: 300px;
  height: 170px;
  object-fit: cover;
}
.hot_product_name {
  width: 260px;
  color: #383838;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
  font-family: "Microsoft YaHei";
  margin: 13px 20px 2px;
  height: 32px;
  overflow: hidden;
  cursor: pointer;
}
.hot_product_description {
  width: 268px;
  margin: 0 16px 7px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #b1b1b1;
  line-height: 22px;
  padding: 0 2px;
  height: 45px;
  overflow-wrap: break-word;
  overflow: hidden;
}
.hot_split_line_div {
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hot_split_line {
  width: 260px;
  height: 2px;
  border-top: 1px solid #e5e5e5;
}
.hot_product_price {
  width: 100%;
  height: 39px;
  font-size: 12px;
  line-height: 39px;
  font-family: "Micosoft YaHei";
  padding-left: 20px;
  color: #cf1132;
}
.hot_price_span {
  font-size: 18px;
  line-height: 39px;
  font-family: "Micosoft YaHei";
  font-weight: bold;
}
.hot_check_detail_btn {
  font-size: 12px;
  line-height: 39px;
  font-family: "Micosoft YaHei";
  color: #9f9f9f;
  font-size: 12px;
  margin-left: 144px;
  cursor: pointer;
  transition: all 0.3s;
}
.hot_check_detail_btn:hover {
  color: #cf1132;
}
.new_list_body {
  border-left: solid 1px #ededed;
  border-right: solid 1px #ededed;
  border-bottom: solid 1px #ededed;
}
.new_product_body {
  position: relative;
  display: flex;
  width: 298px;
  height: 108px;
  padding: 20px 42px 0 26px;
  background: #fff;
  border-top: solid 1px #ededed;
  cursor: pointer;
  transition: all 0.3s;
}
.new_product_img_div {
  height: 68px;
  width: 68px;
  border-radius: 15px;
  overflow: hidden;
}
.new_product_img {
  height: 68px;
  width: 68px;
  object-fit: cover;
}
.new_product_info_div {
  margin-left: 22px;
}
.new_product_name {
  font-size: 16px;
  color: #555;
  line-height: 22px;
  height: 22px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}
.new_product_description {
  font-size: 14px;
  color: #999;
  line-height: 24px;
  height: 24px;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Micosoft YaHei";
}
.new_product_price {
  font-size: 14px;
  color: #cf1132;
  line-height: 24px;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.new_product_price span {
  font-size: 12px;
}
.new_product_body:hover {
  background: rgb(240, 242, 247);
}
.new_product_body:hover .iconfont_new_right_arrow {
  color: rgb(221, 17, 54);
}
.friend_zone_div {
  width: 1280px;
  margin: 20px auto 30px;
}
.friend_out_body {
  display: flex;
}
.friend_body1 {
  width: 300px;
  height: 130px;
  background: #cf1132;
  margin-right: 20px;
  cursor: pointer;
}
.friend_body2 {
  width: 300px;
  height: 130px;
  background: #cf1132;
  margin-right: 20px;
  cursor: pointer;
}
.friend_body3 {
  width: 300px;
  height: 130px;
  background: #cf1132;
  margin-right: 20px;
  cursor: pointer;
}
.friend_body4 {
  width: 300px;
  height: 130px;
  background: #cf1132;
  margin-right: 20px;
  cursor: pointer;
}

@font-face {
  font-family: 'iconfont';  /* project id 1414486 */
  src: url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot');
  src: url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff') format('woff'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 4px;
}
.iconfont_cart {
  font-family: "iconfont" !important;
  font-size: 15px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 4px;
}
.iconfont_new_right_arrow {
  position: absolute;
  top: 37px;
  left: 250px;
  font-family: "iconfont" !important;
  font-size: 34px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #ddd;
  transition: all 0.3s;
}
</style>
