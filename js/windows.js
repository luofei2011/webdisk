ptui.window=new function(){
	this.openWindow=function(obj){
		
		//��ʱ����һ��DIV
		var tmpDiv="<div id='window_"+obj.id+"' style='display:none;'></div>";
		$("#"+ptuisetting['windows']).append(tmpDiv);
		//����Aero
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
				//���������Ƴ�
				ptui.taskBar.deleteTask(obj.id);
			  },
			  min:function(){
				//��������
				$("#window_"+obj.id).hide(200);
			  }
          });
	}
}