/**
*ptui
*/
ptui=new function(){
	
}
/**
*任务
*/
ptui.taskBar=new function(){
	//任务集合
	this.tasks=new Array();
	//添加任务
	this.addTask=function(task){
		for(var i=0;i<this.tasks.length;i++){
			if(this.tasks[i].id==task.id){
				throw new Error("任务已存在！");
			}
		}
		this.tasks[this.tasks.length]=task;
		$("#"+ptuisetting['taskBar']).html(ptui.taskBar.getTasksHtml());
	}
	//删除任务
	this.deleteTask=function(taskid){
		//遍历任务集合
		for(var i=0;i<this.tasks.length;i++){
			//找到该任务所在集合位置
			if(this.tasks[i].id==taskid){
				//数组重列
				for(var x=i;x<this.tasks.length;x++){
					this.tasks[x]=this.tasks[x+1];
				}
				//数组长度-1
				this.tasks.length-=1;
				//刷新任务栏
				$("#"+ptuisetting['taskBar']).html(ptui.taskBar.getTasksHtml());
				//终止执行返回任务数组长度
				return this.tasks.length;
			}
		}
		
	}
	this.toString=function(){
		var str="";
		for(var i=0;i<this.tasks.length;i++){
			var task=this.tasks[i];
			str+=(task.id+" - "+task.name+" | ");
		}
		return str;
	}
	
	this.getTasksHtml=function(){
		var html="";
		for(var i=0;i<this.tasks.length;i++){
			html+=this.tasks[i];
		}
		return html;
	}
	
	this.taskClick=function(j){
		//显示窗体
		var vis=$('#window_'+j.id).css('display');  //当前窗口的状态
		var window=$($('#window_'+j.id).children()[0]); //窗口主体
		if(vis=='none'){
			$('#window_'+j.id).show();
			ptui.util.focusWindows(window);
		}else{
			if(window.hasClass('active')){
				// 处于显示且激活状态隐藏窗体
				$('#window_'+j.id).hide();
			}else{
				//处于显示状态但没激活 激活窗体
				ptui.util.focusWindows(window);
			}
		}
	}
}

/**
*任务
*/
function Task(json){
	var obj=eval(json);
	this.id=obj.id;
	this.name=obj.name;
	this.icon=obj.icon;
	
	this.toString=function(){
		return ("<div id=\"task_"+this.id+"\"  class=\"task\" onclick=\"ptui.taskBar.taskClick("+ptui.util.toJSON(this)+")\"><img width=\"38\" height=\"38\" src=\""+this.icon+"\"/></div>");
	}
}
