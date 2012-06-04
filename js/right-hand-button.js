/*------------------------------------
禁止鼠标右键
并添加新功能---添加任务，删除任务-----刷新（初始为显示桌面）
*/
ptui.rightHandButton = new function () {	
	var contextMenuObj;
	var MSIE = navigator.userAgent.indexOf('MSIE')?true:false;
	var navigatorVersion = navigator.appVersion.replace(/.*?MSIE (\d\.\d).*/g,'$1')/1;	
	var activeContextMenuItem = false;
	this.highlightContextMenuItem = new function() {
		this.className='contextMenuHighlighted';
	}
	
	this.deHighlightContextMenuItem = new function() {
		this.className='';
	}
	
	this.showContextMenu new function (e) {
		contextMenuSource = this;
		if(activeContextMenuItem)
			activeContextMenuItem.className='';
		if(document.all)
			e = event;
		/*自定义显示的右键功能，保证能全部显示在规定范围内，不超过浏览器*/
		var xPos = e.clientX;
		if(xPos + contextMenuObj.offsetWidth > (document.documentElement.offsetWidth-20)){
			xPos = xPos + (document.documentElement.offsetWidth - (xPos + contextMenuObj.offsetWidth)) - 20; 
		}
	  
		var yPos = e.clientY;
		if(window.document.body.scrollTop > 0) {
			yPos = (window.screen.Height) ? e.clientY + window.document.body.scrollTop -20 : e.clientY -20;
	    }
	    else if (window.pageYOffset) 
	    {
			yPos = (window.pageYOffset > 0) ? e.clientY + window.pageYOffset -20 : e.clientY -20;
	    }
	    else { 
			yPos = e.clientY -20; 
		}
	  /* * */
		contextMenuObj.style.left = xPos + 'px';
		contextMenuObj.style.top = yPos + 'px';
		contextMenuObj.style.display='block';
		return false; 
	}

	this.hideContextMenu = new function (e) {
		if(document.all) 
			e = event;
		if(e.button==0 && !MSIE){
			
		}
		else{
			contextMenuObj.style.display='none';
		}
	}
	
	this.initContextMenu = new function () { 
		contextMenuObj = document.getElementById('contextMenu');
		contextMenuObj.style.display = 'block';
		var menuItems = contextMenuObj.getElementsByTagName('LI');
		for(var no=0;no<menuItems.length;no++) {
			menuItems[no].onmouseover = highlightContextMenuItem;
			menuItems[no].onmouseout = deHighlightContextMenuItem;
			
			var aTag = menuItems[no].getElementsByTagName('A')[0];
			
			var img = menuItems[no].getElementsByTagName('IMG')[0];
			if(img){
				var div = document.createElement('DIV');
				div.className = 'imageBox';
				div.appendChild(img);
				
				if(MSIE && navigatorVersion<6){
					aTag.style.paddingLeft = '0px';
				}
				
				var divTxt = document.createElement('DIV');	
				divTxt.className='itemTxt';
				divTxt.innerHTML = aTag.innerHTML;
				
				aTag.innerHTML = '';
				aTag.appendChild(div);
				aTag.appendChild(divTxt);
				if(MSIE && navigatorVersion<6){
					div.style.position = 'absolute';
					div.style.left = '2px';
					divTxt.style.paddingLeft = '15px';
				}
				
				if(!document.all){
					var clearDiv = document.createElement('DIV');
					clearDiv.style.clear = 'both';
					aTag.appendChild(clearDiv);		
				}
			}
			else{
				if(MSIE && navigatorVersion<6){
					aTag.style.paddingLeft = '15px';
					aTag.style.width = (aTag.offsetWidth - 30) + 'px';
				}
				else{
					aTag.style.paddingLeft = '30px';
					aTag.style.width = (aTag.offsetWidth - 60) + 'px';
				}
			}
		}
		contextMenuObj.style.display = 'none';		
		document.documentElement.oncontextmenu = ptui.rightHandButton.showContextMenu;
		document.documentElement.onclick = ptui.rightHandButton.hideContextMenu;
	}
}
