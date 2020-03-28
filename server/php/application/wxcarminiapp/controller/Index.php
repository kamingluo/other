<?php
namespace app\wxcarminiapp\controller;
//use think\log;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	//dump(Db::query("select * from box_gdt"));
        //
         //加了日志就报错
    	//Log::info('查看是否存在记录');
        //
       // $res =Db::table('box_gdt')->where('master_id',0)->select();
        //dump($res);
       //$res1=Db::table('index_box')->select();
        //dump($res1);
        //echo  json_encode($res1);
        //return $res1 ;

        //打印配置信息
        dump(Config::get());	
    }

    public function ceshi()
    {
        return  "index模块下的index控制器ceshi方法" ;
    }
     public function test()
    {
        $test = test();
        return $test;
    }
}
