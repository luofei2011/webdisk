ptui.window=new function(){
	this.openWindow=function(obj){
		
		//零时加入一个DIV
		var tmpDiv="<div id='window_"+obj.id+"' style='display:none;'></div>";
		$("#"+ptuisetting['windows']).append(tmpDiv);
		//调用Aero
		$('#window_'+obj.id).AeroWindow({
              WindowTitle:          obj.name,
			  WindowPositionTop:    100,
			  WindowPositionLeft:   200,
			  WindowWidth:          600,
			  WindowHeight:         500,
			  WindowAnimation:      'easeOutBounce',   
			  WindowUrl:			obj.url,
			  WindowIcon:			obj.icon,
			  close:function(){
				//从任务栏移除
				ptui.taskBar.deleteTask(obj.id);
			  },
			  min:function(){
				//隐藏任务
				$("#window_"+obj.id).hide(200);
			  }
          });
	}
}