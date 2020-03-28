<?php

// +----------------------------------------------------------------------
// | 积分操作
// +----------------------------------------------------------------------
 


namespace app\wxcarminiapp\controller;

use think\Db;
use think\Request;

class Score
{
    public function increase(Request $request)
    {
    	$wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $dbreturn= db('user')->where('openid',$openid)->setInc('score',$request->param("score"));
        if($dbreturn == 1){
        	 $time =date('Y-m-d H:i:s',time());//获取当前时间
        	 $dbdata = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>$request->param("explain"),'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'create_time' =>$time];
        	 $dbreturn=db('score_record')->insert($dbdata);
             return ['state'   => '200','message'  => "增加分数成功" ] ; //输出签到结果
        }
        else{
        	return ['state'   => '400','message'  => "增加分数失败" ] ; //输出签到结果
        	 
        }
    }

    public function reduce(Request $request)
    {
        $wxcode =$request->param("code");//接收所有传过来的值
        $openid=openid($wxcode);
        $dbreturn= db('user')->where('openid',$openid)->setDec('score',$request->param("score"));
        if($dbreturn == 1){
        	 $time =date('Y-m-d H:i:s',time());//获取当前时间
        	 $dbdata = ['id'=>'','openid' =>$openid,'score' =>$request->param("score"),'explain' =>$request->param("explain"),'channel' =>$request->param("channel"),'master_id' => $request->param("master_id"),'create_time' =>$time];
        	 $dbreturn=db('score_record')->insert($dbdata);
             return ['state'   => '200','message'  => "减少分数成功" ] ; //输出签到结果
        }
        else{
        	return ['state'   => '400','message'  => "减少分数失败" ] ; //输出签到结果
        	 
        }
    }
     public function test()
    {
        $test = test();
        return $test;
    }
}
