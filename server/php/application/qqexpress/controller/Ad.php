<?php
namespace app\qqexpress\controller;
use think\Db;
use think\Request;
use think\Exception;
use think\Log;
class Ad
{
    public function xmad()
    {
    	$dbdata=db('xmad')->find();//查询小盟广告配置信息
    	$state=['state'   => '200','message'  => "小盟广告配置查询成功" ];
        $resdata=array_merge($state,array('xmaddata'=>$dbdata));
    	return $resdata ;
    }
    
     public function test()
    {
        return  "广告模块" ;
    }
}
