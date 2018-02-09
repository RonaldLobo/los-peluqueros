<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBServicio.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Servicios.php';
   

$app->get('/servicio/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbServicio = new DBServicio(); 
        $idUsuario = $app->request->params('idUsuario');
        if (!empty($idUsuario)) {
            $servicio = array('servicio' => $dbServicio->obtenerServicio($idUsuario,2));
        }  else{
            $servicio = array('servicio' => $dbServicio->obtenerServicio("",0));
        }
        $jsonArray = json_encode($servicio);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($jsonArray);
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});


$app->post('/servicio/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $servicio = new Servicios(); 
        $dbServicio = new DBServicio(); 
        $body = $app->request->getBody();
        $postedServicio= json_decode($body);
        $servicio->parseDto($postedServicio->servicio);
        $descripcion = $app->request->params('descripcion');
        $verificarReg = $dbServicio->obtenerServicio($descripcion,3);
        if(is_null($method)){   
            if( count($verificarReg) == 0){
                $resultServicio = $dbServicio->agregarServicio($servicio);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($resultServicio->toJson());
             }else{
               $error = new Error();
               $error->error = 'El Servicio ya se encuentra registrado, seleccione otro';
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(409);
               $app->response->setBody($error->toJson());
            }
        }else{
            $nomBD ='';
            if (count($verificarReg) >0){
                  $nomBD =$verificarReg->descripcion;
            }
            if((count($verificarReg) == 0 )|| $servicio->descripcion == $nomBD){
               $resultServicio = $dbServicio->actualizarServicio($servicio);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($resultServicio->toJson());        
            }else{
               $error = new Error();
               $error->error = 'El Servicio ya se encuentra registrado, seleccione otro';
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(409);
               $app->response->setBody($error->toJson());
            }
        }            
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->put('/servicio/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $servicio = new Servicios(); 
        $dbServicio = new DBServicio(); 
        $body = $app->request->getBody();
        $postedServicio = json_decode($body);
        $servicio->parseDto($postedServicio->servicio);
        $resultServicio = $dbServicio->actualizarServicio($servicio);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($resultServicio->toJson());
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->get('/servicio/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbServicio = new DBServicio(); 
        $resultServicio = $dbServicio->obtenerServicio($id,1);
        $jsonArray = json_encode($resultServicio);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($jsonArray);
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});


$app->delete('/servicio/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbServicio = new DBServicio(); 
        $dbServicio->eliminar($id);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody('');
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});



