<?php


function getWord(){
	$myFile = "words.txt";
	$lines = file ( $myFile );
	return  $lines [rand ( 0, 1923 )];
}

file_put_contents("logs.txt", "called");

echo getWord();

?>