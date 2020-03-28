//index.js
//获取应用实例
const app = getApp()
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage; //小盟广告
const {
  request
} = require('./../../utils/request.js');
const {
  share
} = require('./../../utils/share.js');
let interstitialAd = null

Page({
  data: {
    expressnumber: '',
    userexpressdata: '',
    modalName: '',
    frame: false,
    framedata: '',
    inputShowed: false,
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
    wlad: {
      adData: {},
      ad: {
        banner: ["banner"],
      }
    },
    indexminiappdata: '',
    insertdata: '',
    insertdisplay: false,
    gdtbannerposition: '',

    swiperList: [{
      id: 2,
      type: 'image',
      url: 'http://material.gzywudao.top/kuaidi.jpg',
    }, ],
  },

  onLoad: function(e) {
    // console.log("indexonload", e)
    this.frame(e)
    this.indexminiappdata()
    this.insertdata()
    this.gdtbannerposition()
    this.gdtinsertad()
  },
  onShow: function() {
    this.userexpressdata()
  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    //console.log("页面隐藏")
    this.onshowgdtinsertad()
   

  },



  //加载插屏广告
  gdtinsertad:function(){
    
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-d487b16364fae405' })
      interstitialAd.onLoad(() => {
        console.log('插屏广告加载onLoad event emit')
      })
      interstitialAd.onError((err) => {
        console.log('插屏广告错误onError event emit', err)
      })
      interstitialAd.onClose((res) => {
        console.log('插屏广告被关闭onClose event emit', res)
      })
    }


  },
  //显示插屏广告
  onshowgdtinsertad:function(){
    var gdtinsertstatus = wx.getStorageSync('gdtinsertstatus')
    if (interstitialAd && gdtinsertstatus == 0) {
     // console.log("状态为0展示插屏广告")
      interstitialAd.show( 
     
      ).catch((err) => {
        console.error("插屏广告错误啦",err)
      })
    }
    else{
      wx.setStorageSync('gdtinsertstatus', 0)//把插屏状态置为0
      console.log("状态为1不展示插屏广告")
    }

    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('插屏广告方法调用次数', userdata);

  },


  inputShowed: function() { //输入框焦点获取
    this.setData({
      inputShowed: true
    })
  },

  userexpressdata: function() {
    wx.login({
      success: res => {
        request({
          service: '/express/userexpress',
          data: {
            code: res.code,
          },
          success: res => {
            //console.log('用户快递信息', res);
            if (res.userexpressdata.length < 1) {
              //console.log('用户没有快递信息', res);
              var falsedata = [{
                "id": 98,
                "openid": "o3XMA0enuFRZsOCOCeqjB70exjr4",
                "expressName": "韵达快递(示例)",
                "expressNumber": "3961577121876",
                "create_time": "2019-05-29 10:16:32",
                "updata_time": "2019-05-29 10:16:32"
              }];

              this.setData({
                userexpressdata: falsedata
              })

            } else {
              this.setData({
                userexpressdata: res.userexpressdata
              })
            }

          },
        })
      }
    })
  },


  gdtbannerposition: function() {
    var that = this
    let number = Math.floor(Math.random() * 3)
    if (number == 1) {
      var gdtbannerposition = {
        banneradposition1: 'adunit-66cc4c8b4d5f1941',
        banneradposition2: 'adunit-d0b985b91bcfd072',
        banneradposition3: 'adunit-3e034905c95ce64a',
      }

    } else if (number == 2) {
      var gdtbannerposition = {
        banneradposition1: 'adunit-d0b985b91bcfd072',
        banneradposition2: 'adunit-3e034905c95ce64a',
        banneradposition3: 'adunit-66cc4c8b4d5f1941',
      }
    } else {
      var gdtbannerposition = {
        banneradposition1: 'adunit-3e034905c95ce64a',
        banneradposition2: 'adunit-66cc4c8b4d5f1941',
        banneradposition3: 'adunit-d0b985b91bcfd072',
      }
    }

    this.setData({
      gdtbannerposition: gdtbannerposition
    })

    setTimeout(function() {
      that.setData({
        gdtbanneraddelay1: true
      })
      that.gdtbanneraddelay()
    }, 3000);

  },


  gdtbanneraddelay: function() {
    //console.log("执行我了")
    var that = this
    setTimeout(function() {
      that.setData({
        gdtbanneraddelay2: true
      })
    }, 7000);
  },


  gdtbanneradclick: function(e) {
    //console.log("点击广点通banner广告", e.currentTarget)
    let userdata = wx.getStorageSync('userdata')
    let data = Object.assign(userdata, e.currentTarget.dataset); //将addata合并
    app.aldstat.sendEvent('点击广点通banner广告', data);
  },


  indexminiappdata: function() {
    request({
      service: '/index/bottomminiappad',
      success: res => {
        //console.log('indexminiappdata信息', res);
        this.setData({
          indexminiappdata: res.indexminiappdata
        })
      }
    })
  },


  insertdata: function() {
    request({
      service: '/index/insert',
      success: res => {
        //console.log('首页插屏ad信息', res);
        this.setData({
          insertdata: res.insertdata,
          insertdisplay:true
        })
      }
    })
  },


  miniappadclick: function(e) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('点击首页下面跳转小程序广告', userdata);
    console.log("点击miniappadclick", e.currentTarget.dataset.data)
    var jumptype = e.currentTarget.dataset.data.type
    if (jumptype == 0) {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.data.appid,
        path: e.currentTarget.dataset.data.Jump,
        extraData: e.currentTarget.dataset.data.extradata,
        success(res) {
          console.log("跳转成功", e.currentTarget.dataset.data.Jump)
        }
      })
    } else {
      console.log("打开图片")
      let path = e.currentTarget.dataset.data.Jump
      wx.previewImage({
        urls: [path],
      })
    }
  },

  insertadclick: function(e) {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('首页insert广告', userdata);
    var that = this
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.data.appid,
      path: e.currentTarget.dataset.data.Jump,
      extraData: e.currentTarget.dataset.data.extradata,
      success(res) {
        //console.log("跳转成功", e.currentTarget.dataset.data.Jump)
        that.closeinsertad()
      }
    })
  },



  frame: function(e) {
    var framexpressNumber = e.expressNumber || null
    if (framexpressNumber == null) {

    } else {
      //这是打开弹框的，现在注释换直接跳
      // this.setData({
      //   framedata: e,
      //   frame: true
      // })
      wx.navigateTo({
        url: '../result/result?number=' + framexpressNumber
      })

    }
  },

  expressScancode: function() {
    wx.setStorageSync('gdtinsertstatus', 1)//禁止插屏广告
    wx.scanCode({
      success(res) {
        console.log("扫码返回", res)
        if (res.result < 10 || (res.result * 10) % 10 != 0) {
          wx.showToast({
            title: '请扫描正确的快递码',
            icon: 'none',
            duration: 3000
          })
          return;
        }
        wx.navigateTo({
          url: '../result/result?number=' + res.result
        })
      }
    })

  },

  deleteallexpress: function() {
    this.showModal()
  },

  expressnumber: function(e) {
    this.setData({
      expressnumber: e.detail.value
    })
  },

  querydata: function() {
    let userdata = wx.getStorageSync('userdata')
    app.aldstat.sendEvent('首页立即查询按钮', userdata);
    if (this.data.expressnumber.length < 10 || (this.data.expressnumber * 10) % 10 != 0) { //(this.data.expressnumber * 10) % 10 != 0这句的用处是判断是否纯数字
      wx.showToast({
        title: '请输入正确的快递单号',
        icon: 'none',
        duration: 2500
      })
      return;
    }
    wx.navigateTo({
      url: '../result/result?number=' + this.data.expressnumber
    })

  },

  query: function(e) {
    console.log("快递单号", e.currentTarget.dataset.number)
    wx.navigateTo({
      url: '../result/result?number=' + e.currentTarget.dataset.number
    })
    this.hideframe()
  },


  //长按列表事件
  handleLongPress: function(e) {
    var that = this;
    that.allfunction()
    var index = e.currentTarget.dataset.index;
    that.data.userexpressdata[index].hidden2 = !that.data.userexpressdata[index].hidden2;
    that.setData({
      userexpressdata: that.data.userexpressdata
    })
  },
  //隐藏并删除用户某个选择删除list的事件
  hideuserexpresslistdata: function(e) {
    console.log("删除", e)
    var that = this;
    that.deleoneexpressclick(e.currentTarget.dataset.number)

    // 获取事件绑定的当前组件
    var index = e.currentTarget.dataset.index;
    // 获取list中hidden的值
    // 隐藏或显示内容
    that.data.userexpressdata[index].hidden = !that.data.userexpressdata[index].hidden;
    that.setData({
      userexpressdata: that.data.userexpressdata
    })
  },

  //把所有用户快递信息列表的气泡隐藏
  allfunction: function() {
    var that = this;
    for (var i = 0; i < that.data.userexpressdata.length; i++) {
      that.data.userexpressdata[i].hidden2 = false
    }
    that.setData({
      userexpressdata: that.data.userexpressdata
    })
  },
  //用户删除单个快递信息
  deleoneexpressclick: function(expressNumber) {
    console.log("删除单个快递信息", expressNumber)
    wx.login({
      success: res => {
        request({
          service: '/express/deleteexpress',
          data: {
            code: res.code,
            expressNumber: expressNumber
          },
          success: res => {
            console.log('用户快递单个信息删除成功', res);
          },
        })
      }
    })
  },

  //确定删除用户的全部快递信息
  deleteallexpressclick: function() {
    console.log("确定删除全部信息")
    this.hideModal() //关闭弹框
    this.setData({
      userexpressdata: null //隐藏下面的先
    })
    wx.login({
      success: res => {
        request({
          service: '/express/deleteallexpress',
          data: {
            code: res.code,
          },
          success: res => {
            console.log('用户快递信息全部删除成功', res);
          },
        })
      }
    })
  },

  closeinsertad: function(e) {
    console.log("关闭插屏弹框")
    this.setData({
      insertdisplay: false
    })
  },

  showModal(e) {
    this.setData({
      modalName: 'DialogModal1'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  hideframe: function() {
    this.setData({
      frame: false
    })
  },
  listsharebutton: function() {
    console.log("分享按钮")
    this.onShareAppMessage()
  },


  onShareAppMessage: function(options) {
    console.log("分享掉起", options)
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