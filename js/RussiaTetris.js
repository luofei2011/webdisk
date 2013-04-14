//控制游戏区的以单元格表示的行数、列数以及单元格宽度(高度)
var Cols=12, Rows=20, Sqlen=16;
var delLine=new Array();
var CurSq,NextSq;
var type=-1,oldtype;
//游戏各等级中方块每移动一次所需的时间(ms) 
var delayTime=new Array(500,400,300,200,100,90,80,70,60);
//控制目标方块移动的计时器
var TimerID;
//控制位置、结束标识、级别、分数和行数
var pos=0,end,level=0,score=0,lines=0;
//是否结束的标识符
var isOver=false;
//是否暂停的标识符
var isPause=false; 
//游戏区和下一方块显示区背景色以及七种方块的颜色
var myColor=new Array("gray","red","green","cyan","yellow","orange","pink","blue"); 
//产生游戏区和下一方格显示区框架
function CreateArea(rows,cols,name)
{
  var s="<table border=1 cellspacing=0 cellpadding=0 bgcolor="+myColor[0]+">";
  for(var i=0; i<rows; i++)
  {
    s+="<tr height="+Sqlen+">";
    for(var j=0;j<cols;j++)
    {
      var id=name+i+"#"+j;
      s+="<td width="+Sqlen+" class=GirdStyle id="+id;
      s+=" style=\"background:"+myColor[0]+"\"></td>"
    }
    s+="</tr>";
  }
  s+="</table>";
  return s;
}

