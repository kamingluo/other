<?php
namespace app\express\controller;
use think\Request;
use think\Db;
use think\Config;
class Express
{
    public function userexpress(Request $request)
    {
    	$wxcode =$request->param("code");
        $openid=openid($wxcode);
        $expressdata =db('express')->where('openid',$openid)->where('expressNumber','neq','3961577121876')->order('updata_time desc')-> select();//查询信息
        $state=['state'   => '200','message'  => "获取用户快递信息列表成功" ];
        $resdata=array_merge($state,array('userexpressdata'=>$expressdata));
        return  $resdata;
    }
     public function addexpress(Request $request)
    {
    	$wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $time =date('Y-m-d H:i:s',time());//获取当前时间
        $dbnum =db('express')->where('openid',$openid)->where('expressNumber',$request->param("expressNumber"))->find();//查询信息
         if($dbnum==null){
         	$dbdata = ['id'=>'','openid' =>$openid,'expressName' => $request->param("expressName"),'expressNumber' =>$request->param("expressNumber"),'create_time' =>$time ,'updata_time' =>$time];
            $Id= db('express')->insertGetId($dbdata);//返回自增ID
            $expressdata=['id'=>$Id,'openid' =>$openid,'expressName' => $request->param("expressName"),'expressNumber' =>$request->param("expressNumber"),'create_time' =>$time ,'updata_time' =>$time];
             $state=['state'   => '200','message'  => "添加快递信息成功" ];
             $resdata=array_merge($state,array('expressdata'=>$expressdata));
             return $resdata;
         }
         else{
            $dbreturn= db('express')->where('openid',$openid)->where('expressNumber',$request->param("expressNumber"))->update(['updata_time' => $time]);
            $state=['state'   => '200','message'  => "快递时间信息更新成功" ];
            $resdata=array_merge($state,array('expressdata'=>$dbnum));
            return $resdata;
         }
    }
      public function deleteexpress(Request $request)
    {
    	$wxcode =$request->param("code");
        $openid=openid($wxcode);
        $deletedata =db('express')->where('openid',$openid)->where('expressNumber',$request->param("expressNumber"))->delete();
        $state=['state'   => '200','message'  => "用户单条快递数据删除成功" ];
        $resdata=array_merge($state,array('deletedata'=>$deletedata));
        return  $resdata;
    }
      public function deleteallexpress(Request $request)
    {
    	$wxcode =$request->param("code");
        $openid=openid($wxcode);
        $deletedata =db('express')->where('openid',$openid)->delete();
        $state=['state'   => '200','message'  => "用户全部快递数据删除成功" ];
        $resdata=array_merge($state,array('deletedata'=>$deletedata));
        return  $resdata;
    }
     public function test()
    {
        return  "test" ;
    }
}
