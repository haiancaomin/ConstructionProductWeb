<!--商品详情-->
<template>
  <div class="out_body">
    <el-dialog title="留言板" :visible.sync="messageBoardFlag" id="messageBoard">
      <div class="message_board_notice1">留言内容</div>
      <el-input type="textarea" v-model="messageBoardDesc" id="messageBoardTextarea"></el-input>
      <div class="message_board_notice2">联系方式（请留下您的手机号或电话号码，方便我们联系您）</div>
      <el-input v-model="userPhone"></el-input>
      <div class="message_board_submit_btn" @click="_messageBoardFun()">提交</div>
    </el-dialog>
    <el-dialog title="联系我们" :visible.sync="connectFlag" id="connectDialog">
      <div class="connection_info_detail">电话：0513-81055866</div>
      <div class="connection_info_detail">邮箱：MKT_Dept@zhjcx.cn</div>
    </el-dialog>
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
          </div>
        </div>
        <div class="product_price">
          定额：
          <span class="symbol">¥</span>
          <span class="price">{{productPrice}}</span>
        </div>
        <div class="add_cart">
          <div class="leave_message_btn" @click="messageBoardFlag=true">给我们留言</div>
          <div class="add_btn" @click="connectFlag=true">联系我们</div>
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

import { getProductDetailFun, productListBySrarchOrTyprFun,messageBoardFun } from "/api/index";
export default {
  data() {
    return {
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
      recPrice2: "",
      messageBoardDesc:"",
      userPhone:"",
      messageBoardFlag: false,
      connectFlag: false,
    };
  },

  methods: {
    _messageBoardFun() {
      let paramz = new URLSearchParams();
      if (this.messageBoardDesc.trim() == "") {
        this.$message({
          message: "留言内容不要为空",
          type: "error",
          center: true
        });
      } else if(this.messageBoardDesc.length>100) {
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
      } else if(this.userPhone.length>15) {
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
    gotoDetail(pid) {
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
    }
  },
  created() {
    let id = this.$route.query.productId;
    this._getProductDetailFun(id);
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
}
.product_price {
  font-family: "microsoft yahei";
  color: #999;
  width: 100%;
  text-align: center;
  padding-left: 470px;
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
  transition: all 0.3s;
}
.add_btn:hover {
  background-color: #49af4f;
}
.leave_message_btn {
  height: 46px;
  line-height: 46px;
  width: 150px;
  background-color: #49af4f;
  color: #fff;
  font-weight: bold;
  font-family: "microsoft yahei";
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin: 0 10px 0 280px;
  transition: all 0.3s;
}
.leave_message_btn:hover {
  background-color: #df3033;
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
  vertical-align: middle
}
.detail_page_head {
  width: 100%;
  margin: 20px 0 0 28px;
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
.connection_info_detail {
  width:100%;
  text-align: center;
  height:40px;
  line-height: 40px;
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
#connectDialog .el-dialog__header {
  text-align: center;
}
#connectDialog .el-dialog--small {
  width: 400px;
}
#connectDialog .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>