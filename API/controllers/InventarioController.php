<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Inventario.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBInventario.php';


$app->get('/inventario/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbInventario = new DBProveedor(); 
        $codigo = $app->request->params('codigo');
        $producto = $app->request->params('producto');;
        $idSucursal = $app->request->params('idSucursal');
       
        if (!empty($codigo)){ 
            $inventario = array('inventario' => $dbInventario->obtenerInventario($codigo,$idSucursal ,3));
        } elseif  (!empty($producto)){ 
            $inventario = array('inventario' => $dbInventario->obtenerInventario($producto,$idSucursal ,2));
        }elseif  (!empty($idSucursal)){ 
            $inventario = array('inventario' => $dbInventario->obtenerInventario($idSucursal,$idSucursal ,1));
        } else{
            $inventario = array('inventario' => $dbInventario->obtenerInventario("",0,0));
        }
        $jsonArray = json_encode($inventario);
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


$app->post('/inventario/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $inventario = new Inventario(); 
        $dbInventario = new DBInventario(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $inventario->parseDto($posted->inventario);
        $verificarReg = $dbInventario->obtenerInventario($inventario->codigo,$inventario->idSucursal,3);
        if(is_null($method)){      
            if( count($verificarReg) == 0){
                $result = $dbFactura->agregarInventario($inventario);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($result->toJson());
            }else{
               $error = new Error();
               $error->error = 'La Factura ya se encuentra registrado, seleccione otro';
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(409);
               $app->response->setBody($error->toJson());
            }
        }else{
            $nomBD ='';
            if (count($verificarReg) >0){
                  $nomBD =$verificarReg->codigo;
                  $idSucursalBD =$verificarReg->idSucursal;
            }
            if((count($verificarReg) == 0 )|| ($inventario->codigo == $nomBD && $inventario->idSucursal == $idSucursalBD)){
               $result = $dbFactura->actualizarInventario($inventario);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($result->toJson());        
            }else{
               $error = new Error();
               $error->error = 'La Factura ya se encuentra registrado, seleccione otro';
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

$app->put('/inventario/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $inventario = new Inventario(); 
        $dbInventario = new DBInventario(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $inventario->parseDto($posted->inventario);
        $result = $dbFactura->actualizarInventario($inventario);
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

$app->get('/inventario/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbInventario = new DBInventario(); 
        $result = array('inventario' => $dbInventario->obtenerInventario($id,0,1));
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


$app->delete('/inventario/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbInventario = new DBInventario();
        $dbInventario->eliminar($id);
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
