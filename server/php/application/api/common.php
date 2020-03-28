<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
// 
function test(){
    return "test";

}



//---------------------------------------------
//开始物流查询
//---------------------------------------------
/**
 * Json方式 单号识别
*/
function getOrderTracesByJsonnumber($expressnumber){
    $requestData= "{'LogisticCode':$expressnumber}";
    $datas = array(
        'EBusinessID' => '1470859',
        'RequestType' => '2002',
        'RequestData' => urlencode($requestData) ,
        'DataType' => '2',
    );
    $datas['DataSign'] = encrypt($requestData,'66d266e9-7a8c-4745-879a-770df1447297');
    $result=sendPost('http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx', $datas);
    
    //根据公司业务处理返回的信息......
    
    return $result;
}
 
/**
 * Json方式 查询订单物流轨迹
 */
function getOrderTracesByJson($ShipperCode,$expressnumber){
    $requestData= "{'OrderCode':'','ShipperCode':'$ShipperCode','LogisticCode':'$expressnumber'}";
    
    $datas = array(
        'EBusinessID' => '1470859',
        'RequestType' => '1002',
        'RequestData' => urlencode($requestData) ,
        'DataType' => '2',
    );
    $datas['DataSign'] = encrypt($requestData, '66d266e9-7a8c-4745-879a-770df1447297');
    $result=sendPost('http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx', $datas);   
    
    //根据公司业务处理返回的信息......
    
    return $result;
}
 
/**
 *  post提交数据 
 * @param  string $url 请求Url
 * @param  array $datas 提交的数据 
 * @return url响应返回的html
 */
function sendPost($url, $datas) {
    $temps = array();   
    foreach ($datas as $key => $value) {
        $temps[] = sprintf('%s=%s', $key, $value);      
    }   
    $post_data = implode('&', $temps);
    $url_info = parse_url($url);
    if(empty($url_info['port']))
    {
        $url_info['port']=80;   
    }
    $httpheader = "POST " . $url_info['path'] . " HTTP/1.0\r\n";
    $httpheader.= "Host:" . $url_info['host'] . "\r\n";
    $httpheader.= "Content-Type:application/x-www-form-urlencoded\r\n";
    $httpheader.= "Content-Length:" . strlen($post_data) . "\r\n";
    $httpheader.= "Connection:close\r\n\r\n";
    $httpheader.= $post_data;
    $fd = fsockopen($url_info['host'], $url_info['port']);
    fwrite($fd, $httpheader);
    $gets = "";
    $headerFlag = true;
    while (!feof($fd)) {
        if (($header = @fgets($fd)) && ($header == "\r\n" || $header == "\n")) {
            break;
        }
    }
    while (!feof($fd)) {
        $gets.= fread($fd, 128);
    }
    fclose($fd);  
    
    return $gets;
}


/**
 * 电商Sign签名生成
 * @param data 内容   
 * @param appkey Appkey
 * @return DataSign签名
 */
function encrypt($data, $appkey) {
    return urlencode(base64_encode(md5($data.$appkey)));
}


/**结束物流查询
 * Json方式 查询订单物流轨迹
 */

