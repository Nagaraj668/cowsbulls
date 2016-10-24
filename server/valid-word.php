<?php
include 'db-executor.php';
class WordController {
	var $db;
	function __construct() {
		$this->db = new DBExecutor ();
	}
	
	function isWordValid($word){
		$query = "select word from words where word = '" . $word . "'";
		$result = $this->db->executeDRL ( $query );
		if ($result->num_rows > 0) {
			return true;
			$this->db->close();
		}
		$this->db->close();
		return false;
	}
	
}	

$word  = $_GET["word"];
$wordController = new WordController ();
$response = $wordController->isWordValid ($word);
echo $response;

?>