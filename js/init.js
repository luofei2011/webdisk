var ptuisetting={
	taskBar:'taskBar',
	windows:'windows',
	desktop:'desktop'
}
$(document).ready(function(){
	//��������ͼ��
	var link=new Link({id:1,name:'�ٶ�',icon:'images\\icon\\1.png',left:20,top:20,url:'http://www.baidu.com'});
	var link1=new Link({id:2,name:'�ȸ�',icon:'images\\icon\\2.png',left:20,top:110,url:'http://www.google.com'});
	var link2=new Link({id:3,name:'��Ѷ',icon:'images\\icon\\3.png',left:20,top:200,url:'http://www.tencent.com'});
	var link3=new Link({id:4,name:'RussiaTetris',icon:'images\\icon\\4.png',left:20,top:290,url:'RussiaTetris.html'});
	var link4=new Link({id:5,name:'̰����',icon:'images\\icon\\5.png',left:20,top:380,url:'Snake.html'});
	var link5=new Link({id:6,name:'�����',icon:'images\\images\\computer.png',left:20,top:470,url:'http://baidu.com'});
	//var link6=new Link({id:7,name:'���',icon:'images\\icon\\addtask.jpg',left:120,top:20,url:'creatTask.html'});
	//var link7=new Link({id:8,name:'�ٶ�',icon:'',left:120,top:110,url:'http://www.baidu.com'});
	ptui.desktop.addLinks(new Array(link,link1,link2,link3,link4,link5));
});

