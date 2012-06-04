var Cols=50, Rows=50, Sqlen=16;
var deline=new Array();
var Head, Tail;
//游戏中各等级对应贪吃蛇移动的速度
var deylayTime = new Array(500,400,300,200,100,90,80,70,60,50,40);
//控制Snake移动的定时器
//控制位置，结束标识，级别，分数和行数
var pos=0, end, level=0, score=0, lines=0;
//是否结束的标识
var isOver=false;
//是否暂停的标识
var isPause=false;
//贪吃蛇头和身子以及背景颜色
var myColor = new Array("gray","red","blue");

//初始化游戏开始

function InitGame() {
	document.getElementById("GameBody").innerHTML=CreateArea(Rows,Cols,'Main');
}

function CreateArea(rows, cols, name) {
	var s="<table border=1 cellSpacing=0 cellPadding=0 bgColor="+myColor[0]+">";
	for(var i=0; i<rows; i++){
		s+="<tr height="+Sqlen+">";
		for(var j=0; j<cols; j++){
			var id=name+i+"#"+j;
			s+="<td width="+Sqlen+" class=GirdStyle id="+id;
			s+=" style=\"background:"+myColor[0]+"\"></td>"
		}
		s+="</tr>";
	}
	s+="</table>";
	return s;
}

function StartGame() {
	document.getElementById("start").disabled=true;

}
