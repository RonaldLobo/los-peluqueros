<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Proveedor.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBProveedor.php';


$app->get('/proveedor/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbProveedor = new DBProveedor(); 
        $nombre = $app->request->params('nombre');
        if (!empty($nombre)){ 
            $proveedor = array('proveedor' => $dbProveedor->obtenerProveedor($nombre,2));
        }  else{
            $proveedor = array('proveedor' => $dbProveedor->obtenerProveedor("",0));
        }
        $jsonArray = json_encode($proveedor);
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


$app->post('/proveedor/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $proveedor = new Proveedor(); 
        $dbProveedor = new DBProveedor(); 
        $body = $app->request->getBody();
        $postedProveedor= json_decode($body);
        $proveedor->parseDto($postedProveedor->proveedor);
        $verificarReg = $dbProveedor->obtenerProveedor($proveedor->nombre,3);
        if(is_null($method)){      
            if( count($verificarReg) == 0){
                $result = $dbProveedor->agregarProveedor($proveedor);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($result->toJson());
            }else{
               $error = new Error();
               $error->error = 'El Proveedor ya se encuentra registrado, seleccione otro';
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(409);
               $app->response->setBody($error->toJson());
            }
        }else{
            $nomBD ='';
            if (count($verificarReg) >0){
                  $nomBD =$verificarReg->nombre;
            }
            if((count($verificarReg) == 0 )|| $proveedor->nombre == $nomBD){
               $result = $dbProveedor->actualizarProveedor($proveedor);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($result->toJson());        
            }else{
               $error = new Error();
               $error->error = 'El Proveedor ya se encuentra registrado, seleccione otro';
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

$app->put('/proveedor/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $proveedor = new Proveedor(); 
        $dbProveedor = new DBProveedor(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $proveedor->parseDto($posted->proveedor);
        $result = $dbProveedor->actualizarProveedor($proveedor);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($result->toJson());
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->get('/proveedor/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbProveedor = new DBProveedor(); 
        $result = array('proveedor' => $dbProveedor->obtenerProveedor($id,1));
        $jsonArray = json_encode($result);
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


$app->delete('/proveedor/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbProveedor = new DBProveedor();
        $dbProveedor->eliminar($id);
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
