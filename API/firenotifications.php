<?php
	// $payload = file_get_contents('http://los-peluqueros.appheroku.com/API/notifications.php');
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://los-peluqueros.appheroku.com/API/notifications.php"); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$temp = trim(curl_exec($ch));
	curl_close($ch);
?>