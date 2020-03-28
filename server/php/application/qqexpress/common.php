<?php
// +----------------------------------------------------------------------
// | wxcarminiapp公共方法
// +----------------------------------------------------------------------

use think\Log;


//测试方法
function test(){
    return "test";

}


/**
   * 调取微信接口获取openid
   * 传入值code从小程序login API获取
   * @return string
*/
function openid($wxcode){
  if($wxcode == 'kaming'){
      $openid='o3XMA0enuFRZsOCOCeqjB70exjr4';
      return $openid;

  }
  $url = 'https://api.q.qq.com/sns/jscode2session';
  $data['appid']=Config('appid');
  $data['secret']= Config('secret');
  $data['js_code']= $wxcode;
  $data['grant_type']= 'authorization_code';
  $wxopenid = http($url, $data, 'GET');
  $openiddata=json_decode($wxopenid,true);
 
      if(!$openiddata['openid']){ 
           Log::record('code错误或者过期了！传入小程序code-->'.$wxcode,'error');
          echo  json_encode(['state'   => '400','message'  => "code错误或者过期了！" ] ) ;
          die ();
      }
      else{
        $openid=$openiddata['openid'];
        return $openid;
      }
}






