var app = getApp();

function share(type, expressName, expressNumber) {
  let userid = wx.getStorageSync('userdata').id
  let userchannel = wx.getStorageSync('userdata').channel
  if (type == 1) {//button分享
    return {
      title: expressName + expressNumber,
      desc: '分享给好友',
      imageUrl: 'http://material.gzywudao.top/image/express/expressbuttonshare.jpg',
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid + '&expressNumber=' + expressNumber + '&expressName=' + expressName, // 路径，传递参数到指定页面。
    }
  }
  else {

    return {
      title: '分享一个好用的快递查询管理工具',
      desc: '分享一个好用的快递查询管理工具',
      imageUrl: 'http://material.gzywudao.top/image/express/expressimg.jpg',
      path: '/pages/index/index?channel=' + userchannel + '&master_id=' + userid, // 路径，传递参数到指定页面。
    }
  }
}



module.exports = {
  share: share,
}