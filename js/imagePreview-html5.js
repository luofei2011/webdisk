/*******************************
Author: luofei
Date:2012-04-14
Email:luofeihit2010@gmail.com
QQ:1013651933
Blog:
README:ֻ����chrome��FireFox��Opear��360...�������ʹ�ã�IEû�д˽ӿ� 
*/

$(function Detection_main () {
	if(typeof FileReader == 'undefined'){
		result.innerHTML = "<p class='warm'>��Ǹ�������������֧��FileReader";
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
		alert("��ȷ���ļ�Ϊͼ������");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		demo_result.innerHTML = '<img src="'+this.result+'" alt="" id="demo_icon" width="150px" height="150px">';
	}
}