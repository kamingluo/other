var app = getApp();
const {
  request
} = require('./request.js')
const baseConfig = require('./config.js')

function register(channel, master_id, scene) {
  //console.log('传过来的注册信息', channel, master_id);
  wx.login({
    success: res => {
      request({
        service: '/user/register',
        data: {
          code: res.code,
          channel: channel,
          master_id: master_id,
          scene: scene
        },
        success: res => {
          wx.setStorageSync('userdata', res.userdata)
        },
         fail: res => {
            // console.log('错误捕捉', res);
        },
           complete: res => {
            // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}

function xmadconfig(){
  request({
    service: '/ad/xmad',
    data: {},
    success: res => {
      // console.log("小盟广告配置",res)
      wx.setStorageSync('xmadconfig', res.xmaddata)
    },
  })

}


module.exports = {
  register: register,
  xmadconfig: xmadconfig,
}