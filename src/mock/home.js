import {apis} from '../api/api'

const homeData = {
  'success': true,
  'message': 'success',
  'code': 200,
  'timestamp': 1563590237013,
  'result': [{
    'id': 7,
    'name': '轮播图',
    'type': 0,
    'sortOrder': 0,
    'position': 0,
    'limitNum': 5,
    'status': 1,
    'remark': '',
    'created': 1523766787000,
    'updated': 1523766787000,
    'panelContentItems': [{
      'id': 33,
      'panelId': 7,
      'type': 0,
      'productId': 150642571432835,
      'sortOrder': 2,
      'fullUrl': '',
      'picUrl': '/static/images/iii.png',
      'picUrl2': 'https://i.loli.net/2018/11/04/5bdebb109a29a.png',
      'picUrl3': 'https://i.loli.net/2018/11/04/5bdeba6753403.png',
      'created': 1523970502000,
      'updated': 1524192439000,
      'salePrice': 1.00,
      'productName': '捐赠商品',
      'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
      'productImageBig': 'https://i.loli.net/2018/11/04/5bdeba4028e90.png',
      'bgColor': 'rgb(26,26,29)'
    }, {
      'id': 34,
      'panelId': 7,
      'type': 0,
      'productId': 150635087972564,
      'sortOrder': 3,
      'fullUrl': null,
      'picUrl': 'https://i.loli.net/2018/11/04/5bdebbd45a0b0.png',
      'picUrl2': '',
      'picUrl3': '',
      'created': 1523970510000,
      'updated': 1523970512000,
      'salePrice': 1.00,
      'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
      'subTitle': '此仅为支付测试商品 拍下不会发货',
      'productImageBig': 'https://s1.ax1x.com/2018/05/19/Ccdiid.png',
      'bgColor': 'rgb(106,197,151)'
    }]
  },
  {
    'id': 2,
    'name': '官方精选',
    'type': 3,
    'sortOrder': 3,
    'position': 0,
    'limitNum': 8,
    'status': 1,
    'remark': '',
    'created': null,
    'updated': 1524108059000,
    'panelContentItems': [{
      'id': 29,
      'panelId': 2,
      'type': 2,
      'productId': 150642571432843,
      'sortOrder': 0,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/1/1220858shoujilouceng.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1523794475000,
      'updated': 1524195687000,
      'salePrice': 1999.00,
      'productName': '坚果 3',
      'subTitle': '漂亮得不像实力派',
      'productImageBig': 'https://resource.smartisan.com/resource/1/1220858shoujilouceng.jpg'
    }, {
      'id': 8,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432837,
      'sortOrder': 1,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/3a7522290397a9444d7355298248f197.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1506330228000,
      'updated': 1524151406000,
      'salePrice': 49.00,
      'productName': '坚果 3 前屏钢化玻璃保护膜',
      'subTitle': '超强透光率、耐刮花、防指纹',
      'productImageBig': 'https://resource.smartisan.com/resource/3a7522290397a9444d7355298248f197.jpg'
    }, {
      'id': 9,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432838,
      'sortOrder': 2,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1506330275000,
      'updated': 1524192497000,
      'salePrice': 79.00,
      'productName': '坚果 3 绒布国旗保护套',
      'subTitle': '质感精良、完美贴合、周到防护',
      'productImageBig': 'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg'
    }, {
      'id': 14,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432839,
      'sortOrder': 3,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/5e4b1feddb13639550849f12f6b2e202.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1508681641000,
      'updated': 1524192509000,
      'salePrice': 29.00,
      'productName': '坚果 3 TPU 软胶透明保护套',
      'subTitle': '轻薄透明、完美贴合、TPU 环保材质',
      'productImageBig': 'https://resource.smartisan.com/resource/5e4b1feddb13639550849f12f6b2e202.jpg'
    }, {
      'id': 15,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432840,
      'sortOrder': 4,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/10525c4b21f039fc8ccb42cd1586f5cd.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1508681692000,
      'updated': 1524192523000,
      'salePrice': 89.00,
      'productName': 'Smartisan 半入耳式耳机',
      'subTitle': '经典配色、专业调音、高品质麦克风',
      'productImageBig': 'https://resource.smartisan.com/resource/10525c4b21f039fc8ccb42cd1586f5cd.jpg'
    }, {
      'id': 16,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432841,
      'sortOrder': 5,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/b899d9b82c4bc2710492a26af021d484.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1508681751000,
      'updated': 1524192542000,
      'salePrice': 49.00,
      'productName': '坚果 3 TPU 软胶保护套',
      'subTitle': 'TPU 环保材质、完美贴合、周到防护',
      'productImageBig': 'https://resource.smartisan.com/resource/b899d9b82c4bc2710492a26af021d484.jpg'
    }, {
      'id': 17,
      'panelId': 2,
      'type': 0,
      'productId': 150642571432842,
      'sortOrder': 6,
      'fullUrl': '',
      'picUrl': 'https://resource.smartisan.com/resource/abb6986430536cd9365352b434f3c568.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1508681821000,
      'updated': 1524192557000,
      'salePrice': 79.00,
      'productName': '坚果 3 "足迹"背贴 乐高创始人出生',
      'subTitle': '1891 年 4 月 7 日',
      'productImageBig': 'https://resource.smartisan.com/resource/abb6986430536cd9365352b434f3c568.jpg'
    }]
  },  
  {
    'id': 8,
    'name': '活动版块',
    'type': 1,
    'sortOrder': 1,
    'position': 0,
    'limitNum': 4,
    'status': 1,
    'remark': '',
    'created': 1523790300000,
    'updated': 1523790300000,
    'panelContentItems': [{
      'id': 25,
      'panelId': 8,
      'type': 0,
      'productId': 150642571432835,
      'sortOrder': 1,
      'fullUrl': 'https://www.smartisan.com/jianguo3-accessories',
      'picUrl': 'https://resource.smartisan.com/resource/6/610400xinpinpeijian.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1523790463000,
      'updated': 1524151234000,
      'salePrice': 1.00,
      'productName': '捐赠商品',
      'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
      'productImageBig': 'https://resource.smartisan.com/resource/6/610400xinpinpeijian.jpg'
    }, {
      'id': 26,
      'panelId': 8,
      'type': 0,
      'productId': 150635087972564,
      'sortOrder': 2,
      'fullUrl': 'https://www.smartisan.com/service/#/tradein',
      'picUrl': 'https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1523790480000,
      'updated': 1524151248000,
      'salePrice': 1.00,
      'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
      'subTitle': '此仅为支付测试商品 拍下不会发货',
      'productImageBig': 'https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg'
    }, {
      'id': 27,
      'panelId': 8,
      'type': 0,
      'productId': 150642571432835,
      'sortOrder': 3,
      'fullUrl': 'https://www.smartisan.com/category?id=69',
      'picUrl': 'https://resource.smartisan.com/resource/4/489673079577637073.png',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1523790504000,
      'updated': 1524151261000,
      'salePrice': 1.00,
      'productName': '捐赠商品',
      'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
      'productImageBig': 'https://resource.smartisan.com/resource/4/489673079577637073.png'
    }, {
      'id': 28,
      'panelId': 8,
      'type': 0,
      'productId': 150635087972564,
      'sortOrder': 4,
      'fullUrl': 'https://www.smartisan.com/',
      'picUrl': 'https://resource.smartisan.com/resource/fe6ab43348a43152b4001b4454d206ac.jpg',
      'picUrl2': null,
      'picUrl3': null,
      'created': 1523790538000,
      'updated': 1524151273000,
      'salePrice': 1.00,
      'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
      'subTitle': '此仅为支付测试商品 拍下不会发货',
      'productImageBig': 'https://resource.smartisan.com/resource/fe6ab43348a43152b4001b4454d206ac.jpg'
    }]
  }, 
  // {
  //   'id': 1,
  //   'name': '热门商品',
  //   'type': 2,
  //   'sortOrder': 2,
  //   'position': 0,
  //   'limitNum': 3,
  //   'status': 1,
  //   'remark': '',
  //   'created': 1524066553000,
  //   'updated': 1523790316000,
  //   'panelContentItems': [{
  //     'id': 22,
  //     'panelId': 1,
  //     'type': 0,
  //     'productId': 150635087972564,
  //     'sortOrder': 1,
  //     'fullUrl': null,
  //     'picUrl': 'https://i.loli.net/2018/07/13/5b48a7f468bf2.png',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682391000,
  //     'updated': 1508682391000,
  //     'salePrice': 1.00,
  //     'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
  //     'subTitle': '此仅为支付测试商品 拍下不会发货',
  //     'productImageBig': 'https://i.loli.net/2018/07/13/5b48a7f468bf2.png'
  //   }, {
  //     'id': 23,
  //     'panelId': 1,
  //     'type': 0,
  //     'productId': 150642571432835,
  //     'sortOrder': 2,
  //     'fullUrl': '',
  //     'picUrl': 'https://i.loli.net/2018/07/13/5b48a7f46be51.png',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682400000,
  //     'updated': 1523969975000,
  //     'salePrice': 1.00,
  //     'productName': '捐赠商品',
  //     'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
  //     'productImageBig': 'https://i.loli.net/2018/07/13/5b48a7f46be51.png'
  //   }]
  // }, 
  
  // {
  //   'id': 10,
  //   'name': '品牌周边',
  //   'type': 3,
  //   'sortOrder': 4,
  //   'position': 0,
  //   'limitNum': 7,
  //   'status': 1,
  //   'remark': null,
  //   'created': 1524066632000,
  //   'updated': 1524066635000,
  //   'panelContentItems': [{
  //     'id': 40,
  //     'panelId': 10,
  //     'type': 3,
  //     'productId': null,
  //     'sortOrder': 0,
  //     'fullUrl': 'http://xmall.exrick.cn/#/goods?cid=1184',
  //     'picUrl': 'https://resource.smartisan.com/resource/z/zhoubianshangpin1220858web.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067373000,
  //     'updated': 1524194159000,
  //     'salePrice': null,
  //     'productName': null,
  //     'subTitle': null,
  //     'productImageBig': 'https://resource.smartisan.com/resource/z/zhoubianshangpin1220858web.jpg'
  //   }, {
  //     'id': 41,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432845,
  //     'sortOrder': 1,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/2f9a0f5f3dedf0ed813622003f1b287b.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067376000,
  //     'updated': 1524155076000,
  //     'salePrice': 199.00,
  //     'productName': 'Smartisan 帆布鞋',
  //     'subTitle': '一双踏实、舒适的帆布鞋',
  //     'productImageBig': 'https://resource.smartisan.com/resource/2f9a0f5f3dedf0ed813622003f1b287b.jpg'
  //   }, {
  //     'id': 42,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432836,
  //     'sortOrder': 2,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/2b05dbca9f5a4d0c1270123f42fb834c.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067380000,
  //     'updated': 1524155101000,
  //     'salePrice': 149.00,
  //     'productName': 'Smartisan T恤 伍迪·艾伦出生',
  //     'subTitle': '一件内外兼修的舒适T恤',
  //     'productImageBig': 'https://resource.smartisan.com/resource/2b05dbca9f5a4d0c1270123f42fb834c.jpg'
  //   }, {
  //     'id': 43,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432846,
  //     'sortOrder': 3,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/804edf579887b3e1fae4e20a379be5b5.png',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067384000,
  //     'updated': 1524155117000,
  //     'salePrice': 149.00,
  //     'productName': 'Smartisan T恤 任天堂发售“红白机”',
  //     'subTitle': '100% 美国 SUPIMA 棉、舒适拉绒质地',
  //     'productImageBig': 'https://resource.smartisan.com/resource/804edf579887b3e1fae4e20a379be5b5.png'
  //   }, {
  //     'id': 44,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432848,
  //     'sortOrder': 4,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/a1c53b5f12dd7ef790cadec0eaeaf466.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067390000,
  //     'updated': 1524192952000,
  //     'salePrice': 199.00,
  //     'productName': 'Smartisan 牛津纺衬衫',
  //     'subTitle': '一件无拘无束的舒适衬衫',
  //     'productImageBig': 'https://resource.smartisan.com/resource/a1c53b5f12dd7ef790cadec0eaeaf466.jpg'
  //   }, {
  //     'id': 45,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432847,
  //     'sortOrder': 5,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/daa975651d6d700c0f886718c520ee19.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067395000,
  //     'updated': 1524192896000,
  //     'salePrice': 249.00,
  //     'productName': 'Smartisan Polo衫 经典款',
  //     'subTitle': '一件表里如一的舒适 POLO 衫',
  //     'productImageBig': 'https://resource.smartisan.com/resource/daa975651d6d700c0f886718c520ee19.jpg'
  //   }, {
  //     'id': 46,
  //     'panelId': 10,
  //     'type': 0,
  //     'productId': 150642571432849,
  //     'sortOrder': 6,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524067400000,
  //     'updated': 1524192903000,
  //     'salePrice': 9.90,
  //     'productName': 'Smartisan 明信片',
  //     'subTitle': '优质卡纸、包装精致、色彩饱满',
  //     'productImageBig': 'https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg'
  //   }]
  // }, 
  // {
  //   'id': 3,
  //   'name': '品牌精选',
  //   'type': 3,
  //   'sortOrder': 5,
  //   'position': 0,
  //   'limitNum': 7,
  //   'status': 1,
  //   'remark': '',
  //   'created': 1524066559000,
  //   'updated': 1523962455000,
  //   'panelContentItems': [{
  //     'id': 30,
  //     'panelId': 3,
  //     'type': 2,
  //     'productId': 150642571432850,
  //     'sortOrder': 0,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/a/acillouceng1220856.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1523794518000,
  //     'updated': 1524194283000,
  //     'salePrice': 199.00,
  //     'productName': 'ACIL E1 颈挂式蓝牙耳机',
  //     'subTitle': '无感佩戴，一切变得简单',
  //     'productImageBig': 'https://resource.smartisan.com/resource/a/acillouceng1220856.jpg'
  //   }, {
  //     'id': 2,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 150642571432851,
  //     'sortOrder': 1,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/7ac3af5a92ad791c2b38bfe1e38ee334.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1506096182000,
  //     'updated': 1524155020000,
  //     'salePrice': 2699.00,
  //     'productName': '优点智能 E1 推拉式智能指纹密码锁',
  //     'subTitle': '推拉一下，轻松开关',
  //     'productImageBig': 'https://resource.smartisan.com/resource/7ac3af5a92ad791c2b38bfe1e38ee334.jpg'
  //   }, {
  //     'id': 7,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 816448,
  //     'sortOrder': 2,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/41cb562a47d4831e199ed7e2057f3b61.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1506178691000,
  //     'updated': 1524154469000,
  //     'salePrice': 2799.00,
  //     'productName': '极米无屏电视 CC',
  //     'subTitle': '720P 高清分辨率、JBL 音响、两万毫安续航力',
  //     'productImageBig': 'https://resource.smartisan.com/resource/41cb562a47d4831e199ed7e2057f3b61.jpg'
  //   }, {
  //     'id': 18,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 847276,
  //     'sortOrder': 3,
  //     'fullUrl': null,
  //     'picUrl': 'https://resource.smartisan.com/resource/99c548bfc9848a8c95f4e4f7f2bc1095.png',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682172000,
  //     'updated': 1508682172000,
  //     'salePrice': 1499.00,
  //     'productName': 'FIIL Diva Pro 全场景无线降噪耳机',
  //     'subTitle': '智能语音交互、高清无损本地存储播放',
  //     'productImageBig': 'https://resource.smartisan.com/resource/99c548bfc9848a8c95f4e4f7f2bc1095.png'
  //   }, {
  //     'id': 19,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 150642571432844,
  //     'sortOrder': 4,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/71432ad30288fb860a4389881069b874.png',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682215000,
  //     'updated': 1524194738000,
  //     'salePrice': 2999.00,
  //     'productName': '畅呼吸智能空气净化器超级除甲醛版',
  //     'subTitle': '购新空净 赠价值 699 元活性炭滤芯',
  //     'productImageBig': 'https://resource.smartisan.com/resource/71432ad30288fb860a4389881069b874.png'
  //   }, {
  //     'id': 20,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 847276,
  //     'sortOrder': 5,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/804b82e4c05516e822667a23ee311f7c.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682294000,
  //     'updated': 1524154503000,
  //     'salePrice': 1499.00,
  //     'productName': 'FIIL Diva Pro 全场景无线降噪耳机',
  //     'subTitle': '智能语音交互、高清无损本地存储播放',
  //     'productImageBig': 'https://resource.smartisan.com/resource/804b82e4c05516e822667a23ee311f7c.jpg'
  //   }, {
  //     'id': 21,
  //     'panelId': 3,
  //     'type': 0,
  //     'productId': 150642571432852,
  //     'sortOrder': 6,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/367d93db1d58f9f3505bc0ec18efaa44.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1508682328000,
  //     'updated': 1524155051000,
  //     'salePrice': 499.00,
  //     'productName': 'FIIL Driifter 脖挂蓝牙耳机',
  //     'subTitle': '全天佩戴 抬手就听 HEAC稳连技术',
  //     'productImageBig': 'https://resource.smartisan.com/resource/367d93db1d58f9f3505bc0ec18efaa44.jpg'
  //   }]
  // }, 
  // {
  //   'id': 9,
  //   'name': '活动版块2',
  //   'type': 1,
  //   'sortOrder': 7,
  //   'position': 0,
  //   'limitNum': 4,
  //   'status': 1,
  //   'remark': '',
  //   'created': null,
  //   'updated': 1524110267000,
  //   'panelContentItems': [{
  //     'id': 65,
  //     'panelId': 9,
  //     'type': 0,
  //     'productId': 150635087972564,
  //     'sortOrder': 1,
  //     'fullUrl': '',
  //     'picUrl': 'https://resource.smartisan.com/resource/f82c9e2774ce0e391a17f1b20c1e0c90.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1554871004000,
  //     'updated': 1554871004000,
  //     'salePrice': 1.00,
  //     'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
  //     'subTitle': '此仅为支付测试商品 拍下不会发货',
  //     'productImageBig': 'https://resource.smartisan.com/resource/f82c9e2774ce0e391a17f1b20c1e0c90.jpg'
  //   }, {
  //     'id': 37,
  //     'panelId': 9,
  //     'type': 0,
  //     'productId': 150642571432835,
  //     'sortOrder': 2,
  //     'fullUrl': 'https://www.smartisan.com/os/#/4-x',
  //     'picUrl': 'https://resource.smartisan.com/resource/5ea6f0905535d7b11258e9a0f9b1abeb.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524066711000,
  //     'updated': 1524196999000,
  //     'salePrice': 1.00,
  //     'productName': '捐赠商品',
  //     'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
  //     'productImageBig': 'https://resource.smartisan.com/resource/5ea6f0905535d7b11258e9a0f9b1abeb.jpg'
  //   }, {
  //     'id': 38,
  //     'panelId': 9,
  //     'type': 0,
  //     'productId': 150635087972564,
  //     'sortOrder': 3,
  //     'fullUrl': 'https://www.smartisan.com/pr/#/video/changhuxi-jinghuaqi',
  //     'picUrl': 'https://resource.smartisan.com/resource/c245ada282824a4a15e68bec80502ad4.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524066718000,
  //     'updated': 1524197011000,
  //     'salePrice': 1.00,
  //     'productName': '支付测试商品 IPhone X 全面屏 全面绽放',
  //     'subTitle': '此仅为支付测试商品 拍下不会发货',
  //     'productImageBig': 'https://resource.smartisan.com/resource/c245ada282824a4a15e68bec80502ad4.jpg'
  //   }, {
  //     'id': 39,
  //     'panelId': 9,
  //     'type': 0,
  //     'productId': 150642571432835,
  //     'sortOrder': 4,
  //     'fullUrl': 'https://www.smartisan.com/pr/#/video/onestep-introduction',
  //     'picUrl': 'https://resource.smartisan.com/resource/m/minibanner_03.jpg',
  //     'picUrl2': null,
  //     'picUrl3': null,
  //     'created': 1524066722000,
  //     'updated': 1524197021000,
  //     'salePrice': 1.00,
  //     'productName': '捐赠商品',
  //     'subTitle': '您的捐赠将用于本站维护 给您带来更好的体验',
  //     'productImageBig': 'https://resource.smartisan.com/resource/m/minibanner_03.jpg'
  //   }]
  // }
]
}

export default {
  bootstrap (mock) {
    mock.onGet(apis.productHome).reply(config => {
      return new Promise((resolve, reject) => {
        resolve([200, homeData])
      })
    })
  }
}
