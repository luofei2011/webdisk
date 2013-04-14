<?
include "Snoopy.class.php";
header("Content-Type:text/html;charset=gb2312");
$snoopy = new Snoopy;
$snoopy->fetchlinks("http://today.hit.edu.cn");
print_r($snoopy->results);


?>
