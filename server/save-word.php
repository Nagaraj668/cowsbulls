<?php 

	include 'db-executor.php';

	$db = new DBExecutor();
	
	/* $p1 = $_POST["p1"];
	$p2 = $_POST["p2"]; */
	$system_word = $_POST["system_word"];
	$match_id = $_POST["match_id"];
/* 	
	if($p2.equals("0") && $system_word.equals("0") ){
		$query = "insert into games values('" . $match_id . "','" . $p1 . "',null,null)";
	}if($p1.equals("0") && $system_word.equals("0")){
		$query = "update games set p2 = '" . $p2 . "' where match_id = '" . $match_id . "' ";
	}if(isset($system_word) && $p1.equals("0") && $p2.equals("0")){ */
		$query  = "insert into games values('" . $match_id . "',null, null, '".$system_word."')";
	
	$db->executeDML($query);
	
	$db->close();
	
	echo 1;
	
?>