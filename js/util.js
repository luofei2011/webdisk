
/**
*API����
*/
ptui.util=new function(){
	this.toJSON = function(v){  //ת����JSON
		var json = [];      
			for(var i in v){      //��������V  
				if(!v.hasOwnProperty/*���ö����Ƿ��и������Ƶ����Ի���󣬸����Ա����Ƕ������һ����Ա*/(i)) continue;  
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
			return (eval("["+v+"]")[0]);//eval�����ַ������������е�javascript����
		}     
	} 
	/**
	*�����
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