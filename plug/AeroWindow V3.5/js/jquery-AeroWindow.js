(function($){
  $.fn.extend({ 
    //plugin name - Aero Window (like Windows7 Style) 
    AeroWindow: function(options) {
    
      //Identify clearly this window ----------------------------------------
      WindowID = $(this).attr('id');
      if (($('body').data(WindowID)) == null) {
        var $WindowAllwaysRegistered = false;
        //Register this Window
        $('body').data( WindowID , 1);
      } else {
        //Window exists
        var $WindowAllwaysRegistered = true;
      }
      //If the window is registered, just show it and set focus ---------------     
	//注释！ 因close修改 所以此处无法找到原来的窗体
	/*     
	 if ($WindowAllwaysRegistered == true) {	
        Window = $(this).find(".AeroWindow");
        $(this).find(".AeroWindow").css('display', 'block'); 
        $(".AeroWindow").removeClass('active');
        if (Window.hasClass('AeroWindow')) Window.addClass('active');
        if (($('body').data('AeroWindowMaxZIndex')) == null) {
          $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
        }
        i = $('body').data('AeroWindowMaxZIndex');
        i++;
        Window.css('z-index', i);
        $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index')); 
        return;
      }
    */
      //Settings Window and the default values---------------------------------
      var defaults = {
        WindowTitle:          null,
        WindowPositionTop:    60,            /* Posible are pixels or 'center' */
        WindowPositionLeft:   10,            /* Posible are pixels or 'center' */
        WindowWidth:          300,           /* Only pixels */
        WindowHeight:         300,           /* Only pixels */
        WindowMinWidth:       250,           /* Only pixels */
        WindowMinHeight:      0,             /* Only pixels */
        WindowResizable:      true,          /* true, false*/
        WindowMaximize:       true,          /* true, false*/
        WindowMinimize:       true,          /* true, false*/
        WindowClosable:       true,          /* true, false*/
        WindowDraggable:      true,          /* true, false可拖拽*/
        WindowStatus:         'regular',     /* 'regular', 'maximized', 'minimized' */
        WindowAnimationSpeed: 500,
        WindowAnimation:      'easeOutElastic',
		WindowIcon:null,
		close:function(){
			/*默认关闭*/
		},
		min:function(){
			/*最小化*/
		}
      };
      
      /*-----------------------------------------------------------------------
      Posible WindowAnimation:
      - easeInQuad
      - easeOutQuad
      - easeInOutQuad
      - easeInCubic
      - easeOutCubic
      - easeInOutCubic
      - easeInQuart
      - easeOutQuart
      - easeInOutQuart
      - easeInQuint
      - easeOutQuint
      - easeInOutQuint
      - easeInSine
      - easeOutSine
      - easeInOutSine
      - easeInExpo
      - easeOutExpo
      - easeInOutExpo
      - easeInCirc
      - easeOutCirc
      - easeInOutCirc
      - easeInElastic
      - easeOutElastic
      - easeInOutElastic
      - easeInBack
      - easeOutBack
      - easeInOutBack
      - easeInBounce
      - easeOutBounce
      - easeInOutBounce      
      -----------------------------------------------------------------------*/
      
      //Assign current element to variable, in this case is UL element
      var options = $.extend(defaults, options);
    
      return this.each(function() {
        var o =options;
        
        //Generate the new Window ---------------------------------------------     
        var WindowContent = $(this).html();//获取当前窗口的内容

        //BTN --- 
        if (o.WindowMinimize) {
          if (o.WindowMaximize || o.WindowClosable) {
            var WinMinBtn = '<a href="#" class="win-min-btn"></a><div class="win-btn-spacer"></div>';
          } else {
            var WinMinBtn = '<a href="#" class="win-min-btn"></a>';
          }
        } else {
          var WinMinBtn   = '';
        }
        //BTN ---
        if (o.WindowMaximize) {
          if (o.WindowClosable) {
            var WinMaxBtn   = '<div class="WinBtnSet winmax"><a href="#" class="win-max-btn"></a><div class="win-btn-spacer"></div></div>';
            var WinRegBtn   = '<div class="WinBtnSet winreg"><a href="#" class="win-reg-btn"></a><div class="win-btn-spacer"></div></div>';
          } else {
            var WinMaxBtn   = '<div class="WinBtnSet winmax"><a href="#" class="win-max-btn"></a></div>';
            var WinRegBtn   = '<div class="WinBtnSet winreg"><a href="#" class="win-reg-btn"></a></div>';
          }
        } else {
          var WinMaxBtn   = '';
          var WinRegBtn   = '';
        }
        //BTN ---
        if (o.WindowClosable) {
          var WinCloseBtn   = '<a href="#" class="win-close-btn"></a>';
        } else {
          var WinCloseBtn   = '';
        }

        if (o.WindowMinimize || o.WindowMaximize || o.WindowClosable) {
          var WinBtnLeftedge  = '<div class="win-btn-leftedge"></div>';
          var WinBtnRightedge = '<div class="win-btn-rightedge"></div>';
        } else {
          var WinBtnLeftedge  = '';
          var WinBtnRightedge = '';
        }
		var icon='';
		if(o.WindowIcon!=null&&o.WindowIcon!=''){
			icon='<img width="30" height="30" align="middle" src="'+o.WindowIcon+'"/>';
		}
        $(this).html(
          '<div class="AeroWindow">' +
          '  <table cellpadding="0" cellspacing="0" border="0">' +
          '    <tr>' +
          '      <td class="table-tl"></td>' +
          '      <td class="table-tm"></td>' +
          '      <td class="table-tr"></td>' +
          '    </tr>' +
          '    <tr>' +
          '      <td class="table-lm"></td>' +
          '      <td class="table-mm" align="right">' +
          '        <div class="title">'+icon+ //增加对图标的支持
		  '&nbsp;<nobr><strong>'+o.WindowTitle+'</strong></nobr></div>' +/*<nobr>不换行*/
          '        <div class="buttons">' +
                     WinBtnLeftedge +
                     WinMinBtn +
                     WinMaxBtn +
                     WinRegBtn +
                     WinCloseBtn +
                     WinBtnRightedge +
          '        </div>' +
          '        <div class="table-mm-container" align="left">' +
          '          <div class="table-mm-content" style="width: '+o.WindowWidth+'px; height: '+o.WindowHeight+'px;">' +
						//修改 让WIndow支持Url，增加一个框架
                       '<iframe style="border:none; width:100%; height:100%;\" src=\"'+o.WindowUrl+'\""/>' +
          '          </div>' +
          '        </div>' +
          '      </td>' +
          '      <td class="table-rm"></td>' +
          '    </tr>' +
          '    <tr>' +
          '      <td class="table-bl"></td>' +
          '      <td class="table-bm"></td>' +
          '      <td class="table-br"></td>' +
          '    </tr>' +
          '  </table>'+
          '</div>'
        );
        
        //Display hidden Containers -------------------------------------------
        $(this).css('display', 'block'); 

        //Window Objects ------------------------------------------------------
        var Window          = $(this).find(".AeroWindow");
        var WindowContainer = $(this).find(".table-mm-container");
        var WindowContent   = $(this).find(".table-mm-content");
        var BTNMin          = $(this).find(".win-min-btn");
        var BTNMax          = $(this).find(".WinBtnSet.winmax");
        var BTNReg          = $(this).find(".WinBtnSet.winreg");
        var BTNClose        = $(this).find(".win-close-btn");
    
        //Initial Configuration -----------------------------------------------
        BTNReg.css('display', 'none'); 
        FocusWindow(Window);        
        
        //Set Window Position
        if(o.WindowPositionTop == 'center') {
          o.WindowPositionTop = ($(window).height()/2) - o.WindowHeight/2 - 37;
        }
        if(o.WindowPositionLeft == 'center') {
          o.WindowPositionLeft = ($(window).width()/2) - o.WindowWidth/2 - 17;
        }

          switch (o.WindowStatus) {
            case 'regular':
              RegularWindow();
              break;
            case 'maximized':
              MaximizeWindow();
              break;
            case 'minimized':
              MinimizeWindow();
              break;
            default:
              break;
          }
        //Window Functions ----------------------------------------------------
        function MaximizeWindow() {
          WindowContainer.css('visibility', 'visible'); 
          BTNMax.css('display', 'none'); 
          BTNReg.css('display', 'block');
          WindowContent.animate({ 
            width: $(window).width()-32, 
            height: $(window).height()-110}, {
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          Window.animate({ 
            width: $(window).width(), 
            height: $(window).height(),
            top: 0, 
            left: 0}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'maximized';
          return(false);          
        }
        function MinimizeWindow() {
          BTNReg.css('display', 'block');
          BTNMax.css('display', 'none');
          WindowContainer.css('visibility', 'hidden'); 
          WindowContent.animate({ 
            width: o.WindowMinWidth, 
            height: o.WindowMinHeight}, {
            queue: true,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          Window.animate({ 
            width: o.WindowMinWidth+32, 
            height: o.WindowMinHeight+72,
            top: $(window).height()-77, 
            left: 0}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'minimized';
          return(false);
        }
        function RegularWindow() {
          BTNMax.css('display', 'block');
          BTNReg.css('display', 'none');
          WindowContainer.css('visibility', 'visible'); 
          WindowContent.animate({ 
            width: o.WindowWidth, 
            height: o.WindowHeight}, {
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          Window.animate({ 
            width: o.WindowWidth+32, 
            height: o.WindowHeight+72}, {
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          //Error handling, if the left position is negative.
          if ((typeof(o.WindowPositionLeft) == 'string') && (o.WindowPositionLeft.substring(0, 1) == '-')) o.WindowPositionLeft = 0;
          Window.animate({ 
            top: o.WindowPositionTop, 
            left: o.WindowPositionLeft}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'regular';
          return(false);          
        }
        function FocusWindow(Window) {
          $(".AeroWindow").removeClass('active');
          if (Window.hasClass('AeroWindow')) Window.addClass('active');
          if (($('body').data('AeroWindowMaxZIndex')) == null) {
            $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
          }
          i = $('body').data('AeroWindowMaxZIndex');
          i++;
          Window.css('z-index', i);
          $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
        }
        
        //Attach user events to the Window ------------------------------------
        if (o.WindowMaximize) {
          $(this).dblclick(function() {
            switch (o.WindowStatus) {
              case 'regular':
                MaximizeWindow();
                break;
              case 'maximized':
                RegularWindow();
                break;
              case 'minimized':
                RegularWindow();
                break;
              default:
                break;
            }
          }); 
        } else {
          $(this).dblclick(function() {
            switch (o.WindowStatus) {
              case 'maximized':
                RegularWindow();
                break;
              case 'minimized':
                RegularWindow();
                break;
              default:
                break;
            }
          }); 
        }

        //User Interaction - Minimize Button
        BTNMin.click(function () {
		  FocusWindow(Window); 
          //MinimizeWindow();
		  o.min();
          return false;
        });
        //User Interaction - Maximize Button
        BTNMax.click(function () {
          FocusWindow(Window);
          MaximizeWindow();
          return false;
        });
        //User Interaction - Regular Button
        BTNReg.click(function () {
          FocusWindow(Window);
          RegularWindow();
          return false;
        });
        //Close Button
        BTNClose.click(function () {
          //Unregister this Window
          //修改！  关闭按钮移除DIV
		  $(Window).remove();
		  //自定义关闭
		  o.close();
		  //Window.css('display', 'none'); 
          return(false);          
        });
        
        //Support Dragging ----------------------------------------------------
        if (o.WindowDraggable){
        Window.draggable({
          distance: 3, 
          cancel: ".table-mm-content",
          start: function() {
            FocusWindow(Window);
            $(".AeroWindow").find('#iframeHelper').css({'display': 'block'});
            $(".AeroWindow").removeClass('active');
            $(this).addClass('active');
            $('body').data( 'AeroWindowMaxZIndex' , $(this).css('z-index'));
          },
          drag: function() {
            WindowTop  = -1*$(this).offset().top;
            WindowLeft = -1*$(this).offset().left;
            $(this).css({backgroundPosition: WindowLeft+ 'px ' +WindowTop+ 'px'});
          },
          stop: function() {
            //alert(Window.css('top'));
            o.WindowPositionTop  = Window.css('top');
            o.WindowPositionLeft = Window.css('left');
            $(".AeroWindow").find('#iframeHelper').css({'display': 'none'});
          }
        });
      }
        
        //Support Focus on Window by Click ------------------------------------
        Window.click(function (){
          FocusWindow(Window);
        });

        //Support Window Resizing ---------------------------------------------
        if (o.WindowResizable){
          Window.resizable({
            minHeight: o.WindowMinHeight+72,
            minWidth: o.WindowMinWidth,
            alsoResize: WindowContent,
            start: function() {
              WindowContainer.css('visibility', 'visible');            
              $(".AeroWindow").find('#iframeHelper').css({'display': 'block'});
              $(".AeroWindow").removeClass('active');
              Window.addClass('active');
              if (($('body').data('AeroWindowMaxZIndex')) == null) {
                $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
              }
              i = $('body').data('AeroWindowMaxZIndex');
              i++;
              Window.css('z-index', i);
              $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
            }, 
            stop: function() {
              o.WindowWidth  = WindowContent.width();
              o.WindowHeight = WindowContent.height();
              $(".AeroWindow").find('#iframeHelper').css({'display': 'none'});
            }
          });
        }
      });
    }
  });
})(jQuery);