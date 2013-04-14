<?php
/*
Spider - the PHP usefull software
Author: luofei<blog.csdn.net/luofei2012>
Copyright (c): 2012-? New Digital Group, all rights reserved
vision: 1.0

you may contact me by email at:
luofeihit2010@gmail.com

The lastest Version of Spider can be obtained from:
https://github.com/luofei2011/SendNewsTimely

******************************************************************

test result:
you can get NewsTimely from next websites:
news.qq.com
news.163.com
all hit website
...
except news.sina.com.cn

and you should provide us your email address as fllows:
gmail.com
126/163.com
qq.com
...

*****************************************************************

*/
include "Snoopy.class.php";
include "MultiRequestHttp.class.php";
header("Content-Type:text/html;charset=utf-8");
$Get_url=$_GET["url"];/*get the url*/
$to = $_GET["email"];
$keywords = $_GET["keywords"];

$snoopy = new Snoopy;
$snoopy->fetchlinks($Get_url);
$title = $snoopy->results;

/*
print_r($title);


$urls = $title;
$m = new Http_MultiRequest();
 
$m->setUrls($urls);
$data = $m->exec();
echo $data;
 */

//获取网站源代码
function GetHtmlCode($url){
	$ch = curl_init();//初始化一个cur对象
	curl_setopt ($ch, CURLOPT_URL, $url);//设置需要抓取的网页
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);//设置crul参数，要求结果保存到字符串中还是输出到屏幕上
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT,1000);//设置链接延迟
	$HtmlCode = curl_exec($ch);//运行curl，请求网页
	return $HtmlCode;
}
$dxycontent = GetHtmlCode($Get_url);

/*核心代码
function ForAllWebsite($title,$keywords){
	$key = explode(";",$keywords);
	$len = count($key);

	for($i=0; $i<count($title); $i++ ){
		$dump = GetHtmlCode($title[$i]);
		preg_match("/<title>(.*)<\/title>/smUi",$dump,$matches);
		$hhh[$i] = trim($matches[1]);
		$hhh[$i] = eval('return'.iconv('gbk','utf-8',var_export($hhh[$i],true)).';');
		for($j=0; $j<$len; $j++){
			if(strpos($hhh[$i],$key[$j]) !== false){
				$HighLightTitle = ereg_replace($key[$j],"<font color=red>".$key[$j]."</font>", $hhh[$i]);
				$LastUrl = "<a href='".$title[$i]."'>".$HighLightTitle."</a>";
				$LastUrlText .= $LastUrl;
				$LastUrlText .= "<BR>";
			}
		}

	}
	return $LastUrlText;
}*/
//$LastUrlText = ForAllWebsite($title,$keywords);
//echo $LastUrlText;



/*only for today,hit.edu.cn usefull!*/
//获取网页内链接
function GetAllLink($string) { 
	  $string = str_replace("\r","",$string); 
	  $string = str_replace("\n","",$string); 
	  $regex[url] = "((http|https|ftp|telnet|news):\/\/)?([a-z0-9_\-\/\.]+\.[][a-z0-9:;&#@=_~%\?\/\.\,\+\-]+)";  
      $regex[email] = "([a-z0-9_\-]+)@([a-z0-9_\-]+\.[a-z0-9\-\._\-]+)";   

	    
	  //去掉网页中的[]
	  $string = eregi_replace("\[|\]","",$string);

     //去掉JAVASCRIPT代码 
     $string = eregi_replace("<!--.*//-->","", $string); 
           
    //去掉非<a>的HTML标签   
	  $string = eregi_replace("</?[^aA][^<>]*>","",$string);
	                 
	 //去掉EMAIL链接        
	 //$string = eregi_replace("<a([ ]+)href=([\"']*)mailto:($regex[email])([\"']*)[^>]*>","",$string);  

	 //echo $string;
	 $output = split('</a>', $string);
	 for($i=0; $i<count($output); $i++){
		$output_1 = split("<a", $output[$i]);
	 }
 	 return $output_1; 
} 
$test=GetAllLink($dxycontent);

