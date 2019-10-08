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
              <el-dropdown-item command="teamWork">协同办公</el-dropdown-item>
              <el-dropdown-item command="logOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
                    <div @click="changGoods(3)" :class="{active:choosePage===3}">协同办公</div>
                  </router-link>
                </li>
              </ul>
              <div class="nav-search index_search_input" v-if="st">
                <el-input
                  placeholder="请输入商品名称"
                  icon="search"
                  v-model="input"
                  :on-icon-click="handleIconClick"
                  @keydown.enter.native="handleIconClick"
                ></el-input>
              </div>
              <div class="shpping_cart" v-if="st&&username == ''" @click="gotoLogin()">
                用户登录
                <i class="iconfont_user" :class="{white_bg:st}">&#xe6fd;</i>
              </div>
              <el-dropdown
                :show-timeout="0"
                :hide-timeout="500"
                @command="handleCommand"
                v-if="st&&username != ''"
              >
                <div class="shpping_cart_hava_user">{{username}}</div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="teamWork">协同办公</el-dropdown-item>
                  <el-dropdown-item command="logOut">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
// import YButton from "/components/YButton";
import { mapMutations, mapState } from "vuex";
import {
  getQuickSearch,
  getCartList,
  cartDel,
  getAllGoodsCategories
} from "/api/goods";
import { loginOut, navList, recommend } from "/api/index";
import { setStore, getStore, removeStore } from "/utils/storage";
import { messageBoardFun } from "/api/index";

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
      navList: [],
      connectionShow: false,
      showConnectionHover: false,
      showBoradHover: false,
      showAttentionHover: false,
      messageBoardFlag: false,
      messageBoardDesc: "",
      userPhone: "",
      username: ""
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
    }
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
      "SET_KEYWORD",
      "ADD_CART",
      "INIT_BUYCART",
      "ADD_ANIMATION",
      "SHOW_CART",
      "REDUCE_CART",
      "RECORD_USERINFO",
      "EDIT_CART"
    ]),
    handleCommand(command) {
      if (command == "logOut") {
        this.logOut();
      } else if (command == "teamWork") {
        this.$router.push({ path: `/admin/member` });
      }
    },
    logOut() {
      removeStore("zjzp_userid");
      removeStore("zjzp_name");
      removeStore("zjzp_token");
      this.username = "";
      this.$router.push({ path: "/home" });
      // location.reload();
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
    // handleNavItemMouseEnter(item, index) {
    //   let cateName = item.picUrl;
    //   this.showRecommend = false;
    //   if (cateName === "手机") {
    //     this.showCateDiv = false;
    //     this.showRecommend = true;
    //     return;
    //   }
    //   let cate = this.goodsCateTree[cateName];
    //   if (cate) {
    //     this.curCateList = cate.children;
    //     this.showCateDiv = true;
    //   } else {
    //     this.showCateDiv = false;
    //   }
    // },
    handleNavSubMouseLeave() {
      this.showCateDiv = false;
      this.showRecommend = false;
    },
    handleIconClick(ev) {
      // if (this.$route.path === "/search") {

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

      // } else {
      //   this.$router.push({
      //     path: "/search",
      //     query: {
      //       key: this.input
      //     }
      //   });
      // }
    },
    // goGoodsCatePage(childCateItem) {
    //   let { id } = childCateItem;
    //   this.$router.push("/goods/cate/" + id);
    //   this.showCateDiv = false;
    // },
    // goRecommendGoodsDetail(item) {
    //   let { productId } = item;
    //   this.$router.push("/product/" + productId);
    //   this.showRecommend = false;
    // },
    // showError(m) {
    //   this.$message.error({
    //     message: m
    //   });
    // },

    changePage(v) {
      this.choosePage = v;
    },
    changGoods(v, item) {
      // this.st = false;
      // alert(this.st);
      this.changePage(v);
      // if (v === -1) {
      //   this.$router.push({
      //     path: "/"
      //   });
      // } else if (v === -2) {
      //   this.$router.push({
      //     path: "/refreshgoods"
      //   });
      // }else{
      //   this.$router.push({
      //     path: "/admin"
      //   });
      // }
    },

    // loadAll() {
    //   let params = {
    //     params: {
    //       key: this.input
    //     }
    //   };
    //   getQuickSearch(params).then(response => {
    //     if (response === null || response === "") {
    //       return;
    //     }
    //     if (response.error) {
    //       this.showError(response.error.reason);
    //       return;
    //     }
    //     var array = [];
    //     var maxSize = 5;
    //     if (response.result.length <= 5) {
    //       maxSize = response.result.length;
    //     }
    //     for (var i = 0; i < maxSize; i++) {
    //       var obj = {};
    //       obj.value = response.result[i].productName;
    //       array.push(obj);
    //     }
    //     if (array.length !== 0) {
    //       this.searchResults = array;
    //     } else {
    //       this.searchResults = [];
    //     }
    //   });
    // },
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

    // cartShowState(state) {
    //   this.SHOW_CART({ showCart: state });
    // },

    // _getCartList() {
    //   getCartList({ userId: getStore("userId") })
    //     .then(res => {
    //       if (res.success === true) {
    //         setStore("buyCart", res.result);
    //       }

    //     })
    //     .then(this.INIT_BUYCART);
    // },

    // delGoods(productId) {
    //   if (this.login) {

    //     cartDel({ userId: getStore("userId"), productId }).then(res => {
    //       this.EDIT_CART({ productId });
    //     });
    //   } else {
    //     this.EDIT_CART({ productId });
    //   }
    // },
    // toCart() {
    //   this.$router.push({ path: "/cart" });
    // },

    navFixed() {
      // alert("zz");
      // const fixedPages = ["goods/*", "/home", "product/*"];
      // let path = this.$route.path;
      // let rs = false;
      // fixedPages.forEach(function(val, index, fixedPages) {
      //   let exp = new RegExp(val);
      //   if (path.match(exp)) {
      //     rs = true;
      //     return;
      //   } else {
      //     return;
      //   }
      // });
      // if (rs) {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        st >= 100 ? (this.st = true) : (this.st = false);
        // 计算小圆当前位置
        // let num = document.querySelector(".num");
        // this.positionL = num.getBoundingClientRect().left;
        // this.positionT = num.getBoundingClientRect().top;
        // this.ADD_ANIMATION({
        //   cartPositionL: this.positionL,
        //   cartPositionT: this.positionT
        // });
      // }
    }

    // _loginOut() {
    //   let params = {
    //     params: {
    //       token: this.token
    //     }
    //   };
    //   loginOut(params).then(res => {
    //     removeStore("buyCart");
    //     window.location.href = "/";
    //   });
    // },

    // getPage() {
    //   let path = this.$route.path;

    //   if (path === "/" || path === "/home") {
    //     this.changePage(-1);
    //   } else if (path === "/goods") {
    //     this.changePage(-2);
    //   } else {
    //     this.changePage(0);
    //   }
    // },
    // openProduct(productId) {
    //   window.open("//" + window.location.host + "/#/product/" + productId);
    // },
    // _getNavList() {
    //   navList().then(res => {
    //     this.navList = res.result;
    //   });
    // },
    // _getGoodsCategoryList() {
    //   getAllGoodsCategories().then(res => {
    //     this.goodsCateList = res.result;
    //     this.goodsCateTree = this._buildCateTree(this.goodsCateList);
    //   });
    // },
    // _buildCateTree(goodsCateList) {
    //   let parentCateList = goodsCateList.filter(cate => cate.isParent) || [];
    //   let tree = {};
    //   if (parentCateList) {

    //     for (let parentCate of parentCateList) {
    //       let parentCateId = parentCate.id;
    //       let parentCateName = parentCate.name;

    //       let childCateList = goodsCateList
    //         .filter(cate => cate.parentId === parentCateId && !cate.isParent)
    //         .map(cate => {
    //           let childCateId = cate.id;

    //           let children = goodsCateList.filter(
    //             cate => cate.parentId === childCateId && !cate.isParent
    //           );

    //           return {
    //             ...cate,
    //             children: children
    //           };
    //         });
    //       tree[parentCateName] = {
    //         ...parentCate,
    //         children: childCateList
    //       };
    //     }
    //   }
    //   return tree;
    // },
    // _getRecommendGoodsAsPhone() {
    //   recommend().then(res => {
    //     let data = res.result;
    //     this.recommendPanel = data[0];
    //   });
    // }
  },
  mounted() {
    // this._getNavList();
    // this._getGoodsCategoryList();
    // this._getRecommendGoodsAsPhone();
    // this.token = getStore("token");
    // if (this.login) {
    //   this._getCartList();
    // } else {
    //   this.INIT_BUYCART();
    // }
    // this.navFixed();
    // this.getPage();
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
    console.log();
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

    // if (typeof this.$route.query.key !== undefined) {
    //   this.input = this.$route.query.key;
    // }
  }

  // components: {
  //   YButton
  // }
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
      align-items: center;
      margin-left: 31px;
      margin-top: -1px;
      min-width: 30px;
      text-indent: 0;
      line-height: 30px;
      width: 100px;
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
    z-index: 9999999;
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
    // .shpping_cart {
    //   width: 100px;
    //   font-size: 14px;
    //   color: #fff;
    //   margin-left: 20px;
    //   cursor: pointer;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   .cart_num {
    //     width: 16px;
    //     height: 16px;
    //     border-radius: 50%;
    //     background: #ff4400;
    //     font-size: 12px;
    //     line-height: 16px;
    //     margin-left: 4px;
    //   }
    // }
    &.fixed {
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
        text-decoration:underline;
        transition: all 0.3s;
      }
      .shpping_cart_hava_user:hover {
        color: #39cf41;
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
// .iconfont_down_arrow {
//   font-family: "iconfont" !important;
//   font-size: 12px;
//   font-style: normal;
//   -webkit-font-smoothing: antialiased;
//   -webkit-text-stroke-width: 0.2px;
//   -moz-osx-font-smoothing: grayscale;
//   margin-left: 4px;
// }
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
// .suspension_zone1:hover .iconfont_suspension {
//   display: none;
// }
// .suspension_zone2:hover .iconfont_suspension {
//   display: none;
// }
// .suspension_zone3:hover .iconfont_suspension {
//   display: none;
// }
// .suspension_zone1:hover .hover_div1 {
//   display: block;
// }
// .suspension_zone2:hover .hover_div2 {
//   display: block;
// }
// .suspension_zone3:hover .hover_div3 {
//   display: block;
// }
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
#loginDialog .el-dialog--small {
  width: 360px;
}
#loginDialog .el-dialog__body {
  padding: 0 20px 20px 20px;
  overflow: auto;
}
#loginRuleForm .el-input__inner {
  height: 42px;
  border-radius: 0px;
}
</style>