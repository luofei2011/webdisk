(function($) {  
    $.fn.PreviewImage = function(options) {  
        var Default = {  
            ImageClientId: "",  
            MaxWidth: 300,  
            MaxHeight: 300  
        };  
        $.extend(true, Default, options);  
        return this.each(function() {  
            if (Default.ImageClientId != "") {  
                $(this).unbind("change");  
                $(this).change(function() {  
                    if ($(this).val() == "") {  
                        $("#" + Default.ImageClientId).parent("div").hide();  
                        return;  
                    }  
                    else {  
                        $("#" + Default.ImageClientId).parent("div").show();  
                    }  
                    if ($.browser.msie) {  
                        $("#" + Default.ImageClientId).attr("src", $(this).val());  
                    }  
                    else {  
                        $("#" + Default.ImageClientId).attr("src", $(this)[0].files[0].getAsDataURL());  
                    }  
                    if ($.browser.msie && $.browser.version > 6) {  
                        $("#" + Default.ImageClientId).hide();  
                        $("#" + Default.ImageClientId).parent("div").css({ 'z-index': '999',  
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',  
                            'max-width': Default.MaxWidth + 'px', 'max-height': Default.MaxHeight + 'px',  
                            'width': Default.MaxWidth + 'px', 'height': Default.MaxHeight + 'px'  
                        });  
                        var div = $("#" + Default.ImageClientId).parent("div")[0];  
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $("#" + Default.ImageClientId).attr("src");  
                    }  
                });  
  
                $("#" + Default.ImageClientId).load(function() {  
                    var image = new Image();  
                    image.src = $(this).attr("src");  
                    $(this).attr("width", Default.MaxWidth);  
                    $(this).attr("height", Default.MaxHeight);  
                    $(this).attr("alt", Default.MaxWidth + "x" + Default.MaxHeight);  
                });  
            }  
        });  
    };  
})(jQuery);  