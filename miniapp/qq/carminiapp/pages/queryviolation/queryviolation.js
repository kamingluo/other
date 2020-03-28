//index.js
//获取应用实例
const app = getApp()
const {
  request
} = require('./../../utils/request.js');

Page({
  data: {
    city: "粤",
    carnumber: '',
    frameno: '',
    engineno: '',
    mobile: '',
    citydata: [],
    citydatashow: false
  },

  onLoad: function () {
    this.carcity()
  },


  //查询违章信息跳转
  query: function () {
    qq.navigateTo({
      url: '../carViolation/carViolation'
    })
  },

  //点击城市展开选择城市或者隐藏
  clickcity: function (e) {
    console.log("点击城市", e)
    if (this.data.citydatashow == false) {
      this.setData({
        citydatashow: true
      })
    }
    else {
      this.setData({
        citydatashow: false
      })
    }
  },

  //点击选择城市
  choicecity: function (e) {
    console.log(e._relatedInfo.anchorRelatedText)
    this.setData({
      city: e._relatedInfo.anchorRelatedText,
      citydatashow: false
    })

  },

  //查询违章省份简称
  carcity: function () {
    request({
      service: '/car/carcity',
      success: res => {
        console.log('打印省份简称信息', res);
        this.setData({
          citydata: res.result.data
        })
      },
    })
  },

  carnumber: function (e) {
    this.setData({
      carnumber: e.detail.value
    })
  },
  frameno: function (e) {
    this.setData({
      frameno: e.detail.value
    })
  },
  engineno: function (e) {
    this.setData({
      engineno: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  //查询按钮
  BtnClick: function (e) {
    this.addcar()
    console.log(" city:" + this.data.city + "carnumber：" + this.data.carnumber + " frameno：" + this.data.frameno + " engineno:" + this.data.engineno + " mobile:" + this.data.mobile);
    this.query()
  },


  addcar: function () {
    qq.login({
      success: res => {
        request({
          service: '/car/addcar',
          showToast: true,
          data: {
            code: res.code,
            lsprefix: this.data.city,
            lsnum: this.data.carnumber,
            frameno: this.data.frameno,
            engineno: this.data.engineno,
            mobile: this.data.mobile
          },
          success: res => {
            console.log('打印添加车辆信息成功回调', res);
          },
        })
      }
    })
  }

})
