<template>
  <div class="header-box">
    <div>
      <header class="w">
        <div class="w-box">
          <router-link to="/" title="智聚装配">
          <div class="nav-logo">
              <img class="big_index_logo" src="/static/images/favicon.png">智聚装配
          </div>
          </router-link>
          <div class="nav_search_head index_search_input_head">
                <el-autocomplete
                  placeholder="请输入商品信息"
                  icon="search"
                  v-model="input"
                  minlength="1"
                  maxlength="100"
                  :fetch-suggestions="querySearchAsync"
                  @select="handleSelect"
                  :on-icon-click="handleIconClick"
                  @keydown.enter.native="handleIconClick"
                ></el-autocomplete>
              </div>
          <div class="right-box">
            <div class="nav-aside" ref="aside">
              <div
                class="shop pr"
                @mouseover="cartShowState(true)"
                @mouseout="cartShowState(false)"
                ref="positionMsg"
              >
                <router-link to="/cart"></router-link>
                <span class="cart-num">
                  报价器<i class="num" :class="{no:totalNum <= 0,move_in_cart:receiveInCart}">{{totalNum}}</i>
                </span>
                <!--购物车显示块-->
                <div class="nav-user-wrapper pa active" v-show="showCart">
                  <div class="nav-user-list">
                    <div class="full" v-show="totalNum"></div>
                    <div
                      v-show="!totalNum"
                      style="height: 313px;text-align: center"
                      class="cart-con"
                    >
                      <p>您的购物车竟然是空的!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <slot name="nav">
        <div class="nav-sub" @mouseleave="handleNavSubMouseLeave" :class="{fixed:st}">
          <div class="nav-sub-bg"></div>
          <div class="nav-sub-wrapper" :class="{fixed:st}">
            <div class="w">
              <div class="logo_zhuangpei_sub_div" v-if="st">
                <img src="/static/images/nav_logo.png" class="logo_zhuangpei_sub_img" />
              </div>
              <ul class="nav-list2">
                <li>
                  <router-link to="/">
                    <div @click="changGoods(-1)" :class="{active:choosePage===-1}">首页</div>
                  </router-link>
                </li>
                <li>
                  <div @click="changGoods(-2)" :class="{active:choosePage===-2}">
                    产品分类
                    <i class="iconfont_down_arrow">&#xe60a;</i>
                  </div>
                </li>
                <li
                  @mouseenter="handleNavItemMouseEnter(item, i)"
                  v-for="(item,i) in navList"
                  :key="i"
                >
                  <div @click="changGoods(i, item)" :class="{active:i===choosePage}">{{item.picUrl}}</div>
                </li>
              </ul>
              <div class="nav-search index_search_input" v-if="st">
                <el-autocomplete
                  placeholder="请输入商品信息"
                  icon="search"
                  v-model="input"
                  minlength="1"
                  maxlength="100"
                  :fetch-suggestions="querySearchAsync"
                  @select="handleSelect"
                  :on-icon-click="handleIconClick"
                  @keydown.enter.native="handleIconClick"
                ></el-autocomplete>
              </div>
              <div class="shpping_cart" v-if="st">
                <i class="iconfont">&#xe625;</i>报价器
                <div class="cart_num">12</div>
              </div>
              <div _ngcontent-c1 class="container"  v-if="!st">
                <ul _ngcontent-c1 class="nav-list">
                  <!---->
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 class="active" title="智聚装配" href="/" target>智聚装配</a>
                  </li>
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 title="智聚官网" href="http://zhjcx.cn" target="_blank">智聚官网</a>
                  </li>
                  <li _ngcontent-c1>
                    <a _ngcontent-c1 title="智聚实训" href="http://www.智聚实训.cn" target="_blank">智聚实训</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="showCateDiv" class="dropdown-div">
            <div class="cate-con">
              <div class="cate" v-for="(item, index) in curCateList" :key="index">
                <div class="cate-name-label">{{item.name}}</div>
                <div
                  class="cate-item"
                  v-for="(childItem, idx) in item.children"
                  @click="goGoodsCatePage(childItem)"
                  :key="idx"
                >
                  <img :src="childItem.iconUrl" class="item-icon" />
                  <div>{{childItem.name}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="dropdown-div" v-if="showRecommend">
            <div class="recommend-con">
              <div
                v-for="(item, index) in recommendPanel.panelContentItems"
                class="recommend-item"
                @click="goRecommendGoodsDetail(item)"
                :key="index"
              >
                <div class="item">
                  <img :src="item.picUrl" alt="手机图片" />
                  <div class="product-name">{{item.productName}}</div>
                  <div>
                    <span class="product-price">&yen;{{item.salePrice}}</span>&nbsp;起
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
import { mapMutations, mapState } from "vuex";
import {
  getQuickSearch,
  getCartList,
  cartDel,
  getAllGoodsCategories
} from "/api/goods";
import { loginOut, navList, recommend } from "/api/index";
import { setStore, getStore, removeStore } from "/utils/storage";

// import store from '../store/'
import "element-ui/lib/theme-default/index.css";

export default {
  data() {
    return {
      // visible
      showCateDiv: false,
      showRecommend: false, // 产品分类是否显示 推荐商品 （手机板块显示推荐商品）

      // data
      curCateList: [],
      curItem: null,
      recommendPanel: null,

      goodsCateList: [], // 产品分类列表
      goodsCateTree: {}, // 树级机构的产品分类列表

      user: {},
      // 查询数据库的商品
      st: false,
      // 头部购物车显示
      cartShow: false,
      positionL: 0,
      positionT: 0,
      timerCartShow: null, // 定时隐藏购物车
      input: "",
      choosePage: -1,
      searchResults: [],
      timeout: null,
      token: "",
      navList: []
    };
  },
  computed: {
    ...mapState(["cartList", "login", "receiveInCart", "showCart", "userInfo"]),
    // 计算价格
    totalPrice() {
      var totalPrice = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalPrice += item.productNum * item.salePrice;
        });
      return totalPrice;
    },
    // 计算数量
    totalNum() {
      var totalNum = 0;
      this.cartList &&
        this.cartList.forEach(item => {
          totalNum += item.productNum;
        });
      return totalNum;
    }
  },
  methods: {
    ...mapMutations([
      "ADD_CART",
      "INIT_BUYCART",
      "ADD_ANIMATION",
      "SHOW_CART",
      "REDUCE_CART",
      "RECORD_USERINFO",
      "EDIT_CART"
    ]),
    handleNavItemMouseEnter(item, index) {
      let cateName = item.picUrl;
      this.showRecommend = false;
      if (cateName === "手机") {
        this.showCateDiv = false;
        this.showRecommend = true;
        return;
      }
      let cate = this.goodsCateTree[cateName];
      if (cate) {
        this.curCateList = cate.children;
        this.showCateDiv = true;
      } else {
        this.showCateDiv = false;
      }
    },
    handleNavSubMouseLeave() {
      this.showCateDiv = false;
      this.showRecommend = false;
    },
    handleIconClick(ev) {
      if (this.$route.path === "/search") {
        this.$router.push({
          path: "/refreshsearch",
          query: {
            key: this.input
          }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: {
            key: this.input
          }
        });
      }
    },
    goGoodsCatePage(childCateItem) {
      let { id } = childCateItem;
      this.$router.push("/goods/cate/" + id);
      this.showCateDiv = false;
    },
    goRecommendGoodsDetail(item) {
      let { productId } = item;
      this.$router.push("/product/" + productId);
      this.showRecommend = false;
    },
    showError(m) {
      this.$message.error({
        message: m
      });
    },
    // 导航栏文字样式改变
    changePage(v) {
      this.choosePage = v;
    },
    changGoods(v, item) {
      this.changePage(v);
      if (v === -1) {
        this.$router.push({
          path: "/"
        });
      } else if (v === -2) {
        this.$router.push({
          path: "/refreshgoods"
        });
      }
    },
    // 搜索框提示
    loadAll() {
      let params = {
        params: {
          key: this.input
        }
      };
      getQuickSearch(params).then(response => {
        if (response === null || response === "") {
          return;
        }
        if (response.error) {
          this.showError(response.error.reason);
          return;
        }
        var array = [];
        var maxSize = 5;
        if (response.result.length <= 5) {
          maxSize = response.result.length;
        }
        for (var i = 0; i < maxSize; i++) {
          var obj = {};
          obj.value = response.result[i].productName;
          array.push(obj);
        }
        if (array.length !== 0) {
          this.searchResults = array;
        } else {
          this.searchResults = [];
        }
      });
    },
    querySearchAsync(queryString, cb) {
      if (this.input === undefined) {
        cb([]);
        return;
      }
      this.input = this.input.trim();
      if (this.input === "") {
        cb([]);
        return;
      } else {
        this.loadAll();
        setTimeout(() => {
          cb(this.searchResults);
        }, 300);
      }
    },
    handleSelect(item) {
      this.input = item.value;
    },
    // 购物车显示
    cartShowState(state) {
      this.SHOW_CART({ showCart: state });
    },
    // 登陆时获取一次购物车商品
    _getCartList() {
      getCartList({ userId: getStore("userId") })
        .then(res => {
          if (res.success === true) {
            setStore("buyCart", res.result);
          }
          // 重新初始化一次本地数据
        })
        .then(this.INIT_BUYCART);
    },
    // 删除商品
    delGoods(productId) {
      if (this.login) {
        // 登陆了
        cartDel({ userId: getStore("userId"), productId }).then(res => {
          this.EDIT_CART({ productId });
        });
      } else {
        this.EDIT_CART({ productId });
      }
    },
    toCart() {
      this.$router.push({ path: "/cart" });
    },
    // 控制顶部
    navFixed() {
      const fixedPages = ["goods/*", "/home", "product/*"];
      let path = this.$route.path;
      let rs = false;
      fixedPages.forEach(function(val, index, fixedPages) {
        let exp = new RegExp(val);
        if (path.match(exp)) {
          rs = true;
          return;
        } else {
          return;
        }
      });
      if (rs) {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        st >= 100 ? (this.st = true) : (this.st = false);
        // 计算小圆当前位置
        let num = document.querySelector(".num");
        this.positionL = num.getBoundingClientRect().left;
        this.positionT = num.getBoundingClientRect().top;
        this.ADD_ANIMATION({
          cartPositionL: this.positionL,
          cartPositionT: this.positionT
        });
      }
    },
    // 退出登陆
    _loginOut() {
      let params = {
        params: {
          token: this.token
        }
      };
      loginOut(params).then(res => {
        removeStore("buyCart");
        window.location.href = "/";
      });
    },
    // 通过路由改变导航文字样式
    getPage() {
      let path = this.$route.path;
      // let fullPath = this.$route.fullPath
      if (path === "/" || path === "/home") {
        this.changePage(-1);
      } else if (path === "/goods") {
        this.changePage(-2);
      } else {
        this.changePage(0);
      }
    },
    openProduct(productId) {
      window.open("//" + window.location.host + "/#/product/" + productId);
    },
    _getNavList() {
      navList().then(res => {
        this.navList = res.result;
      });
    },
    _getGoodsCategoryList() {
      getAllGoodsCategories().then(res => {
        this.goodsCateList = res.result;
        this.goodsCateTree = this._buildCateTree(this.goodsCateList);
      });
    },
    _buildCateTree(goodsCateList) {
      let parentCateList = goodsCateList.filter(cate => cate.isParent) || [];
      let tree = {};
      if (parentCateList) {
        // 遍历父级产品分类
        for (let parentCate of parentCateList) {
          let parentCateId = parentCate.id; // 父级分类id
          let parentCateName = parentCate.name; // 分类名称

          let childCateList = goodsCateList
            .filter(cate => cate.parentId === parentCateId && !cate.isParent) // 获取当前父级父类对应的二级子分类
            .map(cate => {
              let childCateId = cate.id;
              // 查询三级分类
              let children = goodsCateList.filter(
                cate => cate.parentId === childCateId && !cate.isParent
              );
              // 重新构造子分类对象
              return {
                ...cate,
                children: children
              };
            });
          tree[parentCateName] = {
            ...parentCate,
            children: childCateList
          };
        }
      }
      return tree;
    },
    _getRecommendGoodsAsPhone() {
      recommend().then(res => {
        let data = res.result;
        this.recommendPanel = data[0];
      });
    }
  },
  mounted() {
    this._getNavList();
    this._getGoodsCategoryList();
    this._getRecommendGoodsAsPhone();
    this.token = getStore("token");
    if (this.login) {
      this._getCartList();
    } else {
      this.INIT_BUYCART();
    }
    this.navFixed();
    this.getPage();
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
    if (typeof this.$route.query.key !== undefined) {
      this.input = this.$route.query.key;
    }
  },
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/theme";
@import "../assets/style/mixin";

