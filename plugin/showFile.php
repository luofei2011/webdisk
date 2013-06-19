<?php 
session_start();
if ( $_SESSION['username'] == '' ) {
    echo "<script>alert('请先登录');</script>";
    header('location:login.php');
}
?>

<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件管理</title>
    <link rel="stylesheet" href="./css/file.css" />
    <link rel="stylesheet" href="./css/contextMenu.css" />
    <script type="text/javascript" src="./media/jquery.js"></script>
    <script type="text/javascript" src="./js/jquery.contentMenu.js"></script>
    <script type="text/javascript" src="./js/jquery.ui.position.js"></script>
    <script type="text/javascript" src="./js/main.js"></script>
    <script src="media/mediaelement-and-player.min.js"></script>
</head>
<body>
<style type="text/css">
    .content, .img_preview {
        display: none;
        width: 600px;
        margin: 0 auto;
    }
    .video {
        display: none;
    }
</style>
<script type="text/javascript">
var rootId = 1;
var fName = ""; // 文件夹名字
var f_name = "";    // 当点击编辑后,激活此变量
function ajaxUpdate( selector, obj ) {
    var str = "";

    for ( var item in obj ) {
         str += "<li><div class='file' id='"+item+"'></div><div class='name'>" + obj[item] + "</div></li>";
    }
    $( selector + " ul").html(str);
}
$(function() {

    // 初始化用户文件夹
    $.ajax({
        url: 'php/showFile.php',
        type: 'post',
        dataType: 'json',
        success: function( msg ) {
            console.log(msg);
        },
        error: function( msg ) {
           //console.log(eval('('+msg.responseText+')'));
           //console.log(msg.responseText);
           var file = eval('('+msg.responseText+')');
           ajaxUpdate("#dir", file);
        }
    });

    // 点击文件夹的时候文件夹隐藏,文件显示
    //$('.file').dblclick(function() {
    //$('div.file').on('dblclick', function() {
    $(document).on('dblclick','.file', function() {

        // 获取到当前的id作为数据库查询的条件
        var id = this.id;
        rootId = parseInt(id.replace(/f/g,''));
        var name = $(this).next().html();
        fName = name;

        $('#dir').hide();

        $.ajax({
            url: 'php/listFile.php',
            type: 'post',
            data: {id: rootId},
            dataType: 'json',
            success: function( msg ) {
                console.log(msg);
            },
            error: function( msg ) {
                console.log(msg.responseText);
                var list = eval( '('+msg.responseText+')' );
                var str = "";

                for ( var id in list ) {
                      str += "<li>" +
                              "<div class='file_item' id='f_"+id+"' type='"+list[id]['type']+"'>" +
                              "</div>" +
                              "<div class='name'>"+list[id]['name']+"</div>" +
                              "</li>";
                }
                $("#touch ul").html(str);
            }
        });

        $('#touch').show();
    });

    //
    $('#r-btn').click(function() {
        $('#touch').hide();
        $('#dir').show();
    });
    // 创建文件夹
    $('#c-btn').click(function() {
        var name = $('#fileName').val();
        if (!name.length) {
            alert('名字不能为空!');
            return;
        }
        $.ajax({
            url: 'php/mkdir.php',
            data: {name: name},
            type: "post",
            success: function(msg) {
                if ( msg.indexOf('success') != -1 ) {
                    $("#dir ul").append("<li><div class='file' id='"+msg.replace(/success/g,'')+"'></div><div class='name'>" + name + "</div></li>");
                } else {
                }
            },
            error: function(msg) {
                alert('创建失败!');
            }
        });
    });

    // 给每个文件绑定右键功能
    $.contextMenu({
        selector: '.file_item',
        callback: function(key, options) {
            switch(key) {
                case "edit":
                var type = $(this).attr('type');
                var name = $(this).next().html(); 
                f_name = name;
                var path = "./file/" + "<?php echo$_SESSION['username'];?>" +
                            "/" + fName + "/" + f_name;
                $('#touch').hide();
                if ( type.indexOf('image') != -1 ) {
                    $(".img_preview img").attr('src', path);
                    $('.img_preview').show();
                } else if(type.indexOf('video') != -1 ) {
                    $("video")[0].src = path;
                    $('.video').show();
                } else {
                    //$('.content').show();
                    //alert(name);
                    $.ajax({
                        url: 'php/edit.php',
                        type: 'post',
                        data: {name: name, p_id: rootId},
                        success: function(msg)  {
                            $("#edit").val(msg);
                            $('.content').show();
                        },
                        error: function(msg) {
                            console.log('ddd' + msg);
                        }
                    });
                }
                    break;
                case "quit": // 重命名
                    var oTarget = $(this).next();
                    var old_name = oTarget.html();
                    var new_name = prompt("请输入文件名");
                    if ( !new_name.length ) {
                        alert("文件名不能为空!");
                        return;
                    }
                    $.ajax({
                        url: 'php/rename_file.php',
                        type: 'post',
                        data: {new_name: new_name, old_name: old_name, pName: fName, p_id: rootId},
                        success: function( msg ) {
                            oTarget.html( new_name );
                        },
                        error: function( msg ) {
                            console.log('dd' + msg.responseText);
                        }
                    });
                    break;
                case "copy": // 删除文件
                    var oTarget = $(this);
                    $.ajax({
                        url: 'php/rm_file.php',
                        type: 'post',
                        data: {name: $(this).next().html(), p_id: rootId, pName: fName},
                        success: function( msg ) {
                            console.log( msg );
                        },
                        error: function( msg ) {
                            console.log('dd' + msg.responseText);
                        }
                    });
                    $(oTarget.parent()).empty();
                    break;
                case "upload":
                    var oTarget = $(this);
                    console.log(oTarget);
                    break;
                default:
                    break;
            }
        },
        items: {
            "edit": {name: "编辑", icon: "edit"},
            "quit": {name: "重命名", icon: "quit"},
            "copy": {name: "删除", icon: "copy"},
            "upload": {name: "下载", icon: "copy"}
        }
    });

    $('.file_item').click(function() {
        window.open('file/' + <?php echo $_SESSION['username'];?> + fName +$(this).next().html());
    });

    // 当编辑一个文件保存后
    $('#btn1').click(function() {
        $('.content').hide();
        var value = $('#edit').val();
        $.ajax({
            url: 'php/save.php',
            type: 'post',
            data: {name: f_name, p_id: rootId,value: value},
            success: function(msg) {
                if ( msg == "success" ) {
                    alert('修改成功!');
                } else {
                    alert('修改失败!');
                }
            },
            error: function(msg) {
                console.log('ss' + msg.responseText);
            }
        });
        $('#touch').show();
    });
});
</script>
<div class="wrapper">
    <div id="dir">
        <ul>
        </ul>
        <div class="createNewFile">
            <input type="text" name="fileName" id="fileName" placeholder="请输入想创建的文件夹字">
            <button id="c-btn">创建</button>
        </div>
    </div>
    <div id="touch">
        <ul>
        </ul>
        <div class="createNewFile">
            <script type="text/javascript" src="./js/fileUpload.js"></script>
            <div name="image" id="dropbox">
                <img src="" alt="" id="icon">
            </div>  
            <!--progress id="progress" max="100" min="0" value="0">0</progress-->
            <meter id="progress" min="0" max="100" value="0">0</meter>
            <span id="now" style="width:100px;height:16px; text-align:left;">0%</span>
            <div id="preview"></div>
            <button id="r-btn">返回目录</button>
        </div>
    </div>
    <div class="content">
        <textarea id="edit" name="edit" rows="10" cols="30"></textarea>
        <button id="btn1">保存</button>
    </div>
    <div class="img_preview">
        <img src="" alt="" />
    </div>
    <div class="video">
        <script type="text/javascript">
            $(function() {
                $("video")[0].src = './media/myvideo.mp4';
                    $('video').mediaelementplayer({
                        alwaysShowControls: false,
                        videoVolume: 'horizontal',
                        features: ['playpause','progress','volume','fullscreen']
                });
            });
        </script>
        <link rel="stylesheet" href="media/mediaelementplayer.css" />
        <video id="player1" src="" width="320" height="240"></video>
    </div>
</div>
</body>
</html>
