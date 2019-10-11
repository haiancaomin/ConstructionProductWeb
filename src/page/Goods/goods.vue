<template>
  <div class="goods">
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
    
    <div>
      <div class="img-item">
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
    </div>
  </div>
</template>
<script>
import { getAllGoods } from "/api/goods.js";
import { productTypeListFun, productListBySrarchOrTyprFun } from "/api/index";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      hotList: [],
      productTypeList: [],
      productList: [],
      productCount: 0,
      productType: "",
      keyWord: ""
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
        this.productList = res.data;
        console.log(this.productList);
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
    }
  },
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
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-pagination {
  align-self: flex-end;
  margin: 20px 0 35px;;
  text-align: center;
}
.hot_list_body {
  width: 1280px;
  height: 664px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
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
  margin-left: 144px;
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
  font-family: 'iconfont';  /* project id 1414486 */
  src: url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot');
  src: url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.woff') format('woff'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1414486_pejfj5kvmv.svg#iconfont') format('svg');
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