// 配置文件
const {
  cversion,
  cversionname
} = require('./version.js');

// 配置文件
const debug = 1; //是否debug包
const server = 1; //本地：0 远程：1;
const release = wx.getStorageSync('release') == 1; //是否测试
let host = ''; //域名
const HOST = {
  release: 'https://www.luojiaming.top/',
  test: "https://www.luojiaming.top/",
  local: "https://www.luojiaming.top/"
}
if (debug) {
  host = release ? HOST.release : (server ? HOST.test : HOST.local);
} else {
  host = HOST.release;
}

module.exports = {
  server: !debug ? 1 : release, //服务；非debug包server必为1
  service: "train_service", //对应服务的service
  host, //请求服务器域名
  //phead 参数
  pversion: '35',
  cversion: cversion,
  cversionname: cversionname,
  channel: '1000',

  // 游戏类型
  isLevels: true,
  //分享参数
  shareContent: {
    title: '',
    imageUrl: ''
  },
  //通用接口
  ports: {
    login: 1, //登录接口
    checkToken: 5, //校验登录接口
    userinfo: 4, //上传用户信息接口
    formid: 30 //上传fromId接口
  },
  loadingTip: '正在加载...', // 标准加载提示
  release, // 测试包的环境
  debug, // 是否为测试包
  firstPage: "/pages/index/index",
}