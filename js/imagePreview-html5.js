/*******************************
Author: luofei
Date:2012-04-14
Email:luofeihit2010@gmail.com
QQ:1013651933
Blog:
README:只能在chrome，FireFox，Opear，360...浏览器上使用；IE没有此接口 
*/

$(function Detection_main () {
	if(typeof FileReader == 'undefined'){
		result.innerHTML = "<p class='warm'>抱歉，您的浏览器不支持FileReader";
		demo_input.setAttribute('disabled', 'disabled');
	}
	else {
		demo_input.addEventListener('change', readFile, false);
	}
});

function readFile () {
	var file = this.files[0];
	alert(file.type);
	if(!/image\/\w+/.test(file.type)) {
		alert(file.type);
		alert("请确保文件为图像类型");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		demo_result.innerHTML = '<img src="'+this.result+'" alt="" id="demo_icon" width="150px" height="150px">';
	}
}