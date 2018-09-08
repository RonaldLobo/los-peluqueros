<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBReserva.php';

    date_default_timezone_set('Canada/Saskatchewan');

	function sendNotification($topic,$reserva) {
    	$url = "https://fcm.googleapis.com/fcm/send";
		// $serverKey = 'AAAApRuZq9k:APA91bHH6QoNIcEZXYOFQ3BQhmuiECEn6rrc8Qj8YCB-CGCYOwx6KsENR57Fz0IJ7lcdnySvVTd_S0OclvBlMTVab3FkOQhR4vVc9H-h7bpRtUuyBhscKA2iLSBJ9wZPQM0FgJ2HGVxX';	

        $serverKey = 'AAAAj2NAhYA:APA91bG2-NLTA_e7_yKysK3gNsUaTSFjjjhTy9iUg5LEqdjJxdRb-Ezduk5wTXJEg0_SUE-aYOF5TL6hCEj34Ow23zbcRywL6Mv1zOYtqKYF_jXwk0igJAFtPqVRV_hg-67kkgzk2qatihOQSYG3nw6_u81rFNnYGg';
        
	    $title = "Recordatorio de cita";
	    $body = "Recordatorio de cita";	
        $hora = date("g:i A", strtotime($reserva->horaInicial));
	    if($hora){
	    	$body = "Hola ".$reserva->nombreUserReserva." le recordamos su cita a las ".$hora." en ".$reserva->sucursal;	
	    }
        $token = '/topics/'.$topic;
        $notification = array('title' =>$title , 'text' => $body, 'sound' => 'enable', 'badge' => '1');
        $arrayToSend = array('to' => $token, 'notification' => $notification,'priority'=>'high');
        $json = json_encode($arrayToSend);
        $headers = array();
        $headers[] = 'Content-Type: application/json';
        $headers[] = 'Authorization: key='. $serverKey;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST,"POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
        //Send the request
        $result=curl_exec($ch);
    }

    function getCitas(){
		$dbReserva = new DBReserva(); 
		$actualHour = date('H');
		$actualDay = date('Y-m-d');
		$timeInicial = ($actualHour + 3).':00:00';
		$timeFinal = ($actualHour + 4).':00:00';
		$reservas = $dbReserva->obtenerReservaFechaHora($actualDay,$timeInicial,$timeFinal);
		foreach ($reservas as $reserva) {
            $topic = 'user'.$reserva->idUsuarioReserva;
            sendNotification($topic,$reserva));
        }
    }

    if($argv[1]){
    	sendNotification($argv[1],'');
    } else {
    	getCitas();
    }

    
?>