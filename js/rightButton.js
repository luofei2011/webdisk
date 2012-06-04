function addTask() {
	$("#createTask").css("display","block");
	//window.open("creatTask.html","menubar=yes","width=630,height=450,top=150,left=400","location=no","scrollbars=no");
}

function deleteT() {
	$("#deleteTask").css("display","block");
}

function deleteTask() {
	//window.open("http://baidu.com", "bookibfo", "width:300,height:400");
	//var l = $(".link").size();
	var Did = $("input[name='Dname']").val();
	//alert(Did);
	$("#"+Did).css("display","none");
}

function DgiveUp() {
	$("#deleteTask").css("display","none");
}

function reLoad() {
	parent.location.reload(true);
}

function displayDesktop() {
	//隐藏桌面任务图标
	$("#windows").children().css("display","none");
	//隐藏添加、删除任务图标项
	quXiao();
	DgiveUp();
}


function change_bg() {
	//$('body').style.background = "url('images/bak1.jpg')";
	var bg = ['bak0.jpg','bak1.jpg','bak2.jpg','bak3.jpg','bak4.jpg','bak5.jpg','bak6.jpg'];
	var count = Math.floor(Math.random()*7);
	var bak = "images/" + bg[count];
	//alert(bak);
	document.body.style.backgroundImage="url("+bak+")";
}

function manageTask() {

}

function quXiao() {
	$("#createTask").css("display","none");
}

function submit() {
	var id = 8;  //初始化能添加任务的id号
	var id_array = new Array();
	var ID = $("input[name='ID1']").val();
	var task_name = $("input[name='name']").val();
	var task_left = $("input[name='Left']").val();
	var task_top = $("input[name='Top']").val();
	//id_array.push(ID);
	for(var i=0; i<id_array.length; i++){
		if(ID == id_array[i]){
			alert("此ID已经创建！");
			return;
		}
		alert(id_array[i]);
	}
	if(ID>id){
		var links = 'link'+id;
		var links=new Link({id:ID,name:'task_name',icon:'',left:task_left,top:task_top,url:'http://www.baidu.com'});
		ptui.desktop.addLinks(new Array(links));
		id_array.push(ID);
		//alert(id_array[i]);
	}
	else{
		ID = id +1;
		var links = 'link'+id;
		var links=new Link({id:ID,name:'task_name',icon:'',left:task_left,top:task_top,url:'http://www.baidu.com'});
		ptui.desktop.addLinks(new Array(links));
	}
	//alert(id_array);
	id++;
	//alert(id_array);
}
