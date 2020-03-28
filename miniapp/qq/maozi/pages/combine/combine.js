// pages/combine/combine.js
const app=getApp();
Page({

  data: {
  
  },

  onLoad: function (options) {
   //var src = app.globalData.bgPic
   // src = src.substr(0, src.length - 3) + 0;
    //src = src+0,
    //console.log(src)
    wx.getImageInfo({
      src: app.globalData.bgPic,
      success: res => {
          this.bgPic=res.path
        this.draw();
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  onShareAppMessage: function () {
     return {
      title: '给你的头像加上圣诞帽吧!',
      desc: '给你的头像加上圣诞帽吧!',
      imageUrl: 'http://material.gzywudao.top/shengdan.jpg',
      path: '/pages/maozi/index',
    }
  },

  
  draw() {
    let scale = app.globalData.scale;
    let rotate = app.globalData.rotate;
    let hat_center_x = app.globalData.hat_center_x;
    let hat_center_y = app.globalData.hat_center_y;
    let currentHatId = app.globalData.currentHatId;
    const pc = wx.createCanvasContext('myCanvas');
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const hat_size = 100 * scale;


    pc.clearRect(0, 0, windowWidth, 300);
    pc.drawImage(this.bgPic, windowWidth / 2 - 150, 0, 300, 300);
    pc.translate(hat_center_x,hat_center_y);
    pc.rotate(rotate * Math.PI / 180);
    pc.drawImage("../../images/shengdan/" + currentHatId + ".png", -hat_size / 2, -hat_size / 2, hat_size, hat_size);
    pc.draw();
  },

  fanhui:function(){
    wx.navigateTo({
      url: '../maozi/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  savePic() {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    wx.canvasToTempFilePath({
      x: windowWidth / 2 - 150,
      y: 0,
      height: 300,
      width: 300,
      canvasId: 'myCanvas',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            
            console.log("success:" + res);
          }, fail(e) {
            console.log("err:" + e);
          }
        })
      }
    });
  }
})