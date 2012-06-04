
/**
*API新增
*/
ptui.util=new function(){
	this.toJSON = function(v){  //转换成JSON
		var json = [];      
			for(var i in v){      //遍历数组V  
				if(!v.hasOwnProperty/*检测该对象是否有给定名称的属性或对象，该属性必须是对象本身的一个成员*/(i)) continue;  
				 if(typeof v[i]=='string'){
					v[i]=v[i].replace(/\\/g,'\\\\');
					var tmp=(i+":\'"+v[i]+"\'");
					json.push(tmp==null?null:tmp);
				 }else if(typeof v[i]=='number'){
					var tmp=(i+":"+v[i]+"");
					json.push(tmp==null?null:tmp);
				 }  
			}  	 
		return ("{"+json +"}");       
	} 
	this.toObject = function(v){    
		if(typeof v=='string'){
			return (eval("["+v+"]")[0]);//eval计算字符串并计算其中的javascript代码
		}     
	} 
	/**
	*激活窗体
	*/
	this.focusWindows=function(Window) {
			  $(".AeroWindow").removeClass('active');
			  if (Window.hasClass('AeroWindow')) 
				Window.addClass('active');
			  if (($('body').data('AeroWindowMaxZIndex')) == null) {
				$('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
			  }
			  i = $('body').data('AeroWindowMaxZIndex');
			  i++;
			  Window.css('z-index', i);
			  $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
			
	}
}