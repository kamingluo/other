<cu-custom bgColor="bg-gradual-blue" isBack="{{true}}">
<view slot="backText">返回</view>
  <view slot="content">违章查询结果</view>
</cu-custom>

<view class='cu-load load-modal' qq:if="{{loadModal}}">
<!-- <view class='cu-load load-modal' > -->
  <view class='cuIcon-deliver_fill text-orange'></view>
  <!-- <image src='/images/logo.png' class='png' mode='aspectFit'></image> -->
  <view class='gray-text'>查询中...</view>
</view>

  <view  class='empty' qq:else >
      <image src='/images/empty.svg' class='emptypng' mode='aspectFit'></image>
      <text class="text-black text-bold">恭喜！您的车辆没有违章记录</text>
      <text class="text-grey">要一直保持良好的驾驶习惯哦</text>
  </view>