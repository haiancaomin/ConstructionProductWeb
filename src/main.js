import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import 'url-search-params-polyfill';
import {
  userInfo
} from './api'
// Element css
import 'element-ui/lib/theme-default/index.css'
import {
  Button,
  Pagination,
  Checkbox,
  Icon,
  InputNumber,
  Autocomplete,
  Loading,
  Message,
  MessageBox,
  Notification,
  Steps,
  Step,
  Table,
  TableColumn,
  Input,
  Dialog,
  Select,
  Option,
  Tabs,
  TabPane,
  Form,
  FormItem,
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Upload
} from 'element-ui'
// import { getStore } from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
import axios from 'axios' //引入axios


// import Mock from './mock/mock.js'

Vue.use(VueContentPlaceholders)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Upload)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$ajax = axios
Vue.prototype.bus = new Vue()
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/timg.gif'
  // attempt: 1
})
//开发过程中假数据
// import Mock from'./mock/mock.js'
// Mock.bootstrap()

Vue.config.productionTip = false


const whiteList = ['/home', '/goods', '/login', '/register', '/product', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
// router.beforeEach(function (to, from, next) {
//   // let params = {
//   //   params: {
//   //     token: getStore('token')
//   //   }
//   // }
//   userInfo().then(res => {
//     if (!res.success) { // 没登录
//       if (whiteList.indexOf(to.path) !== -1) { // 白名单
//         next()
//       } else {
//         next('/login')
//       }
//     } else {
//       store.commit('RECORD_USERINFO', {info: res.result})
//       if (to.path === '/login') { //  跳转到
//         next({path: '/'})
//       }
//       next()
//     }
//   })
// })
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  // alert(to.path.toString().indexOf("/teamwork") >= 0);
  if (to.matched.some(m => m.meta.requiresAuth)) {
    if (window.localStorage.getItem("zjzp_userid") != undefined) {
      next()
    } else if (to.path == '/admin/member'||to.path == '/admin/project'||to.path == '/admin/step'||to.path.toString().indexOf("/teamwork") >= 0) {
      next("/login")
      Vue.prototype.$message({
        message: '检测到您还未登录,请登录后操作！',
        type: 'error',
        center: true,
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
