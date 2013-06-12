<?php
session_start();
include_once("../php/conn.php");
if ( $_SESSION['username'] == "" ) {
    echo "<script>alert('请先登录');</script>";
}
if(!empty($_FILES["ff"])){
    if ( $_FILES["ff"]['error'] > 0 )
        echo "错误状态" . $_FILES['ff']['error'];
    else {

        // 先查出用户id
        $arr = mysql_query("select u_id from user where u_name='".$_SESSION['username']."'",$conn);
        $result = mysql_fetch_row($arr);
        $u_id = $result[0];

        // 父目录id, 根据父id查到父目录
        $p_id = $_POST['id'];
        $arr = mysql_query("select name from dir where id=$p_id",$conn);
        $result = mysql_fetch_row($arr);
        $name = $result[0];
        $dir = "./file/" . $_SESSION['username'] . "/" . $name . "/";

        // 把上传文件放到用户自己的目录下
        move_uploaded_file($_FILES["ff"]["tmp_name"],$dir . $_FILES["ff"]["name"]);
        //$query = "insert into upload(u_id,p_id,type,name,size)"
        $dir .= $_FILES["ff"]["name"];
        chmod($dir, 0777);
        mysql_query("insert into upload(u_id,p_id,type,name,size) values( $u_id, $p_id, '".$_FILES["ff"]["type"]."', '".$_FILES["ff"]["name"]."', '".$_FILES["ff"]["size"]."' )", $conn);
        echo "<script type='text/javascript'>alert('上传成功');</script>";
    }
} else {
    echo "<script>alert('请上传文件!');</script>";
}
mysql_close($conn);
?>
<meta charset="utf-8">
<form action="" method="post" enctype="multipart/form-data">
<input type="file" name="ff">
<input type="text" name="id">
<input type="submit" value="上传">
</form> 