//初始化游戏区和下一方块显示区
function InitGame()
{
  document.getElementById("GameBody").innerHTML=CreateArea(Rows,Cols,'Main');
  document.getElementById("GameForecast").innerHTML=CreateArea(4,4,'Forecast');
}
//设定当前矩形
function Square(cols,rows,color)
{
  this.rows=rows;
  this.cols=cols;
  this.color=color;
}
//根据随机产生的数值选择方块
function chooseSquare(type,x,y)
{
  var mySquare=new Array(4);
  switch(type)
  {
    case 0:
      mySquare[0]=new Square(x-1,y,1);
      mySquare[1]=new Square(x,y,1);
      mySquare[2]=new Square(x+1,y,1);
      mySquare[3]=new Square(x+2,y,1);
      break;
    case 1:
      mySquare[0]=new Square(x,y,5);
      mySquare[1]=new Square(x,y+1,5);
      mySquare[2]=new Square(x+1,y+1,5);
      mySquare[3]=new Square(x,y+2,5);
      break;
    case 2:
      mySquare[0]=new Square(x,y,2);
      mySquare[1]=new Square(x,y+1,2);
      mySquare[2]=new Square(x+1,y+1,2);
      mySquare[3]=new Square(x+1,y+2,2);
      break;
    case 3:
      mySquare[0]=new Square(x+1,y,7);
      mySquare[1]=new Square(x+1,y+1,7);
      mySquare[2]=new Square(x,y+1,7);
      mySquare[3]=new Square(x,y+2,7);
      break;
    case 4:
      mySquare[0]=new Square(x,y,3);
      mySquare[1]=new Square(x+1,y,3);
      mySquare[2]=new Square(x,y+1,3);
      mySquare[3]=new Square(x+1,y+1,3);
      break;
    case 5:
      mySquare[0]=new Square(x,y,6);
      mySquare[1]=new Square(x+1,y,6);
      mySquare[2]=new Square(x+1,y+1,6);
      mySquare[3]=new Square(x+1,y+2,6);
      break;
    case 6:
      mySquare[0]=new Square(x+1,y,4);
      mySquare[1]=new Square(x,y,4);
      mySquare[2]=new Square(x,y+1,4);
      mySquare[3]=new Square(x,y+2,4);
      break;
  }
  return mySquare;
}
//重画
function reDraw(name,mySquare)
{
  var obj;
  for(var i=0;i<mySquare.length;i++)
  {
    obj=document.getElementById(name+mySquare[i].rows+"#"+mySquare[i].cols);
    obj.style.background=myColor[mySquare[i].color];
  }
}
//将方块的颜色设置为背景色以清除该方块
function clearDraw(name,mySquare)
{
  var obj;
  for(var i=0;i<mySquare.length;i++)
  {
    obj=document.getElementById(name+mySquare[i].rows+"#"+mySquare[i].cols);
    obj.style.background=myColor[0];
  }
}
//判断是否到边界
function isBounds(mySquare)
{
  for(var i=0;i<mySquare.length;i++)
  {
    if(mySquare[i].cols<0||mySquare[i].cols>11||mySquare[i].rows<0||mySquare[i].rows>19) 
    return false;
  }
  return true;
}
//方块排序
function SortSquare(mySquare,name,isMax)
{
  if(isMax)
  {
    var Max=0;
    if(name=="Rows")
    {
      for(var i=0;i<mySquare.length;i++)
      {
        if(mySquare[i].rows>Max) 
          Max=mySquare[i].rows;
      }
    }
    else
    {
      for(var i=0;i<mySquare.length;i++)
      {
        if(mySquare[i].cols>Max) 
          Max=mySquare[i].cols;
      } 
    }
    return Max;
  }
  else
  {
    var Min=20;
    if(name=="Rows")
    {
      for(var i=0;i<mySquare.length;i++)
      {
        if(mySquare[i].rows<Min) 
          Min=mySquare[i].rows;
      }
    }
    else
    {
      for(var i=0;i<mySquare.length;i++)
      {
        if(mySquare[i].cols<Min) 
          Min=mySquare[i].cols;
      } 
    }
    return Min;
  }
}
//游戏开始，随机选择方块
function StartGame()
{
  document.getElementById("start").disabled=true;
  document.getElementById("pause").focus();
  type=parseInt(Math.random()*7);
  oldtype=type;
  type=parseInt(Math.random()*7);
  var m=4/2-1;
  NewSq=chooseSquare(type,m,0);
  reDraw('Forecast',NewSq);
  Start();
}
//计时器启动
function Start()
{
  if(isOver)
  {
    var s="本局游戏结束!";
    OverGame(s); 
  }
  gScore.innerText=score;
  gLevel.innerText=level;
  gLine.innerText=lines;
  oldtype=type;
  clearDraw('Forecast',NewSq);
  type=parseInt(Math.random()*7);
  var m=4/2 -1;
  NewSq=chooseSquare(type,m,0);
  reDraw('Forecast',NewSq);
  var mm=Cols/2 -1;
  CurSq=chooseSquare(oldtype,mm,0);
  reDraw('Main',CurSq);
  window.clearInterval(TimerID);
  TimerID=window.setInterval("StartMove()",delayTime[level]);
}
//符合条件的行消去后，更新游戏结果区并开始下一个方块
function StartMove()
{
  if(isPause) 
    return;
  if(MoveCurSq(0,1,false)==false)
  {
    //先暂停下一个方块移动，计算分数
    window.clearInterval(TimerID);
    if(RemoveLines()==true)
    {
      DelLines();
      lines=lines+delLine.length;
      //根据消去的行数加分
      switch(delLine.length)
      {
        case 1:
          score=score+100;
          break;
        case 2:
          score=score+200;
          break;
        case 3:
          score=score+400;
          break;
        case 4:
          score=score+1000;
          break;
      }
      //更新游戏级别
      level=parseInt(score/10000);
    }
    //开始下一个方块
    Start();
  }
}
//移除符合条件的一行(或多行)
function RemoveLines()
{
  var obj,m=0;
  var isRemove=true;
  var searchPos=true;
  var del=new Array();
  for(var i=19;i>=0;i--)
  {
    for(var j=0;j<12;j++)
    {
      obj=document.getElementById("Main"+i+"#"+j);
      if(obj.style.background==myColor[0])
      {
        isRemove=false;
      }
      else
      {
        searchPos=false;
      }
    }
    if(searchPos)
    {
      end=i;
      if(del.length>0)
      {
        delLine=del;
        return true;
      }
      else
      {
        return false;
      }
    }
    if(isRemove) 
    {
      del[m]=i; 
      m++;
    }
    searchPos=true;
    isRemove=true;
  }
}
//删除符合条件的一行或多行
function DelLines()
{
  var deleted=0;
  var obj;
  //从下至上、从左至右扫描符合条件的行
  for(var i=0; i<delLine.length; i++)
  {
    for(var j=0; j<12; j++)
    {
      obj=document.getElementById("Main"+delLine[i]+"#"+j);
      obj.style.background=myColor[0];
    }
    deleted=deleted+1;
    if(delLine.length>deleted)
    {
      if(delLine[i]-delLine[i+1]>1)
        ReDrawLine(delLine[i+1],delLine[i],deleted);
    }
  }
  ReDrawLine(end,delLine[delLine.length - 1],deleted);
}
//由下至上、由左至右重画某个区域
function ReDrawLine(endline,startline,moveline)
{
  var obj;
  for(var i=startline-1;i>endline;i--)
  {
    for(var j=0;j<12;j++)
    {
      obj=document.getElementById("Main"+i+"#"+j);
      var oldcolor=obj.style.background;
      obj.style.background=myColor[0];
      var rowid=i+moveline;
      obj=document.getElementById("Main"+rowid+"#"+j);
      obj.style.background=oldcolor;
    }
  }
}
//移动矩形
function MoveSquare(from,to)
{
  if(isBounds(to)==false) 
    return false;
  var obj;
  //循环体
  loop:
  for(var i=0; i<to.length; i++)
  {
    obj=document.getElementById("Main"+to[i].rows+"#"+to[i].cols);
    if(obj.style.background!=myColor[0])
    {
      for(var j=0;j<from.length;j++)
      if(to[i].cols==from[j].cols&&to[i].rows==from[j].rows&&to[i].color==from[j].color)
        continue loop;
      return false;
    } 
  }
  return true;
}
//移动方块
function MoveCurSq(x,y,isRotate)
{
  NextSq=new Array(CurSq.length);
  for(var i=0; i<CurSq.length; i++) 
  {
    if(isRotate)
    {
      var dx=CurSq[i].cols - CurSq[0].cols;
      var dy=CurSq[i].rows - CurSq[0].rows;
      NextSq[i]=new Square(CurSq[0].cols-dy,CurSq[0].rows+dx,CurSq[i].color);
    }
    else
      NextSq[i]=new Square(CurSq[i].cols+x,CurSq[i].rows+y,CurSq[i].color);
  }
  if(isRotate) 
    reNextSq();
  if(MoveSquare(CurSq,NextSq) == false)
  {
    for(var i=0; i<CurSq.length; i++)
    {
      if((CurSq[i].rows==0&&CurSq[i].cols==Cols/2)||(CurSq[i].rows==0&&CurSq[i].cols==Cols/2-1)) 
      isOver=true;
    }
    return false;
  }
  clearDraw('Main',CurSq);
  CurSq=NextSq;
  reDraw('Main',CurSq);
  return true;
}
//旋转为下一个方块
function reNextSq()
{
  var minCols=SortSquare(NextSq,'Cols',false);
  var minRows=SortSquare(NextSq,'Rows',false);
  var maxCols=SortSquare(NextSq,'Cols',true);
  var maxRows=SortSquare(NextSq,'Rows',true);
  if(minCols<0) 
    changeNextSq('Cols',-minCols);
  if(minRows<0)
    changeNextSq('Rows',-minRows);
  if(maxCols>11) 
    changeNextSq('Cols',11-maxCols);
  if(maxRows>19) 
    changeNextSq('Rows',19-maxRows);
}
//方块变形
function changeNextSq(name,pos)
{
  for(var i=0;i<NextSq.length;i++)
  {
    if(name="Rows") 
      NextSq[i].rows=NextSq[i].rows+pos;
    else
      NextSq[i].cols=NextSq[i].cols+pos;
  }
}
//响应上移、下移、左移和右移按键的动作
function keyDown()
{
  switch(event.keyCode)
  {
    //对应于键盘的“DOWN”键
    case 40:
      MoveCurSq(0,1,false);
      break;
    //对应于键盘的“LEFT”键
    case 37:
      MoveCurSq(-1,0,false);
      break;
    //对应于键盘的“UP”键
    case 38:
      MoveCurSq(0,0,true);
      break;
    //对应于键盘的“Right”键
    case 39:
      MoveCurSq(1,0,false);
      break;
   }
}
//翻转“暂停游戏”与“继续游戏”按钮文本，并设定游戏开始和暂停
function PauseGame()
{
  obj=document.getElementById("pause");
  if(pause.innerText=="暂停游戏")
  {
    isPause=true;
    obj.innerText="继续游戏";
    obj.focus();
  }
  else
  {
    isPause=false;
    obj.innerText="暂停游戏";
    obj.focus();
    StartMove();
  }
}
//游戏结束时弹出确认框
function OverGame(str)
{
  if(typeof(str)=="undefined") 
    str="最后得分 : "+score +".是否重玩游戏?";
  else 
    str=str+"最后得分 : "+score+".是否重玩游戏?";
  var isOK=window.confirm(str);
  //用户选择“确定”按钮后关闭当前页面
  if(!isOK)
  {
    window.close();
  }
  //否则刷新当前页面，重新开始游戏
  else
  {
    document.location.reload();
  }
}
