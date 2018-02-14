<?php
     $url = "https://fcm.googleapis.com/fcm/send";

            $token = "/topics/all";
            $serverKey = 'AAAApRuZq9k:APA91bHH6QoNIcEZXYOFQ3BQhmuiECEn6rrc8Qj8YCB-CGCYOwx6KsENR57Fz0IJ7lcdnySvVTd_S0OclvBlMTVab3FkOQhR4vVc9H-h7bpRtUuyBhscKA2iLSBJ9wZPQM0FgJ2HGVxX';
            $title = "Title";
            $body = "Body of the message";
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
?>