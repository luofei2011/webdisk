/**
*ptui
*/
ptui=new function(){
	
}
/**
*����
*/
ptui.taskBar=new function(){
	//���񼯺�
	this.tasks=new Array();
	//�������
	this.addTask=function(task){
		for(var i=0;i<this.tasks.length;i++){
			if(this.tasks[i].id==task.id){
				throw new Error("�����Ѵ��ڣ�");
			}
		}
		this.tasks[this.tasks.length]=task;
		$("#"+ptuisetting['taskBar']).html(ptui.taskBar.getTasksHtml());
	}
	//ɾ������
	this.deleteTask=function(taskid){
		//�������񼯺�
		for(var i=0;i<this.tasks.length;i++){
			//�ҵ����������ڼ���λ��
			if(this.tasks[i].id==taskid){
				//��������
				for(var x=i;x<this.tasks.length;x++){
					this.tasks[x]=this.tasks[x+1];
				}
				//���鳤��-1
				this.tasks.length-=1;
				//ˢ��������
				$("#"+ptuisetting['taskBar']).html(ptui.taskBar.getTasksHtml());
				//��ִֹ�з����������鳤��
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
		//��ʾ����
		var vis=$('#window_'+j.id).css('display');  //��ǰ���ڵ�״̬
		var window=$($('#window_'+j.id).children()[0]); //��������
		if(vis=='none'){
			$('#window_'+j.id).show();
			ptui.util.focusWindows(window);
		}else{
			if(window.hasClass('active')){
				// ������ʾ�Ҽ���״̬���ش���
				$('#window_'+j.id).hide();
			}else{
				//������ʾ״̬��û���� �����
				ptui.util.focusWindows(window);
			}
		}
	}
}

/**
*����
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
