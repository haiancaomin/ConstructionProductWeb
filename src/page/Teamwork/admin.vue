<template>
  <div class="layout-container home">
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box">
            <div>
              <img
                src="https://gper.club/server-img/avatars/000/00/00/user_origin_30.jpg?time1565591384242"
              />
              <h5>userInfo</h5>
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li
                  v-for="(item,i) in nav"
                  :key="i"
                  :class="{current:item.name===title}"
                  @click="tab(item)"
                >
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "人员管理",
      nav: [
        { name: "人员管理", path: "member" },
        { name: "项目管理", path: "project" },
        { name: "项目节点", path: "step" }
      ],
      editAvatar: true
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    tab(e) {
      this.$router.push({ path: "/admin/" + e.path });
    }
  },
  created() {
    let path = this.$route.path.split("/")[2];
    this.nav.forEach(item => {
      if (item.path === path) {
        this.title = item.name;
      }
    });
  },
  watch: {
    $route(to) {
      let path = to.path.split("/")[2];
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name;
        }
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/style/mixin";
.home{
  background-color: #f6f7fb
}
.w {
  padding-top: 40px;
}

.content {
  display: flex;
  height: 100%;
}

.account-sidebar {
  width: 210px;
  flex-shrink: 0;
  border-radius: 6px;
  .avatar {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    img {
      width: 168px;
      height: 168px;
    }
    h5 {
      font-size: 18px;
      line-height: 48px;
      font-weight: 700;
    }
  }
  .account-nav {
    padding-top: 15px;
    li {
      position: relative;
      height: 48px;
      border-top: 1px solid #ebebeb;
      line-height: 48px;
      &:hover {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
      a {
        display: block;
      }
      &.current {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}

.account-content {
  margin-left: 20px;
  flex: 1;
  overflow: hidden;
}
</style>
