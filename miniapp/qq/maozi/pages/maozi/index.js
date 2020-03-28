// pages/index/index.js
var baseConfig = require('../../utils/config.js') //配置文件
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {

  },

  onShareAppMessage: function () {

    return {
      title: '给你的头像加上圣诞帽吧!',
      desc: '给你的头像加上圣诞帽吧!',
      imageUrl: 'http://material.gzywudao.top/shengdan.jpg',
      path: '/pages/maozi/index',
    }

  },

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  
  getAvatar() {
    var that = this
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo;
        let myimg = res.userInfo.avatarUrl;
        let bgPic = myimg.substr(0, myimg.length - 3) + 0;
        wx.setStorageSync('bgPic', bgPic) //把信息存入缓存
        that.setData({
          userInfo: res.userInfo,
          bgPic: bgPic
        });
        that.assignPicChoosed();
      },
    })
  },





  chooseImage(from) {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic: res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res) => {
        this.assignPicChoosed();
      },
      complete: (res) => {
        this.assignPicChoosed();
      },
    })
  },
  nextPage() {
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
    })
  }
})