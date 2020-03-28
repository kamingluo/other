<?php
namespace app\qqexpress\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	return  "express模块下的index控制器index方法" ;
    }
    
    //首页下面第三方小程序广告配置列表
    public function bottomminiappad()
    {
        $dbdata=db('index_bottom_miniapp_ad')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页下面第三方小程序列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }

    //首页插屏第三方小程序广告
    public function insert(){
        $dbdata=db('index_insert')->where('open',0)->order('id asc')->find();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页插屏第三方小程序广告" ];
        $resdata=array_merge($state,array('insertdata'=>$dbdata));
        return $resdata ;
    }

    //首页顶部轮播图配置
     public function topswiper()
    {
        $dbdata=db('index_top_swiper')->where('open',0)->order('id asc')->select();//查询小盟广告配置信息
        $state=['state'   => '200','message'  => "首页顶部轮播图列表查询成功" ];
        $resdata=array_merge($state,array('indexminiappdata'=>$dbdata));
        return $resdata ;
    }
}
