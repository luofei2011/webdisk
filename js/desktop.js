/**
*桌面
*/
ptui.desktop=new function(){
	//桌面快捷方式数组
	this.links=new Array();
	this.addLink=function(link){
		this.links[this.links.length]=link;
		$("#"+ptuisetting['desktop']).append(link.toString());
	}
	this.addLinks=function(links){
		for(var i=0;i<links.length;i++){
			this.addLink(links[i]);
		}
	}
	//点击快捷方式
	this.linkClick=function(obj){
		var link=obj;
		var task=new Task({name:link.name,id:link.id,icon:link.icon});
		ptui.taskBar.addTask(task);
		ptui.window.openWindow(link);
	}
}
/**
*桌面快捷方式
*/
function Link(json){
	this.id=json.id;
	this.name=json.name;
	this.icon=json.icon;
	this.click=json.click;
	this.left=json.left;
	this.top=json.top;
	this.url=json.url;
	
	this.toString=function(){
		var jtmp=ptui.util.toJSON(this);
		var html="<div class=\"link\"  id='"+this.id+"' objJson=\""+jtmp+"\" onclick=\"ptui.desktop.linkClick("+jtmp+")\" style=\"left:"+this.left+"px;top:"+this.top+"px;\"><img width=\"70\" height=\"70\" src=\""+this.icon+"\"/></div>";
		return html;
	}
}