<?php
header("Content-Type:text/html;charset=gb2312");
$url=$_GET["url"];/*get the url*/
$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT,10);
$dxycontent = curl_exec($ch);
curl_close($ch);
$s=strip_tags($dxycontent);
echo $s;
$s=eval('return'.iconv('gbk','utf-8',var_export($s,true)).';');/*转换数组编码*/
$temp=explode(" ",$s);/*对内容进行分割*/
$temp=array_unique($temp);/*去掉数组中重复的元素*/
$keywords=$_GET["keywords"];
$keyword=explode(";",$keywords);
foreach($temp as $str){
	for ($i=0; $i<count($keyword); $i++){
		if(strpos($str,$keyword[$i])!==false){
			$mess=ereg_replace($keyword[$i],"<font color=red>".$keyword[$i]."</font>", $str);
			echo $mess;
			echo "<p>";
		}
	}
}
?> 
