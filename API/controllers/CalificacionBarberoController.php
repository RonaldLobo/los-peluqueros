<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBCalificacionBarbero.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/CalificacionBarbero.php';
   

$app->get('/calificacionBarbero/', function() use ($app) {
  /*  $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){*/
        $dbCalificacionBarbero = new DBCalificacionBarbero(); 
        $idUsuario = $app->request->params('idUsuario');
        $idUsuarioBarbero = $app->request->params('idUsuarioBarbero');
        if (!empty($idUsuario)) {
            $calificacionBarbero = array('calificacionBarbero' => $dbCalificacionBarbero->obtenerCalificacionBarbero($idUsuario,1));
        } elseif (!empty($idUsuarioBarbero)) {
            $calificacionBarbero = array('calificacionBarbero' => $dbCalificacionBarbero->obtenerCalificacionBarbero($idUsuarioBarbero,3));
        } else{
            $calificacionBarbero = array('calificacionBarbero' => $dbCalificacionBarbero->obtenerCalificacionBarbero("",0));
        }
        $jsonArray = json_encode($calificacionBarbero);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($jsonArray);
   /* }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }*/
    return $app;
});


$app->post('/calificacionBarbero/', function() use ($app) {
  /*  $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){*/
        $calificacionBarbero = new CalificacionBarbero(); 
        $dbCalificacionBarbero = new DBCalificacionBarbero(); 
        $body = $app->request->getBody();
        $postedCalificacionBarbero= json_decode($body);
        $calificacionBarbero->parseDto($postedCalificacionBarbero->calificacionBarbero);
        $id = $app->request->params('id');
        $verificarReg = $dbCalificacionBarbero->obtenerCalificacionBarbero($id,2);
       if(is_null($method)){   
            if( count($verificarReg) == 0){
                $resultCalificacionBarbero = $dbCalificacionBarbero->agregarCalificacionBarbero($calificacionBarbero);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($resultCalificacionBarbero->toJson());
             }else{
               $resultCalificacionBarbero = $dbCalificacionBarbero->actualizarCalificacionBarbero($calificacionBarbero);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($resultCalificacionBarbero->toJson()); 
            }
        }else{
                        
               $resultCalificacionBarbero = $dbCalificacionBarbero->actualizarCalificacionBarbero($calificacionBarbero);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($resultCalificacionBarbero->toJson());                    
        }            
   /* }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }*/
    return $app;
});


$app->get('/calificacionBarbero/:idUsuario', function($id) use ($app) {
   /* $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){*/
        $dbCalificacionBarbero = new DBCalificacionBarbero(); 
        $resultCalificacionBarbero = $dbCalificacionBarbero->obtenerCalificacionBarbero($idUsuario,1);
        $jsonArray = json_encode($resultCalificacionBarbero);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($jsonArray);
    /*}
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }*/
    return $app;
});





