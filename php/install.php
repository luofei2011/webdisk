<?
require "configure.php";
$sql = "create table $table_url(
	id int(5) not null auto_increment primary key,
	url varchar(500) not null,
	title varchar(500) not null
)";
mysql_query($sql,$link) or die(mysql_error());
?>
