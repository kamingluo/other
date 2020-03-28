<?php

// +----------------------------------------------------------------------
// | 车辆信息操作
// +----------------------------------------------------------------------
namespace app\wxcarminiapp\controller;
//use think\log;
use think\Db;
use think\Request;
use think\Config;

class Car
{
    public function index()
    {

    }

    public function usercar(Request $request)
    {
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        $cardata =db('car')->where('openid',$openid)-> select();//查询信息
        $state=['state'   => '200','message'  => "获取用户车辆信息列表成功" ];
        $resdata=array_merge($state,array('usercar'=>$cardata));
        return  $resdata;
    }

    public function addcar(Request $request)
    {
    	$wxcode =$request->param("code");
        $openid=openid($wxcode);
        $dbnum =db('car')->where('lsprefix',$request->param("lsprefix"))->where('lsnum',$request->param("lsnum"))->find();//查询信息
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        if($dbnum == null){
        	 $dbdata = ['id'=>'','openid' =>$openid,'lsprefix' =>$request->param("lsprefix"),'lsnum' => $request->param("lsnum"),'frameno' =>$request->param("frameno"),'engineno' => $request->param("engineno"),'mobile' => $request->param("mobile"),'create_time' =>$time ,'updata_time' =>$time];
             $Id= db('car')->insertGetId($dbdata);//返回自增ID
             $cardata=['id'=>$Id,'openid' =>$openid,'lsprefix' =>$request->param("lsprefix"),'lsnum' => $request->param("lsnum"),'frameno' =>$request->param("frameno"),'engineno' => $request->param("engineno"),'mobile' => $request->param("mobile"),'create_time' =>$time ,'updata_time' =>$time];
             $state=['state'   => '200','message'  => "添加车辆成功" ];
             $resdata=array_merge($state,array('cardata'=>$cardata));
             return $resdata;
        }
        else{
        	    $dbreturn= db('car')->where('lsprefix',$request->param("lsprefix"))->where('lsnum',$request->param("lsnum"))->update(['updata_time' => $time]);
                $state=['state'   => '200','message'  => "车辆信息更新成功" ];
                $resdata=array_merge($state,array('cardata'=>$dbnum));
                return $resdata;
        }
    }


    public function deletecar(Request $request)
    {
        $wxcode =$request->param("code");
        $openid=openid($wxcode);
        $data =db('car')->where('id',$request->param("carid"))->delete();
        $state=['state'   => '200','message'  => "删除车辆信息成功" ];
        $resdata=array_merge($state);
        return  $resdata;
    }

    public function carcity()
    {
        $url = 'https://api.jisuapi.com/illegal/carorg2';
        $data['appkey']= '93b506e2c39ebcd3';
        $resdata = http($url, $data, 'GET');
        return  json_decode($resdata,true);
    }


     public function test()
    {
        $test = test();
        return $test;
    }
}
