<?php
// +----------------------------------------------------------------------
// | 二手车价格查询接口
// +----------------------------------------------------------------------
// | kaming
// +----------------------------------------------------------------------
namespace app\api\controller;
use think\Config;
class Usedcar
{ 
    //测试专用
    public function index($name='World')
    {
       // $a="{\"msg\":\"\",\"success\":true,\"FinancialProductList\":[],\"price\":28.14,\"status\":100}";
       // $b=stripslashes($a); //转义
       // echo $b;
       //echo $_GET['id'];
       //return  "index模块下的my控制器my类index方法11111111" ;
      // $url= Config::get('url');
      $carurl= Config('carurl');
      echo  $carurl;
    }
    
    //省份列表
    public function province()
    {
      $carurl= Config('carurl');
      $mykey= Config('mykey');
      $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/province?dtype=&key='.$mykey);   
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }

    //城市列表province是上面城市列表获得
     public function city()
    {
       $carurl= Config('carurl');
        $mykey= Config('mykey');
        $province=$_GET['province'];
       $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/city?dtype=&province='.$province.'&key='.$mykey);   
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }
     
     //品牌接口车辆类型：passenger(乘用车)/commercial(商用车)
     public function brand()
    {
       $carurl= Config('carurl');
        $mykey= Config('mykey');
        $vehicle="passenger";
        if($_GET['vehicle'] =='commercial'){
          $vehicle="commercial";
        }
      $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/brand?dtype=&vehicle='.$vehicle.'&key='.$mykey);   
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }


    //车系列表brand(id值)从上个接口品牌接口获取2000410
     public function series()
    {
       $carurl= Config('carurl');
        $mykey= Config('mykey');
        $brand=$_GET['brand'];
       $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/series?dtype=&brand='.$brand.'&key='.$mykey); 
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }


     //车型列表车系id(从“二手车价值评估/车系列表”接口获取)20000182
     public function car()
    {

       $carurl= Config('carurl');
        $mykey= Config('mykey');
        $series=$_GET['series'];
       $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/car?dtype=&series='.$series.'&key='.$mykey);  
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }
    

    //车型年份列表车型id(从“二手车价值评估/车型列表”接口获取)
     public function year()
    {
       $carurl= Config('carurl');
       $mykey= Config('mykey');
       $car=$_GET['car'];
       $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, $carurl.'/year?dtype=&car='.$car.'&key='.$mykey);   
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);  
      //print_r($data);
      echo $data;
    }

      public function oldcar()
    {
      $styleId= Config('styleId');
       $regdate= Config('regdate');
       $mileage=$_GET['mileage'];
       $cityId=$_GET['cityId'];
       $curl = curl_init();  
      curl_setopt($curl, CURLOPT_URL, 'http://appraise.jingzhengu.com/carSourceLoan/getCarLoan?styleId='.$styleId.'&regdate='.$regdate.'&mileage='.$mileage.'&cityId='.$cityId);   
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
      $data = curl_exec($curl);  
      curl_close($curl);
      $data=substr($data,1,strlen($data)-2); //截取两边的“”号
      //print_r($data);
      echo stripslashes($data);
    }



    
}