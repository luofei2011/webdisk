<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
<meta charset=utf-8>
<head>
	<title>注册</title>
	<link rel="stylesheet" href="css/login.css" style="text/css">
	<script type=text/script language=javascript
		src=js/jquery-1.7.1.js></script>
	<script type=text/javascript src=js/changeButton.js></script>
	<script type=text/javascript src=js/validate.js></script>
</head>
<body onload="create();">
	<div class=login-in>
		<a id="login-in" href=login.html>登录</a>
	</div>
	<div id=logo></div>
	<div id=register>
	<form id=form_register name=name action="php/register.php" method=post>
		<div id=register-email>
			<span class=register-icon></span>
			<label for=Id id=register_label>邮箱</label>
			<input type=text id=Username name=Username placeholder=邮箱>
		</div>
		<div id=register-pwd>
			<span class=register-pwd></span>
			<label for=Pwd1 id=register_label>密码</label>
			<input type=password name=Pwd1 id=Pwd1 placeholder=密码>
		</div>
		<div id=pwd-again>
			<span class=register-pwd-again></span>
			<label for=Pwd2 id=register_label>再次输入密码</label>
			<input type=password name=Pwd2 id=Pwd2 placeholder=再次输入密码>
		</div>
		<div class=check_code>
			<span class=checkcode></span>
			<input type=text id=in_check_code maxLength=4 placeholder=请输入验证码>
			<input type=text id=check_code maxLength=4 readonly=readonly onclick="create();">
		</div>
		<div class=register_id>
			<input type=submit id=register_id value="注册">
		</div>
	</form>
</div>
</body>
</html>