.move_in_cart {
  animation: mymove 0.5s ease-in-out;
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.header-box {
  background: #fff;
  width: 100%;
  padding-top:25px;
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
  padding:0 0 20px 0;
  h1 {
    height: 100%;
    display: flex;
    align-items: center;
  }
  

  .right-box {
    display: flex;
    margin-right:40px;
  }
  .nav-aside {
    position: relative;
    display: flex;
    align-items: center;
  }
  // 用户
  .user {
    margin-left: 41px;
    width: 36px;
    &:hover {
      a:before {
        background-position: -5px 0;
      }
      .nav-user-wrapper {
        top: 18px;
        visibility: visible;
        opacity: 1;
        -webkit-transition: opacity 0.15s ease-out;
        transition: opacity 0.15s ease-out;
      }
    }
    > a {
      position: relative;
      @include wh(36px, 20px);
      display: block;
      text-indent: -9999px;
      &:before {
        content: " ";
        position: absolute;
        left: 8px;
        top: 0;
        @include wh(20px);
        // background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) -155px
        //   0;
        background-size: 240px 107px;
        transition: none;
      }
    }
    li + li {
      text-align: center;
      position: relative;
      border-top: 1px solid #f5f5f5;
      line-height: 44px;
      height: 44px;
      color: #616161;
      font-size: 12px;
      &:hover {
        background: #fafafa;
      }
      a {
        display: block;
        color: #616161;
      }
    }
    .nav-user-avatar {
      > div {
        position: relative;
        margin: 0 auto 8px;
        @include wh(46px);
        text-align: center;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
        }
        .avatar {
          border-radius: 50%;
          display: block;
          @include wh(100%);
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .name {
        margin-bottom: 16px;
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
        color: #757575;
      }
    }
    .nav-user-wrapper {
      width: 168px;
      transform: translate(-50%);
      left: 50%;
    }
    .nav-user-list {
      width: 168px;
      &:before {
        left: 50%;
      }
    }
  }
  .shop {
    position: relative;
    float: left;
    margin-left: 5px;
    width: 61px;
    z-index: 99;
    &:hover {
      a:before {
        content: " ";
        background-position: 0 -22px;
      }
    }
    .nav-user-wrapper.active {
      top: 18px;
      visibility: visible;
      opacity: 1;
      -webkit-transition: opacity 0.15s ease-out;
      transition: opacity 0.15s ease-out;
    }
    > a {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      display: block;
      right: 0;
      z-index: 1;
      &:before {
        display: block;
        @include wh(30px, 100%);
        content: " ";
        background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
          0 -22px;
        background-size: 240px 107px;
        background-position: -150px -22px;
      }
    }
    .cart-num {
      position: relative;
      display: flex;
      align-items:center;
      margin-left: 31px;
      margin-top: -1px;
      min-width: 30px;
      text-indent: 0;
      line-height: 20px;
      width:100px;
      > i {
        margin-left:4px;
        background: #eb746b;
        background-image: -webkit-linear-gradient(#eb746b, #e25147);
        background-image: linear-gradient(#eb746b, #e25147);
        box-shadow: inset 0 0 1px hsla(0, 0%, 100%, 0.15),
          0 1px 2px hsla(0, 0%, 100%, 0.15);
        text-align: center;
        font-style: normal;
        display: inline-block;
        @include wh(20px);
        line-height: 20px;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        &.no {
          background: #969696;
          background-image: -webkit-linear-gradient(#a4a4a4, #909090);
          background-image: linear-gradient(#a4a4a4, #909090);
          box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
        }
      }
    }
    .nav-user-wrapper {
      right: 0;
      width: 360px;
      .nav-user-list {
        &:before {
          right: 34px;
        }
      }
    }
    .nav-user-list {
      padding: 0;
      width: 100%;
      .full {
        border-radius: 8px;
        overflow: hidden;
      }
      .nav-cart-items {
        max-height: 363px;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .cart-item {
        height: 120px;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #f0f0f0;
        &:hover {
          background: #fcfcfc;
          .del {
            display: block;
          }
        }
      }
      li:first-child .cart-item:first-child {
        border-top: none;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
      }
      .cart-item-inner {
        padding: 20px;
        position: relative;
      }
      .item-thumb {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        border-radius: 3px;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
          border: 1px solid #f0f0f0;
          border: 0 solid transparent;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
          border-radius: 3px;
        }
        img {
          display: block;
          @include wh(80px, 80px);
          border-radius: 3px;
          overflow: hidden;
        }
      }
      .item-desc {
        margin-left: 98px;
        display: table;
        @include wh(205px, 80px);
        h4 {
          color: #000;
          width: 185px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 10px;
        }
        .attrs span {
          position: relative;
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
        .attrs span:last-child {
          margin-right: 0;
        }
        h6 {
          color: #cacaca;
          font-size: 12px;
          line-height: 14px;
          margin-top: 20px;
          span {
            display: inline-block;
            font-weight: 700;
            color: #cacaca;
          }
          .price-icon,
          .price-num {
            color: #d44d44;
          }
          .price-num {
            margin-left: 5px;
            font-size: 14px;
          }
          .item-num {
            margin-left: 10px;
          }
        }
      }
      .cart-cell {
        display: table-cell;
        vertical-align: middle;
      }
      .del {
        display: none;
        overflow: hidden;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .nav-cart-total {
      box-sizing: content-box;
      position: relative;
      padding: 20px;
      height: 40px;
      background: #fafafa;
      border-top: 1px solid #f0f0f0;
      border-radius: 0 0 8px 8px;
      box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
        0 -3px 8px rgba(0, 0, 0, 0.04);
      background: -webkit-linear-gradient(#fafafa, #f5f5f5);
      background: linear-gradient(#fafafa, #f5f5f5);
      p {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 12px;
        color: #c1c1c1;
      }
      h5 {
        line-height: 20px;
        font-size: 14px;
        color: #6f6f6f;
        span {
          font-size: 18px;
          color: #de4037;
          display: inline-block;
          font-weight: 700;
        }
        span:first-child {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      h6 {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 108px;
      }
    }
  }
}

@media (max-height: 780px) {
  .nav-cart-items {
    max-height: 423px !important;
  }
}

@media (max-height: 900px) {
  .nav-cart-items {
    max-height: 544px !important;
  }
}

@media (max-height: 1080px) {
  .nav-cart-items {
    max-height: 620px !important;
  }
}

// 用户信息弹出
.nav-user-wrapper {
  position: absolute;
  z-index: 30;
  padding-top: 18px;
  opacity: 0;
  visibility: hidden;
  top: -3000px;
  .nav-user-list {
    position: relative;
    padding-top: 20px;
    background: #fff;
    border: 1px solid #d6d6d6;
    border-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
    &:before {
      position: absolute;
      content: " ";
      background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png)
        no-repeat -49px -43px;
      background-size: 240px 107px;
      @include wh(20px, 8px);
      top: -8px;
      margin-left: -10px;
    }
  }
}

.nav-sub {
  position: relative;
  z-index: 20;

  background: #f7f7f7;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  &.fixed {
    position: fixed;
    z-index: 21;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #dadada;
    background-image: -webkit-linear-gradient(#fff, #f1f1f1);
    background-image: linear-gradient(#fff, #f1f1f1);
  }
  .nav-sub-wrapper {
    background: #fff;
    position: relative;
    .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0px 0 20px 220px;

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
      // width: 5vw;
      margin-left: -10px;
    }
    // a:nth-child(3){
    //   width: 5vw;
    // }
  }
    .nav-list2 {
      position: relative;
      display: flex;
      width: 650px;
      
      li {
        position: relative;
        width: 120px;
        text-align: center;
        div {
          font-size: 16px;
          color: #333;
          height:40px;
          font-family: "Microsoft YaHei";
          &.active {
            color: #39cf41;
            font-weight: bold;
            border-bottom: 2px solid #39cf41;
          }
        }
        div:hover {
          color: #39cf41;
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
      width: 100px;
      font-size: 14px;
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      .cart_num {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ff4400;
        font-size: 12px;
        line-height: 16px;
        margin-left: 4px;
      }
    }
    &.fixed {
      height: 60px;
      line-height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      background: #343d42;
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
        width: 100px;
        font-size: 14px;
        color: #fff;
        margin-left: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .cart_num {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff4400;
          font-size: 12px;
          line-height: 16px;
          margin-left: 4px;
        }
      }
    }
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

@media (min-width: 1px) {
  .nav-sub .nav-sub-wrapper:after {
    display: block;
  }
}

.cart-con {
  /*display: flex;*/
  text-align: center;
  position: relative;
  p {
    padding-top: 185px;
    color: #333333;
    font-size: 16px;
  }
}

.cart-con:before {
  position: absolute;
  content: " ";
  left: 50%;
  transform: translate(-50%, -70%);
  top: 50%;
  width: 76px;
  height: 62px;
  background: url("/static/images/cart-empty-new.png") no-repeat;
  background-size: cover;
}

.dropdown-div {
  margin-top: -5px;
  height: 200px;
  background: #fff;

  .cate-con {
    display: flex;
    justify-content: center;

    .cate {
      margin: 20px 50px;

      .cate-name-label {
        font-size: 12px;
        color: #000;
        margin-bottom: 20px;
      }
      .cate-item {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;

        .item-icon {
          width: 40px;
          height: 40px;
          margin-right: 5px;
        }

        div {
          font-weight: 700;
        }
      }
    }
  }

  .recommend-con {
    display: flex;
    justify-content: center;

    .recommend-item {
      margin: 20px;
      cursor: pointer;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
          width: 126px;
          height: 126px;
        }
        .product-name {
          font-weight: 700;
        }
        div {
          text-align: center;
          margin-top: 3px;
        }
        .product-price {
          color: #d44d44;
        }
      }
    }
  }
}
@font-face {
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_c5gednjonhe.eot");
  src: url("//at.alicdn.com/t/font_1414486_c5gednjonhe.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_c5gednjonhe.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_c5gednjonhe.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_c5gednjonhe.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_c5gednjonhe.svg#iconfont") format("svg");
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
.iconfont_down_arrow {
  font-family: "iconfont" !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 4px;
}
.w-box .nav_search_head {
  width:320px;
}
.w-box .nav_search_head .el-autocomplete{
  width:320px;
}
.nav-logo {
  display: flex;
  align-items:center;         
  font-size:23px;
  color:#555;
  font-weight: bold;
  font-weight: "Microsoft YaHei"                                                                                          
}
.big_index_logo {
  width:28px;
  height:28px;
  margin-right: 4px;
}
</style>
<style>
.index_search_input .el-autocomplete input {
  height: 34px;
  border-radius: 17px;
}
.index_search_input_head .el-autocomplete input {
  height: 36px;
  border-radius: 18px;
}
</style>

