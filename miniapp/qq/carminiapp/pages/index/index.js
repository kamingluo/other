//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');

Page({
  data: {
    usercar: [],
    cardCur: 0,
    swiperList: [{
      id: 2,
      type: 'image',
      url: 'http://qiniu.luojiaming.vip/carimagebanner.jpg'
    },],
  },

  onLoad: function () {
  },
  onShow: function () {
    this.cardata()
  },


  //查询违章信息跳转
  query: function () {
    qq.navigateTo({
      url: '../carViolation/carViolation'
    })
  },
  //添加车辆
  addcar: function () {
    qq.navigateTo({
      url: '../queryviolation/queryviolation'
    })
  },

  //查询用户车辆信息
  cardata: function () {
    qq.login({
      success: res => {
        console.log("login", res)
        request({
          service: '/car/usercar',
          showToast: true,
          data: {
            code: res.code,
          },
          success: res => {
            console.log('打印车辆信息', res);
            this.setData({
              usercar: res.usercar
            })
          },
        })
      }
    })
  },

  gdtbanneradclick: function (e) {
    console.log("点击广点通banner广告", e.currentTarget)
    // let userdata = wx.getStorageSync('userdata')
    // let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    // app.aldstat.sendEvent('我的页面点击广点通banner广告', data);
  },

  onShareAppMessage(res) {
    let userid = qq.getStorageSync('userdata').id
    let userchannel = qq.getStorageSync('userdata').channel
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '违章查询，查查你的爱车有没有违章！',
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid, // 路径，传递参数到指定页面。
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564232549949&di=15e6a6b02b322cb954aa59f8b042e0e2&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2677683685%2C3307097535%26fm%3D214%26gp%3D0.jpg',
    }
  }


})
