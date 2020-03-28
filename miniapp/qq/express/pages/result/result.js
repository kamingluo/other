const app = getApp()
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
Page({
  data: {
    expressdata: '',
    fristdata: '',
    lastdata: '',
    xmad: {
      adData: {},
      ad: {
        banner1: 'xm2336790407fe93c4f8691b536053f2',
        banner2: "xm3c840278f42aec26746409d8c85d3e",
        banner3: "xm4ff00778d90c0496fc0df8e4ecbd6b",
        banner4: "xm6816a1df996a69067bc19e426a5c89",
        banner5: "xm0eba53c3fbc3835425259ce973de28",
      }
    },
  },

  //加载框
  loadModal() {
    this.setData({
      loadModal: true
    })
  },
  //查询快递信息
  query: function (number) {
    var that = this
    wx.request({
      url: 'https://www.gzywudao.top/api.php/express/express', //服务器地址
      data: {
        number: number,
      },
      header: {
        "Content-type": "application/json",
      },
      success: function (res) {
        //console.log("查询快递返回的信息",res)
        that.setData({
          loadModal: false
        })
        if (res.data.Success == false) {
          return;
        }
        that.addexpress(res.data)
        var data = res.data.Traces
        var lastdata = data.pop() || null
        //console.log("lastdata",lastdata)
        var fristdata = data.reverse()
        that.setData({
          expressdata: res.data,
          fristdata: fristdata,
          lastdata: lastdata,
          loadModal: false
        })
      },
      fail: function (err) { }
    })
  },

  addexpress: function (data) {
    //console.log("传过来处理的信息",data)
    let expressNumber = data.LogisticCode
    let expressName = data.ShipperName
    wx.login({
      success: res => {
        request({
          service: '/express/addexpress',
          data: {
            code: res.code,
            expressNumber: expressNumber,
            expressName: expressName
          },
          success: res => {
            //console.log('添加快递信息结果返回', res);
          },
        })
      }
    })
  },

  // gdtbanneradclick: function (e) {
  //   //console.log("点击广点通banner广告", e.currentTarget)
  //   let userdata = wx.getStorageSync('userdata')
  //   let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
  //   app.aldstat.sendEvent('点击广点通banner广告', data);
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("结果页面加载数据", options)
    this.loadModal()
    this.query(options.number)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    //console.log("分享掉起", options)
    if (options.from == 'button') {
      let expressName = options.target.dataset.name
      let expressNumber = options.target.dataset.number
      console.log("按钮分享", expressName, expressNumber)
      return share(1, expressName, expressNumber);
    } else {
      return share(2);
    }
  },
})