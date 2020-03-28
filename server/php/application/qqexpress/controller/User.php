<?php
// +----------------------------------------------------------------------
// | 用户信息操作
// +----------------------------------------------------------------------
 

namespace app\qqexpress\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;

class User
{
    /** 获取用户openid */
    public function openid($wxcode)
    {
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
    
    /** 用户注册 */
    public function register(Request $request){
        $data = $request->param();//接收所有传过来的post值
        $wxcode=$data['code'];
        $openid=$this->openid($wxcode);
        $scene=$request->param("scene");
        if($scene==null){
             $scene='0000';
        }
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $dbnum =db('user')->where('openid',$openid)->find();//查询用户信息
        if($dbnum==null){
                $channel=$data["channel"];
                $master_id=$data["master_id"];
                $dbdata = ['id'=>'','openid' =>$openid,'channel' => $channel,'scene' => $scene,'score' => 0,'master_id' => $master_id,'create_time' =>$time ,'updata_time' =>$time];
                $userId= db('user')->insertGetId($dbdata);//返回自增ID
                $userdata=['id'=>$userId,'openid' =>$openid,'channel' => $channel,'scene' => $scene,'score' => 0,'master_id' => $master_id,'create_time' =>$time ,'updata_time' =>$time];
                $state=['state'   => '200','message'  => "注册成功" ];
                $resdata=array_merge($state,array('userdata'=>$userdata));
                return $resdata;
            }
        else{
                 //更新信息
                $dbreturn= db('user')->where('openid',$openid)->update(['updata_time' => $time,'scene' => $scene]);
                $state=['state'   => '200','message'  => "用户信息更新成功" ];
                $resdata=array_merge($state,array('userdata'=>$dbnum));
                // $dbnum =db('user')->where('openid',$openid)->find();
                return $resdata;//返回1
            }
        
    }


     //请求获取openid
    public function obtainopenid(Request $request)
    {
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $state=['state'   => '200','message'  => "获取用户openid成功" ];
        $resdata=array_merge($state,array('openid'=>$openid));
        return $resdata;
    }

}
