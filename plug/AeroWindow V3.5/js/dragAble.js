var ie=document.all; 
var nn6=document.getElementById&&!document.all; 
var isdrag=false; 
var y,x; 
var oDragObj; 

function moveMouse(e) { 
	if (isdrag) { 
		oDragObj.style.top  =  (nn6 ? nTY + e.clientY - y : nTY + event.clientY - y)+"px"; 
		oDragObj.style.left  =  (nn6 ? nTX + e.clientX - x : nTX + event.clientX - x)+"px"; 
		return false; 
	} 
} 

function initDrag(e) { 
	var oDragHandle = nn6 ? e.target : event.srcElement; 
	var topElement = "HTML"; 
	while (oDragHandle.tagName != topElement && oDragHandle.className != "creatTask") { 
		oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement; 
	} 
	if (oDragHandle.className=="creatTask") { 
		isdrag = true; 
		oDragObj = oDragHandle; 
		nTY = parseInt(oDragObj.style.top+0); 
		y = nn6 ? e.clientY : event.clientY; 
		nTX = parseInt(oDragObj.style.left+0); 
		x = nn6 ? e.clientX : event.clientX; 
		document.onmousemove=moveMouse; 
		return false; 
	} 
} 

document.onmousedown=initDrag; 
document.onmouseup=new Function("isdrag=false"); 