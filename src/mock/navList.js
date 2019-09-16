import {apis} from '../api/api'

const navList = {
  'success': true,
  'message': 'success',
  'code': 200,
  'timestamp': 1563590237008,
  'result': [
  //   {
  //   'id': 55,
  //   'panelId': 0,
  //   'type': 1,
  //   'productId': null,
  //   'sortOrder': 1,
  //   'fullUrl': '#',
  //   'picUrl': '减震产品',
  //   'picUrl2': null,
  //   'picUrl3': null,
  //   'created': 1532695701000,
  //   'updated': 1532701971000,
  //   'salePrice': null,
  //   'productName': null,
  //   'subTitle': null,
  //   'productImageBig': '减震产品'
  // }, {
  //   'id': 58,
  //   'panelId': 0,
  //   'type': 1,
  //   'productId': null,
  //   'sortOrder': 2,
  //   'fullUrl': '#',
  //   'picUrl': '抗震产品',
  //   'picUrl2': null,
  //   'picUrl3': null,
  //   'created': 1532695807000,
  //   'updated': 1532701518000,
  //   'salePrice': null,
  //   'productName': null,
  //   'subTitle': null,
  //   'productImageBig': '抗震产品'
  // }, 
  {
    'id': 59,
    'panelId': 0,
    'type': 1,
    'productId': null,
    'sortOrder': 2,
    'fullUrl': '#',
    'picUrl': '协同办公',
    'picUrl2': null,
    'picUrl3': null,
    'created': 1532695807022,
    'updated': 1532701513000,
    'salePrice': null,
    'productName': null,
    'subTitle': null,
    'productImageBig': '协同办公'
  }
]
}

export default {
  bootstrap (mock) {
    mock.onGet(apis.navList).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, navList])
      })
    })
  }
}
