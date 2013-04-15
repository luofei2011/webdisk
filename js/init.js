var ptuisetting={
	taskBar:'taskBar',
	windows:'windows',
	desktop:'desktop'
}
$(document).ready(function(){
	//加载桌面图标
	var link=new Link({id:1,name:'百度',icon:'images\\icon\\1.png',left:20,top:20,url:'../youge/login.html'});
	var link1=new Link({id:2,name:'media',icon:'images\\icon\\2.png',left:20,top:110,url:'plugin/media/media.html'});
	var link2=new Link({id:3,name:'腾讯',icon:'images\\icon\\3.png',left:20,top:200,url:'http://www.tencent.com'});
	var link3=new Link({id:4,name:'RussiaTetris',icon:'images\\icon\\4.png',left:20,top:290,url:'plugin/RussiaTetris.html'});
	var link4=new Link({id:5,name:'文件上传',icon:'images\\icon\\5.png',left:20,top:380,url:'plugin/file.html'});
	var link5=new Link({id:6,name:'新闻爬虫',icon:'images\\icon\\6.png',left:20,top:470,url:'plugin/spider.html'});
	//var link6=new Link({id:7,name:'添加',icon:'images\\icon\\addtask.jpg',left:120,top:20,url:'creatTask.html'});
	//var link7=new Link({id:8,name:'百度',icon:'',left:120,top:110,url:'http://www.baidu.com'});
	ptui.desktop.addLinks(new Array(link,link1,link2,link3,link4,link5));
});

