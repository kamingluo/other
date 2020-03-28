var app = getApp();
const {
  request
} = require('./request.js')
const baseConfig = require('./config.js')

function register(channel, master_id) {
  //console.log('传过来的注册信息', channel, master_id);
  qq.login({
    success: res => {
      request({
        service: '/user/register',
        data: {
          code: res.code,
          channel: channel,
          master_id: master_id
        },
        success: res => {
          //console.log('打印注册信息', res);
          qq.setStorageSync('openid', res.userdata.openid)
          qq.setStorageSync('userdata', res.userdata)
        },
        fail: res => {
          //console.log('错误捕捉', res);
        },
        complete: res => {
          // console.log('成功不成功都执行函数', res);
        },
      })
    }
  })
}







module.exports = {
  register: register,
}