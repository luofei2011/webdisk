 $(function(){
        $("input[type=file]").bind("change", picCheck);//对每个file添加一个change处理函数
            function picCheck(){
                result = imagePreview(this.files, 'img', this);
                if(result == "empty") {
                    $(this).val("");//设置元素的值
                    $(this).after($(this).clone().val(""));   
                    $(this).remove();
                    $("input[type=file]").bind("change", picCheck);
                }
            }
                       /**
                          * 图片预览
                          * @param files 表单file组件
                          * @param container 显示图片的容器ID
                          * @param file file对象
                          * @param debug 是否alert出错信息
                          * @returns false
                          */
            function imagePreview(files, container, file, debug) {
                if(!$.browser.msie) {
					length = files.length;
					for(i=0; i<length; i++) {
						file = files;
						reg = /^image.*$/;
						if(reg.test(file.type)) {
							if(typeof FileReader !== "undefined") {
								fileReader = new FileReader();
								fileReader.onload = function(e){
									img = document.createElement("img");
									img.src = e.target.result;
									$("#"+container).empty().append(img);
								}
								fileReader.readAsDataURL(file);
							} 
							else {
								if(debug) 
									alert("浏览器不支持图片预览 ");
								return false;
							}
						} 
						else {
							$("#"+container).empty();
							if(debug) 
								alert("上传的不是图片");
							return "empty";
						}
					}
				} 
				else {
                    file.select();
                    // Begin IE9提高了安全性，当input控件为focus时不能使用document.selection.createRange().text获得值，所以加如下语句。
                    file.blur();
                    var val = document.selection.createRange().text;
                    if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(val)) {
                        $("#"+container).empty();
                        $("#"+container).attr("style", "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);width:88px;height:88px;");
                        $("#"+container)[0].filters.item ("DXImageTransform.Microsoft.AlphaImageLoader").src = "file://localhost/"+val;
                    } 
					else {
                       $("#"+container).empty();
                       if(debug) 
							alert("上传的不是图片");
                       return "empty";
                    }
                }
            }
});