<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Aprobacion.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBAprobacion.php';


$app->get('/aprobacion/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbAprobacion = new DBAprobacion(); 
        $FkIdSucursalBarberiaAprobacion = $app->request->params('FkIdSucursalBarberiaAprobacion');
        if (!empty($FkIdSucursalBarberiaAprobacion)){ 
            $aprobacion = array('aprobacion' => $dbAprobacion->obtenerAprobacion($FkIdSucursalBarberiaAprobacion,2));
        }else{
            $aprobacion = array('aprobacion' => $dbAprobacion->obtenerAprobacion("",0));
        }
        $jsonArray = json_encode($aprobacion);
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


$app->post('/aprobacion/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $aprobacion = new Aprobacion(); 
        $dbAprobacion = new DBAprobacion(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $aprobacion->parseDto($posted->aprobacion);
        if(is_null($method)){      
            $result = $dbAprobacion->agregarAprobacion($aprobacion);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setStatus(200);
            $app->response->setBody($result->toJson());
            
        }else{
            $result = $dbAprobacion->actualizarAprobacion($aprobacion);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setStatus(200);
            $app->response->setBody($result->toJson());
        }       
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->put('/aprobacion/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $aprobacion = new Aprobacion(); 
        $dbAprobacion = new DBAprobacion(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $aprobacion->parseDto($posted->aprobacion);
        $result = $dbAprobacion->actualizarAprobacion($aprobacion);
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

$app->get('/aprobacion/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbAprobacion = new DBAprobacion(); 
        $result = array('aprobacion' => $dbAprobacion->obtenerAprobacion($id,1));
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


$app->delete('/aprobacion/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbAprobacion = new DBAprobacion();
        $dbAprobacion->eliminar($id);
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
