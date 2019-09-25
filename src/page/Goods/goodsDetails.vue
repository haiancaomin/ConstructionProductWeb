<!--商品详情-->
<template>
  <div class="out_body">
    <div class="detail_page_head">
      <div class="head_con">
        <router-link to="/goods" class="to_product_type">产品分类</router-link>
        <i class="el-icon-arrow-right"></i>
        产品详情
      </div>
    </div>
    <div class="top_div">
      <div class="top_left_div">
        <div class="product_big_img_div">
          <img :src="activeURL" class="product_big_img" />
        </div>
        <div class="product_img_list_div">
          <div class="left_arrow_div" @click="decreasePage()">
            <i class="iconfont_left_arrow" :class="{'left_arrow_active':pageFlag>0}">&#xe697;</i>
          </div>
          <div
            class="product_small_img_div"
            v-for="(item,i) in productImgList"
            :key="i"
            v-show="i>=5*pageFlag&&i<=5*(pageFlag+1)-1"
            @mouseenter="activeImg(item.atturl)"
            :class="{'img_active':activeURL==item.atturl}"
          >
            <img :src="item.atturl" class="product_small_img" />
          </div>

          <div class="right_arrow_div" @click="plusPage()">
            <i
              class="iconfont_right_arrow"
              :class="{'right_arrow_active':productImgList.length/5-1 >pageFlag}"
            >&#xe699;</i>
          </div>
        </div>
      </div>
      <div class="top_center_div">
        <div class="product_name">{{productName}}</div>
        <div class="product_info">
          <div class="product_info_title">产品参数</div>
          <div class="product_info_table">
            <div class="product_info_detail" v-for="(item,index) in specification" :key="index">
              <div class="product_info_param">{{item.split(':')[0]}}</div>
              <div class="product_info_param_value">{{item.split(':')[1]}}</div>
            </div>
            <!-- <div class="product_info_detail">
              <div class="product_info_param">产品尺寸（宽）mm</div>
              <div class="product_info_param_value">836mm</div>
            </div>
            <div class="product_info_detail">
              <div class="product_info_param">产品尺寸（高）mm</div>
              <div class="product_info_param_value">1780mm</div>
            </div>
            <div class="product_info_detail">
              <div class="product_info_param">材质</div>
              <div class="product_info_param_value">钛合金</div>
            </div>-->
          </div>
        </div>
        <div class="product_price">
          单价：
          <span class="symbol">¥</span>
          <span class="price">{{productPrice}}</span>
        </div>
        <div class="add_cart">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="10"
            id="add_cart_input"
          ></el-input-number>
          <div class="add_btn">加入报价器</div>
        </div>
      </div>
      <div class="top_right_div">
        <div class="top_right_head_div">
          <div class="top_right_head_line_left_div">
            <div class="rec_line"></div>
          </div>
          <div class="rec_notice">看了还看</div>
          <div class="top_right_head_line_right_div">
            <div class="rec_line"></div>
          </div>
        </div>
        <div class="recommend_body">
          <div class="recommend_signal_body" v-if="recommendIDData1>=0">
            <div class="recommend_product_name" @click="gotoDetail(recPid1)">{{recName1}}</div>
            <div class="recommend_img_div" @click="gotoDetail(recPid1)">
              <img :src="recPicurl1" class="recommend_img" />
            </div>

            <div class="recommend_product_price">¥{{recPrice1}}</div>
          </div>
          <div class="recommend_signal_body" v-if="recommendIDData2>=0">
            <div class="recommend_product_name" @click="gotoDetail(recPid2)">{{recName2}}</div>
            <div class="recommend_img_div" @click="gotoDetail(recPid2)">
              <img :src="recPicurl2" class="recommend_img" />
            </div>

            <div class="recommend_product_price">¥{{recPrice2}}</div>
          </div>
          <div class="no_recommend_product_div" v-if="recommendIDData1<0&&recommendIDData2<0">
            <img src="/static/images/no-search.png" class="nodata_img" />
            <div class="nodata_notice">没有相似商品了呢~</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_div">
      <div class="bottom_title_div">
        <div class="bottom_title">产品介绍</div>
      </div>
      <div class="bottom_product_introduction">
        <img
          :src="item.atturl"
          class="bottom_product_introduction_img"
          v-for="(item,i) in productIntroductionImgList"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  productDet,
  addCart,
  getAllComments,
  getAllCommentsCount
} from "/api/goods";
import { mapMutations, mapState } from "vuex";
import YShelf from "/components/shelf";
import BuyNum from "/components/buynum";
import YButton from "/components/YButton";
import { getStore } from "/utils/storage";
import { getProductDetailFun, productListBySrarchOrTyprFun } from "/api/index";
export default {
  data() {
    return {
      num: 1,
      productMsg: {},
      small: [],
      big: "",
      product: {
        salePrice: 0
      },
      productNum: 1,
      userId: "",
      pageForm: {
        page: 0,
        size: 10
      },
      activeTab: "itemInfo",
      totalCommentCount: 0,
      commentList: [],
      commentType: null,

      productName: "",
      specification: [],
      productPrice: "",
      productType: "",
      productImgList: [],
      productIntroductionImgList: [],
      recommendProductList: [],
      pageFlag: 0,
      activeURL: "",
      recommendIDData1: -1,
      recommendIDData2: -1,
      recPid1: "",
      recPid2: "",
      recPicurl1: "",
      recPicurl2: "",
      recName1: "",
      recName2: "",
      recPrice1: "",
      recPrice2: ""
    };
  },
  computed: {
    ...mapState(["login", "showMoveImg", "showCart"])
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    handleChange() {},
    gotoDetail(pid) {
      // this.$router.push({ name: 'product', params: { productId: pid }});
      // this.$router.push({ path: `/product/${pid}`});
      console.log("click1");
      this.$router.push({
        path: "/product",
        query: {
          productId: pid
        }
      });
      this.productName = "";
      this.specification = [];
      this.productPrice = "";
      this.productType = "";
      this.productImgList = [];
      this.productIntroductionImgList = [];
      this.recommendProductList = [];
      this.activeURL = "";
      this.pageFlag = 0;
      this._getProductDetailFun(pid);
    },
    activeImg(url) {
      this.activeURL = url;
    },
    plusPage() {
      if (this.productImgList.length / 5 - 1 > this.pageFlag) {
        console.log("add success");
        this.pageFlag++;
      }
    },
    decreasePage() {
      if (this.pageFlag > 0) {
        this.pageFlag--;
      }
    },
    _getProductDetailFun(pid) {
      let paramProID = new URLSearchParams();
      paramProID.append("pid", pid);
      getProductDetailFun(paramProID).then(res => {
        this.productName = res.data.name;
        this.specification = res.data.specification.toString().split(";");
        this.productPrice = res.data.price;
        this.productType = res.data.type;
        this.productImgList = res.data.polist;
        this.productIntroductionImgList = res.data.volist;
        this.testPid = res.data.pid;
        this.activeURL = this.productImgList[0].atturl;
        console.log(this.productType);
        let paramProduct = new URLSearchParams();
        paramProduct.append("type", this.productType);
        paramProduct.append("selectIndex", 1);
        paramProduct.append("pageIndex", 0);
        productListBySrarchOrTyprFun(paramProduct).then(res => {
          this.recommendProductList = res.data;
          console.log(this.recommendProductList);
          var numTest = 0;
          var recommendID1 = this.testPid;
          var recommendID2 = this.testPid;
          var seed = this.recommendProductList.length - 1;

          if (seed > 1) {
            while (recommendID1 == this.testPid) {
              numTest = Math.round(Math.random() * seed);
              recommendID1 = this.recommendProductList[numTest].pid;
              this.recommendIDData1 = numTest;
            }
            while (
              recommendID2 == this.testPid ||
              recommendID2 == recommendID1
            ) {
              numTest = Math.round(Math.random() * seed);
              recommendID2 = this.recommendProductList[numTest].pid;
              this.recommendIDData2 = numTest;
            }
          } else if (seed == 1) {
            if (this.recommendProductList[0].pid == this.testPid) {
              this.recommendIDData1 = 1;
              recommendID1 = this.recommendProductList[1].pid;
              this.recommendIDData2 = -1;
            } else {
              this.recommendIDData1 = 0;
              recommendID1 = this.recommendProductList[0].pid;
              this.recommendIDData2 = -1;
            }
          } else if (seed == 0) {
            this.recommendIDData1 = -1;
            this.recommendIDData2 = -1;
          }
          if (this.recommendIDData1 >= 0) {
            this.recPid1 = recommendID1;
          }
          if (this.recommendIDData2 >= 0) {
            this.recPid2 = recommendID2;
          }
          if (this.recommendIDData1 >= 0) {
            this.recPicurl1 = this.recommendProductList[
              this.recommendIDData1
            ].picurl;
          }
          if (this.recommendIDData2 >= 0) {
            this.recPicurl2 = this.recommendProductList[
              this.recommendIDData2
            ].picurl;
          }
          if (this.recommendIDData1 >= 0) {
            this.recName1 = this.recommendProductList[
              this.recommendIDData1
            ].name;
          }
          if (this.recommendIDData2 >= 0) {
            this.recName2 = this.recommendProductList[
              this.recommendIDData2
            ].name;
          }
          if (this.recommendIDData1 >= 0) {
            this.recPrice1 = this.recommendProductList[
              this.recommendIDData1
            ].price;
          }
          if (this.recommendIDData2 >= 0) {
            this.recPrice2 = this.recommendProductList[
              this.recommendIDData2
            ].price;
          }
        });
      });
    },
    _productDet(productId) {
      productDet({ params: { productId } }).then(res => {
        let result = res.result;
        this.product = result;
        this.productMsg = result.detail || "";
        this.small = result.productImageSmall;
        this.big = this.small[0];
      });
    },
    _productCommentCount(productId) {
      let params = {
        productId,
        type: this.commentType
      };
      getAllCommentsCount({ params: params }).then(res => {
        let result = res.result;
        console.log("%c[goodsDetails-res]", "color: #63ADD1", result);
      });
    },
    _productCommentList(productId) {
      let params = {
        productId,
        type: this.commentType,
        page: this.pageForm.page,
        size: this.pageForm.size
      };
      getAllComments({ params: params }).then(res => {
        let result = res.result;
        console.log("%c[goodsDetails-res]", "color: #63ADD1", result);
      });
    },
    _handleTabClick(tabComponent) {
      let { name } = tabComponent;
      if (name === "comment") {
        if (this.totalCommentCount !== 0) {
          this.pageForm.page = 0;
          this._productCommentList(this.$route.params.productId);
        }
      }
    },

    addCart(id, price, name, img) {
      if (!this.showMoveImg) {
        // 动画是否在运动
        if (this.login) {
          // 登录了 直接存在用户名下
          addCart({
            userId: this.userId,
            productId: id,
            productNum: this.productNum
          }).then(res => {
            // 并不重新请求数据
            this.ADD_CART({
              productId: id,
              salePrice: price,
              productName: name,
              productImg: img,
              productNum: this.productNum
            });
          });
        } else {
          // 未登录 vuex
          this.ADD_CART({
            productId: id,
            salePrice: price,
            productName: name,
            productImg: img,
            productNum: this.productNum
          });
        }
        // 加入购物车动画
        var dom = event.target;
        // 获取点击的坐标
        let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        // 需要触发
        this.ADD_ANIMATION({
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: img
        });
        if (!this.showCart) {
          this.SHOW_CART({ showCart: true });
        }
      }
    },
    checkout(productId) {
      this.$router.push({
        path: "/checkout/" + productId + "/" + this.productNum
      });
    },
    editNum(num) {
      this.productNum = num;
    }
  },
  components: {
    YShelf,
    BuyNum,
    YButton
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.includes("/product/")) {
        let id = this.$route.params.productId;
        this._productDet(id);
        this.userId = getStore("userId");
      }
    }
  },
  created() {
    let id = this.$route.query.productId;
    // let id = this.$route.params.productId;
    this._getProductDetailFun(id);
    // this._productDet(id);
    // this._productCommentCount(id);
    // this.userId = getStore("userId");
  },
  mounted() {}
};
</script>
<style  scoped>
.out_body {
  width: 100%;
  background: #f6f7fb;
}
.top_div {
  width: 1280px;
  margin: 0 auto;
  display: flex;
}
.product_big_img_div {
  width: 350px;
  height: 350px;
  margin: 20px auto 0;
  border: 1px solid #ccc;
}
.product_big_img,
.product_small_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product_img_list_div {
  position: relative;
  width: 360px;
  display: flex;
  margin: 20px auto 0;
}
.product_small_img_div {
  width: 54px;
  height: 54px;
  margin-right: 5px;
  cursor: pointer;
  border: 2px solid #f6f7fb;
}
.img_active {
  border: 2px solid #e4393c;
}
.left_arrow_div {
  margin-right: 5px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.right_arrow_div {
  position: absolute;
  display: flex;
  align-items: center;
  top: 11px;
  left: 330px;
  transition: all 0.3s ease;
}
.left_arrow_div:hover .left_arrow_active {
  cursor: pointer;
  color: #888;
}
.right_arrow_div:hover .right_arrow_active {
  color: #888;
  cursor: pointer;
}

.top_left_div {
  width: 400px;
  margin-left:20px;
}
.top_center_div {
  width: 600px;
  margin-left: 20px;
}
.product_name {
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, "microsoft yahei";
  color: #666;
  max-height: 56px;
  line-height: 28px;
  margin-top: 20px;
  overflow: hidden;
  /* background: #e6e6e6; */
  /* padding-left:10px; */
}
.product_price {
  font-family: "microsoft yahei";
  color: #999;
  width: 100%;
  text-align: center;
  padding-left: 470px;
   /* background: #e6e6e6; */
}
.symbol {
  font-size: 16px;
  color: #e4393c;
  font-family: "microsoft yahei";
}
.price {
  font-size: 22px;
  color: #e4393c;
  font-family: "microsoft yahei";
  
}
.add_btn {
  height: 46px;
  line-height: 46px;
  width: 150px;
  background-color: #df3033;
  color: #fff;
  font-weight: bold;
  font-family: "microsoft yahei";
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}
.add_cart {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.product_info {
  min-height: 220px;
}
.product_info_table {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  width: 580px;
  margin: 10px auto 0;
}
.product_info_detail {
  display: flex;
}
.product_info_param {
  width: 250px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
}
.product_info_title {
  width: 100%;
  margin: 10px auto 0;
  line-height:30px;
  background: #e7e7e7;
  padding-left:10px;
  border-left: 4px #cf1132 solid;
}
.product_info_param_value {
  width: 330px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
}
.top_right_div {
  width: 240px;
}
.top_right_head_div {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  display: flex;
}
.recommend_signal_body {
  position: relative;
  width: 150px;
  margin: 25px auto 0;
}
.recommend_img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.recommend_product_name {
  position: absolute;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 24px;
  line-height: 24px;
  top: 126px;
  cursor: pointer;
}
.recommend_product_price {
  width: 150px;
  text-align: center;
  color: #c81623;
  font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    "\u5b8b\u4f53", sans-serif;
  margin-top: 3px;
}
.bottom_div {
  width: 1280px;
  margin: 30px auto 0;
}
.bottom_title_div {
  border-bottom: 1px solid #cf1132;
}
.bottom_title {
  width: 106px;
  height: 38px;
  line-height: 38px;
  background-color: #cf1132;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.bottom_product_introduction {
  width: 100%;
  text-align: center;
  padding: 20px;
}
.bottom_product_introduction_img {
  width: 800px;
}
.detail_page_head {
  width: 100%;
  margin: 20px 0 0 28px;
  /* background: #ddd; */
}
.head_con {
  width: 1280px;
  margin: 0 auto;
  font-size: 15px;
  color: #666;
  font-family: Arial, "microsoft yahei";
  padding-left:20px;
}
.to_product_type {
  font-weight: bold;
  font-size: 15px;
  font-family: Arial, "microsoft yahei";
  color: #666;
}
.to_product_type:hover {
  color: #cf1132;
}
.el-icon-arrow-right {
  font-size: 14px;
  color: #666;
}
.recommend_img_div {
  cursor: pointer;
}
.no_recommend_product_div {
  text-align: center;
  margin-top: 30px;
}
.nodata_img {
  width: 200px;
}
.nodata_notice {
  margin-top: 5px;
  font-size: 12px;
}
.recommend_signal_body:hover .recommend_product_name {
  color: #df3033;
  font-weight: bold;
}
.rec_notice {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.top_right_head_line_left_div {
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 35px;
}
.top_right_head_line_right_div {
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 35px;
}
.rec_line {
  height: 2px;
  border-top: 1px solid #ccc;
  width: 40px;
}
@font-face {
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.eot");
  src: url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_o0l5xo0q8ah.svg#iconfont") format("svg");
}
.iconfont_left_arrow,
.iconfont_right_arrow {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  cursor: not-allowed;
}
</style>
<style>
#add_cart_input {
  width: 150px;
  margin: 0 10px 0 280px;
}
#add_cart_input .el-input .el-input__inner {
  height: 46px;
}
#add_cart_input .el-input-number__decrease {
  height: 44px;
  line-height: 44px;
}
#add_cart_input .el-input-number__increase {
  height: 44px;
  line-height: 44px;
}
</style>
