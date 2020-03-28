let baseConfig = require('./config.js')
const request = (config) => {
  if (config == null) {
    return false;
  }
  const data = config.data
  config.loading && wx.showLoading({
    title: '正在加载',
    mask: true
  });
  wx.showNavigationBarLoading();
  wx.request({
    url: config.url || (baseConfig.host + config.service),
    data: data,
    method: 'POST',
    success: function(res) {
      config.loading && wx.hideLoading();
      wx.hideNavigationBarLoading();
      if (res.state >= 400) {
        if (config.fail) {
          config.fail();
        } else {
          wx.showToast({
            title: '网络异常',
            icon: 'none'
          })
        }
      } else {
        //console.log("请求返回的res",res)
        const data = res.data;
        if (data && data.state == 200 || data.status==0) {
          config.success && config.success(data);
        } else {
          if (config.fail) {
            config.fail && config.fail(data);
          } else {
            config.showToast && wx.showToast({
              title: data && data.result && data.result.msg || '状态异常',
              icon: 'none'
            })
          }
        }
      }
    },
    fail: function(res) {
      config.loading && wx.hideLoading();
      wx.hideNavigationBarLoading();
      if (config.fail) {
        config.fail && config.fail(res);
      } else {
        config.showToast && wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
      }
    },
    complete: function(res) {
      config.complete && config.complete(res);
    }
  })
}

module.exports = {
  request: request
}