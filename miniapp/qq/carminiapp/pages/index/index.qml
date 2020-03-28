<cu-custom bgColor="bg-gradual-blue">
  <view slot="content">违章查询</view>
</cu-custom>

<view >
<swiper class="screen-swiper round-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
  <swiper-item qq:for="{{swiperList}}" qq:key>
    <image src="{{item.url}}" mode="aspectFill" qq:if="{{item.type=='image'}}"></image>
    <video src="{{item.url}}" autoplay loop muted show-play-btn="{{false}}" controls="{{false}}" objectFit="cover" qq:if="{{item.type=='video'}}"></video>
  </swiper-item>
</swiper>
</view>

<view  class='mycardata' qq:if="{{usercar.length}}" >
<view class='centered' ><view class='mycartitle' >我的车辆</view></view>
<view class='centered' qq:for="{{usercar}}" qq:key="item"   qq:key="key" >
<view class='card radius shadow-warp bg-white centered '  >
<view class='card-left centered'><image  src='/images/car.svg'  ></image></view>
<view class='card-center ' >
<view  class='carnumber' >车牌号：{{item.lsprefix}}{{item.lsnum}}</view>
<view  >车架号：{{item.frameno}}</view>
<view >发动机号：{{item.engineno}}</view>
</view>
<view class='card-right centered' ><button bindtap='query' >查违章</button></view>
</view>
</view>
<view class='centered'>
<button bindtap='addcar' class='addcarbutton cu-btn block bg-blue margin-tb-sm lg'>添加车辆</button>
</view>
</view>

<view qq:else class='centered' >
<view class='nocaraddcar radius shadow-warp bg-white ' bindtap='addcar' >
<view><image  src='/images/add.svg'  ></image></view>
<view class='nocaraddcar-text' >添加车辆</view>
</view>
</view>





<!-- 广点通banner广告开始-->
<view class='centered'>
  <view class='gdtad'>
    <ad  unit-id="53799997ea74906e70021c919de7d2f9"></ad>
  </view>
</view>
<!-- 广点通banner广告结束-->

