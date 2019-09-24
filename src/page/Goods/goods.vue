<template>
  <div class="goods">
    <!-- <div class="nav">
      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>
    </div>-->
    <div class="search_notice" v-if="keyWord != ''&&keyWord != undefined">当前搜索条件："{{keyWord}}"</div>
    <div class="type_choose_div">
      <div class="choose_zone">
        <div class="type_btn" @click="getAllProduct()" :class="{'btn_active':productType==''}">全部商品</div>
      </div>
      <div class="choose_zone" v-for="(item,i) in productTypeList" :key="i">
        <div
          class="type_btn"
          @click="changeProductType(item.type)"
          :class="{'btn_active':productType==item.type}"
        >{{item.type}}</div>
      </div>
    </div>
    <!-- <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;"> -->
    <div>
      <div class="img-item" v-if="!noResult">
        <!--商品-->
        <!-- <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
        </div>-->
        <div class="hot_list_outbody">
          <div class="hot_list_body">
            <div
              class="hot_product_body"
              v-for="(iitem,j) in productList"
              :key="j"
              v-show="productCount>0"
            >
              <div class="hot_product_img_div">
                <img v-lazy="iitem.picurl" class="hot_product_img" />
                <div class="hot_product_hover"></div>
                <div class="hot_hover_product_name">
                  加入报价器
                  <i class="iconfont_cart">&#xe625;</i>
                </div>
              </div>
              <div class="hot_product_info_div">
                <div class="hot_product_name">{{iitem.name}}</div>
                <!-- <div class="hot_product_name">这是部件名称</div> -->
                <div class="hot_product_description">{{iitem.description}}</div>
                <!-- <div class="hot_product_description">这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描</div> -->
                <div class="hot_split_line_div">
                  <div class="hot_split_line"></div>
                </div>
                <div class="hot_product_price">
                  ¥
                  <span class="hot_price_span">{{iitem.price}}</span>
                  <span class="hot_check_detail_btn">
                    查看详情
                    <i class="iconfont">&#xe64b;</i>
                  </span>
                </div>
              </div>
            </div>
            <div class="no_data_notice" v-if="productCount < 1">
              <div class="nodata_img_div">
                <img src="/static/images/no-search.png" class="nodata_img" />
              </div>
              <div class="no_data_notice_con">抱歉，未查询到您搜索的商品，您可以留言给我们哦~</div>
            </div>
          </div>
        </div>
        <div class="pagination_div" v-if="productCount>0">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="productCount"
            :page-size="8"
            id="product_list_pagination"
          ></el-pagination>
        </div>
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png" />
          <br />抱歉！暂时还没有商品
        </div>
        <section class="section">
          <y-shelf :show="!isEmpty(recommendPanel.panelContentItems)" :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContentItems" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
      <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png" />
          <br />抱歉！出错了...
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllGoods } from "/api/goods.js";
import { recommend } from "/api/index.js";
import mallGoods from "/components/mallGoods";
import YButton from "/components/YButton";
import YShelf from "/components/shelf";
import Utils from "/utils";
import { productTypeListFun, productListBySrarchOrTyprFun } from "/api/index";
export default {
  data() {
    return {
      goods: [],
      noResult: false,
      error: false,
      min: "",
      max: "",
      loading: true,
      timer: null,
      sortType: 1,
      windowHeight: null,
      windowWidth: null,
      recommendPanel: [],
      sort: "",
      currentPage: 1,
      total: 0,
      pageSize: 20,
      hotList: [],
      productTypeList: [],
      productList: [],
      productCount: 0,
      productType: "",
      keyWord: ""
    };
  },
  methods: {
    isEmpty: Utils.isEmpty,
    getAllProduct() {
      this.keyWord = "";
      this.productType = "";
      this.currentPage = 1;
      this._productListBySrarchOrTyprFun();
      this.bus.$emit("clearKeyWord", {
        keyWord: ""
      });
    },
    changeProductType(type) {
      this.keyWord = "";
      this.currentPage = 1;
      this.productType = type;
      this._productListBySrarchOrTyprFun();
      this.bus.$emit("clearKeyWord", {
        keyWord: ""
      });
    },
    _productListBySrarchOrTyprFun() {
      let paramProduct = new URLSearchParams();
      paramProduct.append("name", this.keyWord);
      paramProduct.append("type", this.productType);
      paramProduct.append("selectIndex", this.currentPage);
      paramProduct.append("pageIndex", (this.currentPage - 1) * 8);
      productListBySrarchOrTyprFun(paramProduct).then(res => {
        // this.$route.query.keyWord = "";
        this.productList = res.data;
        this.productCount = res.count;
        if (this.keyWord != "") {
          this.productType = "-1";
        }
      });
    },
    _productTypeListFun() {
      productTypeListFun("").then(res => {
        console.log(res.data);
        this.productTypeList = res.data;
        console.log(this.productTypeList);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this._productListBySrarchOrTyprFun();
    },
    _getAllGoods() {
      let cid;

      if (this.$route.path.includes("goods/cate")) {
        cid = this.$route.params.cateId;
      } else {
        cid = this.$route.query.cid;
      }

      if (this.min !== "") {
        this.min = Math.floor(this.min);
      }
      if (this.max !== "") {
        this.max = Math.floor(this.max);
      }
      let params = {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          sort: this.sort,
          priceGt: this.min,
          priceLte: this.max,
          cid: cid
        }
      };
      getAllGoods(params).then(res => {
        if (res.success) {
          this.total = res.result.total;
          this.goods = res.result.data;
          this.noResult = false;
          if (this.total === 0) {
            this.noResult = true;
          }
          this.error = false;
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    },
    // 默认排序
    reset() {
      this.sortType = 1;
      this.sort = "";
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    },
    // 价格排序
    sortByPrice(v) {
      v === 1 ? (this.sortType = 2) : (this.sortType = 3);
      this.sort = v;
      this.currentPage = 1;
      this.loading = true;
      this._getAllGoods();
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath.indexOf("/goods") >= 0) {
        this.keyWord = this.$route.query.keyWord;
        if (this.keyWord == "" || this.keyWord == undefined) {
          this.keyWord = "";
          this.productType = "";
          this.currentPage = 1;
          this._productListBySrarchOrTyprFun();
        } else {
          this.keyWord = this.keyWord.toString().trim();
          this.productType = "";
          this.currentPage = 1;
          this._productListBySrarchOrTyprFun();
        }
      }
      // if (to.fullPath.includes("/goods/cate")) {
      //   this._getAllGoods();
      // }
    }
  },
  created() {},
  mounted() {
    this.keyWord = this.$route.query.keyWord;
    this._productTypeListFun();
    if (this.keyWord == "" || this.keyWord == undefined) {
      this.keyWord = "";
      this._productListBySrarchOrTyprFun();
    } else {
      this.keyWord = this.keyWord.toString().trim();
      this._productListBySrarchOrTyprFun();
    }

    // this.windowHeight = window.innerHeight;
    // this.windowWidth = window.innerWidth;
    // this._getAllGoods();
    // recommend().then(res => {
    //   let data = res.result;
    //   this.recommendPanel = data[0];
    // });
  },
  components: {
    mallGoods,
    YButton,
    YShelf
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 15px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  > div {
    float: left;
    border: 1px solid #efefef;
  }
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

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
.hot_list_body {
  width: 1280px;
  height: 664px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
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
  height: 312px;
  margin: 0 20px 20px 0;
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
  margin-left: 151px;
  cursor: pointer;
  transition: all 0.3s;
}
.hot_check_detail_btn:hover {
  color: #cf1132;
}
.goods {
  background-color: #f6f7fb;
}
.pagination_div {
  width: 1280px;
  margin: 0 auto;
}
#product_list_pagination {
  text-align: center;
  margin-top: 20px;
}
.type_choose_div {
  width: 1280px;
  margin: 0 auto;
  display: flex;
}
.choose_zone {
  width: 105px;
  height: 30px;
  margin: 20px 0;
}
.type_btn {
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  border: 1px solid #cf1132;
  color: #cf1132;
  border-radius: 15px;
  cursor: pointer;
}
.btn_active {
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #cf1132;
  border: 1px solid #cf1132;
  color: #fff;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
}
.search_notice {
  width: 1280px;
  margin: 0 auto;
  margin-top: 20px;
}
.no_data_notice {
  width: 100%;
  height: 100%;
}
.nodata_img_div {
  width: 480px;
  height: 300px;
  margin: 90px auto 0;
}
.nodata_img {
  width: 100%;
  height: 100%;
}
.no_data_notice_con {
  width: 100%;
  text-align: center;
  margin: 20px auto 0;
}
@font-face {
  font-family: "iconfont"; /* project id 1414486 */
  src: url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.eot");
  src: url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.woff") format("woff"),
    url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1414486_fwwu3rqmy4.svg#iconfont") format("svg");
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
.iconfont {
  font-family: "iconfont" !important;
  font-size: 12px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 4px;
}
</style>
