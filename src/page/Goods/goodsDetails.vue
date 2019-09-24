<!--商品详情-->
<template>
  <div class="out_body">
    <div class="top_div">
      <div class="top_left_div">
        <div class="product_big_img_div">
          <img src="/static/images/wechat-explain.png" class="product_big_img" />
        </div>
        <div class="product_img_list_div">
          <div class="left_arrow_div">
            <i class="iconfont_left_arrow">&#xe697;</i>
          </div>
          <div class="product_small_img_div">
            <img src="/static/images/wechat-explain.png" class="product_small_img" />
          </div>
          <div class="product_small_img_div">
            <img src="/static/images/wechat-explain.png" class="product_small_img" />
          </div>
          <div class="product_small_img_div">
            <img src="/static/images/wechat-explain.png" class="product_small_img" />
          </div>
          <div class="product_small_img_div">
            <img src="/static/images/wechat-explain.png" class="product_small_img" />
          </div>
          <div class="product_small_img_div">
            <img src="/static/images/wechat-explain.png" class="product_small_img" />
          </div>
          <div class="right_arrow_div">
            <i class="iconfont_right_arrow">&#xe699;</i>
          </div>
        </div>
      </div>
      <div class="top_center_div">
        <div class="product_name">温碧泉牌亮瞎你的狗眼超闪亮冰箱温碧泉牌亮瞎你的狗眼超闪亮冰箱温碧泉牌亮瞎你的狗眼超闪亮冰箱</div>
        <div class="product_info">
          <div class="product_info_title">产品规格</div>
          <div class="product_info_table">
            <div class="product_info_detail">
              <div class="product_info_param">产品尺寸（长）mm</div>
              <div class="product_info_param_value">636mm</div>
            </div>
            <div class="product_info_detail">
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
            </div>
          </div>
        </div>
        <div class="product_price">
          价格：
          <span class="symbol">¥</span>
          <span class="price">120</span>
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
        <div class="bottom_head_div">看了还看</div>
      </div>
    </div>
    <div class="bottom_div"></div>
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
      // form
      pageForm: {
        page: 0,
        size: 10
      },

      // data
      activeTab: "itemInfo",
      totalCommentCount: 0,
      commentList: [],
      commentType: null
    };
  },
  computed: {
    ...mapState(["login", "showMoveImg", "showCart"])
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
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
    let id = this.$route.params.productId;
    this._productDet(id);
    this._productCommentCount(id);
    this.userId = getStore("userId");
  }
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
}
.product_big_img,
.product_small_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product_img_list_div {
  width: 360px;
  display: flex;
  margin: 20px auto 0;
}
.product_small_img_div {
  width: 54px;
  height: 54px;
  margin-right: 5px;
  cursor: pointer;
}
.left_arrow_div {
  margin-right: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.right_arrow_div {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.top_left_div {
  width: 400px;
}
.top_center_div {
  width: 600px;
}
.product_name {
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, "microsoft yahei";
  color: #666;
  height: 56px;
  line-height: 28px;
  margin-top: 30px;
  overflow: hidden;
}
.product_price {
  font-family: "microsoft yahei";
  color: #999;
  width: 120px;
  text-align: center;
  margin-left: 470px;
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
  min-height: 250px;
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
  width: 580px;
  margin: 20px auto 0;
}
.product_info_param_value {
  width: 330px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  text-align: center;
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
