<?php
namespace app\api\controller;
use think\Db;

use think\Config;

class Index
{
    public function index()
    {

    	return  "api模块下的index控制器index方法" ;
    }
    

    public function ceshi()
    {
        return  "api模块下的index控制器ceshi方法" ;
    }
     public function test()
    {
        return  "api模块下的index控制器test方法" ;
    }
}
