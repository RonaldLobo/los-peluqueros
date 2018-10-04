<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Usuario.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBUsuario.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Telefono.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Correo.php';

$app->get('/usuario/', function() use ($app) {
    $dbUsuario = new DbUsuario(); 
    $user = $app->request->params('usuario');
    $nombre = $app->request->params('nombre');
    $idSucursal = $app->request->params('idSucursal');
    if (!empty($user)){ 
        $usuarios = array('usuario' => $dbUsuario->obtenerUsuario($user,2));
    } elseif (!empty($idSucursal)) {
        error_log("tenemos idSucursal".$idSucursal, 0);
        try{
            $usuarios = array('usuario' => $dbUsuario->obtenerUsuario($idSucursal,3));
        } catch(Exception $e){
            error_log("seguimos aqui ".$e->getMessage(), 0);
        }
        error_log("seguimos aqui", 0);
    } elseif (!empty($nombre)) {
        $usuarios = array('usuario' => $dbUsuario->obtenerUsuario($nombre,4));
    } else {
        $usuarios = array('usuario' => $dbUsuario->obtenerUsuario("",0));
    }
    error_log("seguimos aqui".count($usuarios), 0);
    mysql_set_charset('utf8');
    $jsonArray = json_encode($usuarios);
    $error = json_last_error();
    error_log("error".$error, 0);
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->setStatus(200);
    $app->response->setBody($jsonArray);
    return $app;
});

$app->post('/usuario/', function() use ($app) { 
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){        
        $usuario = new Usuario(); 
        $dbUsuario = new DbUsuario(); 
        $body = $app->request->getBody();
        $postedUser = json_decode($body);
        $usuario->parseDto($postedUser->usuario);        
        $verificarReg = $dbUsuario->obtenerUsuario($usuario->usuario,2);
        if(is_null($method)){
             if( count($verificarReg) == 0){
                $resultUsuario = $dbUsuario->agregarUsuario($usuario,$postedUser->usuario->telefono,$postedUser->usuario->correo); 
                $usuarios = array('usuario' => $dbUsuario->obtenerUsuario($resultUsuario->id,1));
                $jsonArray = json_encode($usuarios);            
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($jsonArray);
            }else{
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody('{"error":"El usuario ya existe, seleccione otro."}');
            }
        } else if ($method =='delete') {
            $idUsuario = $app->request->params('idUsuario');
            $idSucursal = $app->request->params('idSucursal');
            $dbUsuario = new DbUsuario(); 
            $verificarReg = $dbUsuario->verificarUsuarioReserva($idUsuario ,$idSucursal);
            if(count($verificarReg)==0){
                $dbUsuario->eliminarUsuarioBarberia($idUsuario);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody("{'status':'success'}");
            }else{

                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody('{"error":"El usuario no se puede Eliminar, porque tiene citas con otras barberias."}');
            }
        }else{        

            $nomBD ='';
            if (count($verificarReg) >0){
                  $nomBD =$verificarReg->usuario;
            }
            if((count($verificarReg) == 0 )|| $usuario->usuario == $nomBD){
                if($usuario->contrasenna == ""){
                    $usuario->contrasenna = $verificarReg->contrasenna;
                }
                $resultUsuario = $dbUsuario->actualizarUsuario($usuario,$postedUser->usuario->telefono,$postedUser->usuario->correo);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($resultUsuario->toJson());        
            }else{
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody('{"error":"El usuario ya existe, seleccione otro."}');
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

$app->put('/usuario/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $usuario = new Usuario(); 
        $dbUsuario = new DbUsuario(); 
        $body = $app->request->getBody();
        $postedUser = json_decode($body);
        $usuario->parseDto($postedUser->usuario);
        $resultUsuario = $dbUsuario->actualizarUsuario($usuario,$postedUser->usuario-->telefono,$postedUser->usuario-->correo);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($resultUsuario->toJson());
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->get('/usuario/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbUsuario = new DbUsuario(); 
        $resultUsuario = array('usuario' => $dbUsuario->obtenerUsuario($id,1));
        $jsonArray = json_encode($resultUsuario);
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


$app->delete('/usuario/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbUsuario = new DbUsuario(); 
        $dbUsuario->eliminar($id);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody("{'status':'success'}");
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->delete('/usuario/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');


    if($auth->isAuth($authToken)){

        $idUsuario = $app->request->params('idUsuario');
        $idSucursal = $app->request->params('idSucursal');
        $dbUsuario = new DbUsuario(); 
        $verificarReg = $dbUsuario->verificarUsuarioReserva($idUsuario ,$idSucursal);
        if(count($verificarReg)==0){
            $dbUsuario->eliminar($id);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setStatus(200);
            $app->response->setBody("{'status':'success'}");
        }else{

            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setStatus(200);
            $app->response->setBody('{"error":"El usuario no se puede Eliminar, porque tiene citas con otras barberias."}');
        }
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});


$app->post('/usuarioTelefono/', function() use ($app) { 
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){        
        $telefono = new Telefono(); 
        $dbUsuario = new DbUsuario(); 
        $body = $app->request->getBody();
        $postedUser = json_decode($body);
        $telefono->parseDto($postedUser->telefono);     
        $resultTelefono = $dbUsuario->agregarTelefono($telefono);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($resultTelefono->toJson());       
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});


$app->delete('/usuarioTelefono/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbUsuario = new DbUsuario(); 
        $dbUsuario->eliminarTelefono($id);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody("{'status':'success'}");
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});



$app->post('/usuarioCorreo/', function() use ($app) { 
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){        
        $correo = new Correo(); 
        $dbUsuario = new DbUsuario(); 
        $body = $app->request->getBody();
        $postedUser = json_decode($body);
        $correo->parseDto($postedUser->correo); 
        $resultCorreo = $dbUsuario->agregarCorreo($correo);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(200);
        $app->response->setBody($resultCorreo->toJson());
       
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});


$app->delete('/usuarioCorreo/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbUsuario = new DbUsuario(); 
        $dbUsuario->eliminarCorreo($id);
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


