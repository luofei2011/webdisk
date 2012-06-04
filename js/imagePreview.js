 $(function(){
        $("input[type=file]").bind("change", picCheck);//��ÿ��file���һ��change������
            function picCheck(){
                result = imagePreview(this.files, 'img', this);
                if(result == "empty") {
                    $(this).val("");//����Ԫ�ص�ֵ
                    $(this).after($(this).clone().val(""));   
                    $(this).remove();
                    $("input[type=file]").bind("change", picCheck);
                }
            }
                       /**
                          * ͼƬԤ��
                          * @param files ��file���
                          * @param container ��ʾͼƬ������ID
                          * @param file file����
                          * @param debug �Ƿ�alert������Ϣ
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
									alert("�������֧��ͼƬԤ�� ");
								return false;
							}
						} 
						else {
							$("#"+container).empty();
							if(debug) 
								alert("�ϴ��Ĳ���ͼƬ");
							return "empty";
						}
					}
				} 
				else {
                    file.select();
                    // Begin IE9����˰�ȫ�ԣ���input�ؼ�Ϊfocusʱ����ʹ��document.selection.createRange().text���ֵ�����Լ�������䡣
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
							alert("�ϴ��Ĳ���ͼƬ");
                       return "empty";
                    }
                }
            }
});