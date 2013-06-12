<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
<head>
    <meta charset="utf-8">
	<title>登录界面</title>
	<link rel="stylesheet" href="css/login.css" style="text/css">
	<script type=text/script language=javascript
		src=js/jquery-1.6.js></script>
	<script type=text/javascript src=js/changeButton.js></script>
	<script type=text/javascript src=js/validate.js></script>
</head>
<body onload="create();">
	<div class=register-in>
		<a id="register-in" href=register.php>注册</a>
	</div>
	<div id=logo></div>
	<div id=login>
	<form id=form_login name=name action="php/login.php" method=post>
		<div id=login-email>
			<span class=login-icon></span>
			<label for=Id id=login_label>用户名:</label>
			<input type=text id=Id name=Id placeholder=请输入用户名>
		</div>
		<div id=login-pwd>
			<span class=login-pwd></span>
			<label for=Pwd id=login_label>密码:</label>
			<input type=password name=Pwd id=Pwd placeholder=请输入密码>
		</div>
		<div class=check_code>
			<span class=checkcode></span>
			<input type=text id=in_check_code maxLength=4 placeholder=请输入验证码>
			<input type=text id=check_code maxLength=4 readonly=readonly onclick="create();">
		</div>
		<div class=login_id>
			<input type=submit id=login_id value="登录">
		</div>
	</form>
</div>
</body>
</html>
