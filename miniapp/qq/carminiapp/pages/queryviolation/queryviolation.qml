<cu-custom bgColor="bg-gradual-blue" isBack="{{true}}">
<view slot="backText">返回</view>
  <view slot="content">车辆信息填写</view>
</cu-custom>

<view class='toptitle' >
<text>请根据《机动车行驶证》仔细填写</text>
</view>
<view  class='form' >
<view class="cu-form-group">
  <view class="title">车牌号</view>
  <label class='abbreviation' bindtap="clickcity">{{city}}</label>
  <text class="cuIcon-unfold text-black"></text>
  <input bindinput="carnumber" maxlength='6' class='carnumber' placeholder="请输入剩余车牌信息"></input>
</view>
<view class="cu-form-group">
  <view class="title">车架号</view>
  <input bindinput="frameno" maxlength='6' placeholder="请输入车架号后六位"></input>
</view>
<view class="cu-form-group">
  <view class="title">发动机号</view>
  <input bindinput="engineno" maxlength='6' placeholder="请输入发动机号后六位"></input>
</view>
<view class="cu-form-group">
  <view class="title">手机号码</view>
  <input bindinput="mobile" maxlength='11' type='number' placeholder="非必填，之后方便提醒"></input>
  <view class="cu-capsule radius">
    <view class="cu-tag bg-blue">
      +86
    </view>
    <view class="cu-tag line-blue">
      中国大陆
    </view>
  </view>
</view>

<view >
  <button  class='querybutton' bindtap="BtnClick">保存并查询</button>
</view>

</view>



<view class='carcity animation-scale-up' qq:if="{{citydatashow}}">
  <view class="carcitybody">
    <view class="bg-cyan padding city" qq:for="{{citydata}}" qq:key="item" bindtap='choicecity'>{{item.lsprefix}}</view>
  </view>
</view>