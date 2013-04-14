<?
error_reporting(E_STRICT);
date_default_timezone_set("Asia/Shanghai");

require_once("class.phpmailer.php");
require_once("class.smtp.php");

$mail = new PHPMailer();
$mail->CharSet = "UTF-8";
$mail->IsSMTP();
$mail->SMTPDebug = 1;

$mail->SMTPSecure = "tls";
$mail->Host = "smtp.googlemail.com";           
$mail->SMTPAuth = true;                         
$mail->Username = "luofeihit2010@gmail.com";          
$mail->Password = "lf19920805";      
        
$mail->From = "luofeihit2010@gmail.com";                                    
$mail->FromName = "luofei";                   
        
$mail->AddAddress("luofeihit2010@126.com");               
$mail->WordWrap   = 50;
$mail->IsHTML(true);
        
$mail->Subject = "来自spider.html的邮件";
$mail->Body = "<p>您好！<BR> <p>这是您感兴趣的内容</p>";
                
if(!$mail->Send())
{
   echo "发送邮件错误!";
} 
else
{
   echo "邮件发送成功！";
}
?>