/*prfunction GetUserCareNews ($test,$keywords,$url) {
	$messTxt = "";
	$k=0;
	$key = explode(";",$keywords);

	//自动为网站加载上http，避免网易邮箱链接错误
	if(!ereg("http",$url)){
		$url = "http://".$url;
	}

	for($i=0; $i<count($test); $i++){
		$test[$i] = eval('return'.iconv('gbk','utf-8',var_export($test[$i],true)).';');思路
		if(ereg("href", $test[$i])  && !ereg("href='#'",$test[$i])){
			for($j=0; $j<count($key); $j++){
				if(strpos($test[$i],$key[$j])!==false){
					$mess[$k++]=ereg_replace($key[$j],"<font color=red>".$key[$j]."</font>", $test[$i]);
			}
			}
		}
	}
	$mess = array_unique($mess);		//数组去重
 */

//获取用户关心的链接
function GetUserCareNews ($test,$keywords,$url) {
	$messTxt = "";
	$k=0;
	$key = explode(";",$keywords);

	//自动为网站加载上http，避免网易邮箱链接错误
	if(!ereg("http",$url)){
		$url = "http://".$url;
	}

	for($i=0; $i<count($test); $i++){
		$test[$i] = eval('return'.iconv('gbk','utf-8',var_export($test[$i],true)).';');
		if(ereg("href", $test[$i])  && !ereg("href='#'",$test[$i])){
			for($j=0; $j<count($key); $j++){
				if(strpos($test[$i],$key[$j])!==false){
					$mess[$k++]=ereg_replace($key[$j],"<font color=red>".$key[$j]."</font>", $test[$i]);
			}
			}
		}
	}
	$mess = array_unique($mess);		//数组去重
	
	//处理好发送链接，为链接加上网站头文件
	for($l=0; $l<count($mess); $l++){
		if(!ereg("http",$mess[$l]) && (strlen($mess[$l]) != 0)){
				$mess[$l] = eregi_replace("href=[\"']","",$mess[$l]);
				$mess[$l] = $url.$mess[$l];
				$mess[$l] = eregi_replace(" /","/",$mess[$l]);
				if(ereg("'",$mess[$l])){
					$mess[$l]="<a href='".$mess[$l]."</a>";
				}
				if(ereg("\"",$mess[$l])){
					$mess[$l] = "<a href=\"".$mess[$l]."</a>";
				}
		}
		else{
			$mess[$l] = "<a ".$mess[$l]."</a>";
		}
		$messTxt .= $mess[$l];
		$messTxt .= "<BR>";
	}
	return $messTxt;
}
$message = GetUserCareNews($test,$keywords,$Get_url);
echo $message;



//推送邮件
function SendEmail($to, $content) {
	//Author:luofei
	//$to 表示收件人地址,$content表示邮件正文内容
	
	error_reporting(E_STRICT);						//错误报告
	date_default_timezone_set("Asia/Shanghai");		//设定时区

	require_once("class.phpmailer.php");
	require_once("class.smtp.php");

	$mail = new PHPMailer();						//新建一个对象
	$mail->CharSet = "UTF-8";						//设置编码，中文不会出现乱码的情况
	$mail->IsSMTP();								//设定使用SMTP服务
	$mail->SMTPDebug = 1;							//启用SMTP调试功能i
													//1 = errors and messages
													//2	= messages only

	$mail->SMTPSecure = "tls";						//安全协议
	$mail->Host = "smtp.googlemail.com";			//SMTP服务器        
	$mail->SMTPAuth = true;							//启用SMTP验证功能	
	$mail->Username = "vipspiderservice@gmail.com";    //SMTP服务器用户名      
	$mail->Password = "lf19920805";					//SMTP服务器用户密码
        
	$mail->From = "vipspiderservice@gmail.com";        //发件人                            
	$mail->FromName = "Spider Service";						//发件人姓名（邮件上显示）
        
	$mail->AddAddress($to);							//收件人地址
	$mail->WordWrap   = 50;							//设置邮件正文每行的字符数
	$mail->IsHTML(true);							//设置邮件正文内容是否为html类型
        
	$mail->Subject = "来自spider.html的邮件";		//邮件主题
	$mail->Body = "<p>您好！<BR> <p>这是您感兴趣的内容</p> <BR>".$content." ";
													//邮件正文
	if(!$mail->Send())								//邮件发送报告
	{
	   echo "发送邮件错误!";
	} 
	else
	{
	   echo "邮件发送成功！";
	}
}
SendEmail($to, $message);
?> 
