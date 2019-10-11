<template>
  <div class="home">
    <div>
      <div class="banner" v-for="(item, i) in carouselList" :key="i" v-show="i===mark">
        <div class="bg">
          <transition name="fade">
            <div
              v-show="i===mark"
              style="position:absolute"
              @mouseover="stopTimer"
              @mouseout="startTimer"
            >
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
                <img v-lazy="iitem.picurl" class="hot_product_img" />
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
    </div>
  </div>
</template>
<script>
import { indexCarousel, homeHotList, homeNewListFun } from "/api/index";
export default {
  data() {
    return {
      mark: 0,
      timer: "",
      carouselList: [],
      hotList: [],
      nweList: []
    };
  },
  methods: {
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
        this.mark = 0;
      }
    },
    play() {
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
    }
  },
  mounted() {
    this._indexCarousel();
  },
  created() {
    this.play();
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.home {
  background-color: #f6f7fb;
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

.banner,
.banner span,
.banner div {
  font-family: "Microsoft YaHei";
  transition: all 0.3s;
  transition-timing-function: linear;
}

.banner {
  cursor: pointer;
  position: relative;
  z-index: 19;
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
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot");
  src: url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_pejfj5kvmv.svg#iconfont") format("svg");
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
