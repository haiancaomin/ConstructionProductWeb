import http from './public'
import {
  apis
} from './api'
//忘记密码提交
export const submintNewPasswordFun = (params) => {
  return http.fetchPost(apis.submintNewPasswordFun, params)
}
//获取短信验证码
export const getPhoneCodeFun = (params) => {
  return http.fetchPost(apis.getPhoneCodeFun, params)
}
//登录
export const userLoginFun = (params) => {
  return http.fetchPost(apis.userLoginFun, params)
}
//获取验证码图片
export const createCodeFun = (params) => {
  return http.fetchGet(apis.createCodeFun, params)
}
//获取产品详情
export const getProductDetailFun = (params) => {
  return http.fetchPost(apis.getProductDetailFun, params)
}
//产品分类页面商品列表
export const productListBySrarchOrTyprFun = (params) => {
  return http.fetchPost(apis.productListBySrarchOrTyprFun, params)
}
//产品分类页面调用产品类型接口
export const productTypeListFun = (params) => {
  return http.fetchGet(apis.productTypeListFun, params)
}
//右侧留言板
export const homeNewListFun = (params) => {
  return http.fetchPost(apis.homeNewListFun, params)
}
//右侧留言板
export const messageBoardFun = (params) => {
  return http.fetchPost(apis.messageBoardFun, params)
}
//首页热卖商品
export const homeHotList = (params) => {
  return http.fetchGet(apis.homeHotList, params)
}
//首页轮播图
export const indexCarousel = (params) => {
  return http.fetchGet(apis.indexCarousel, params)
}
//人员管理添加
export const saveMember = (params) => {
  return http.fetchPost(apis.saveMember, params)
}
//人员管理修改
export const updateMember = (params) => {
  return http.fetchPost(apis.updateMember, params)
}
//人员管理列表
export const getMemberList = (params) => {
  return http.fetchPost(apis.getMemberList, params)
}
//人员管理删除
export const deleteMember = (params) => {
  return http.fetchPost(apis.deleteMember, params)
}
//人员管理获取下拉权限
export const getRoles = (params) => {
  return http.fetchGet(apis.getRoles, params)
}
//项目管理添加
export const saveProject = (params) => {
  return http.fetchPost(apis.saveProject, params)
}
//项目管理修改
export const updateProject = (params) => {
  return http.fetchPost(apis.updateProject, params)
}
//项目管理列表
export const getProjectList = (params) => {
  return http.fetchPost(apis.getProjectList, params)
}
//项目管理删除
export const deleteProject = (params) => {
  return http.fetchPost(apis.deleteProject, params)
}
//项目管理获取下拉选择人员
export const getSelectUsers = (params) => {
  return http.fetchGet(apis.getSelectUsers, params)
}
//项目管理获取下拉选择节点
export const getSelectNodes = (params) => {
  return http.fetchGet(apis.getSelectNodes, params)
}
//节点管理添加节点
export const saveStep = (params) => {
  return http.fetchPost(apis.saveStep, params)
}
//节点管理修改节点
export const updateStep = (params) => {
  return http.fetchPost(apis.updateStep, params)
}
//节点管理删除节点
export const deleteStep = (params) => {
  return http.fetchPost(apis.deleteStep, params)
}
//节点管理获取节点列表
export const getStepList = (params) => {
  return http.fetchPost(apis.getStepList, params)
}
//获取工作流
export const getStepInfo = (params) => {
  return http.fetchPost(apis.getStepInfo, params)
}
//添加节点信息
export const saveNodeInfo = (params) => {
  return http.fetchPost(apis.saveNodeInfo, params)
}
//下一步
export const next = (params) => {
  return http.fetchPost(apis.next, params)
}
//删除数据库对应附件
export const deleteAttachment = (params) => {
  return http.fetchPost(apis.deleteAttachment, params)
}

//沟通页面获取留言列表
export const getMsgList = (params) => {
  return http.fetchPost(apis.getMsgList, params)
}
//发表留言
export const sendMsg = (params) => {
  return http.fetchPost(apis.sendMsg, params)
}





// 登陆
export const userLogin = (params) => {
  return http.fetchPost(apis.userLogin, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet(apis.loginOut, params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet(apis.userInfo, params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(apis.register, params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost(apis.upload, params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost(apis.updateheadimage, params)
}
/* // 捐赠列表
export const thanksList = (params) => {
  return http.fetchGet('/member/thanks', params)
} */
// 首页接口
export const productHome = (params) => {
  return http.fetchGet(apis.productHome, params)
}
// 首页接口
export const navList = (params) => {
  return http.fetchGet(apis.navList, params)
}
// 推荐板块
export const recommend = (params) => {
  return http.fetchGet(apis.recommend, params)
}

/* // 捐赠板块
export const thank = (params) => {
  return http.fetchGet('/goods/thank', params)
} */

export const initKaptcha = (params) => {
  return http.fetchGet('/user/kaptcha?t=' + (new Date()).getTime(), params)
}
