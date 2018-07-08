<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Producto.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBProducto.php';


$app->get('/producto/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbProducto = new DBProducto(); 
        $nombre = $app->request->params('nombre');
        $idProveedor = $app->request->params('idProveedor');
        if (!empty($nombre)){ 
            $producto = array('producto' => $dbProducto->obtenerProducto($nombre,2));
        }elseif (!empty($idProveedor)){ 
            $producto = array('producto' => $dbProducto->obtenerProducto($idProveedor,4));
        }  
        else{
            $producto = array('producto' => $dbProducto->obtenerProducto("",0));
        }
        $jsonArray = json_encode($producto);
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


$app->post('/producto/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $producto = new Producto(); 
        $dbProducto = new dbProducto(); 
        $body = $app->request->getBody();
        $posted= json_decode($body);
        $producto->parseDto($posted->producto);
        $verificarReg = $dbProducto->obtenerProducto($producto->nombre,3);
        if(is_null($method)){      
            if( count($verificarReg) == 0){
                $result = $dbProducto->agregarProducto($producto);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($result->toJson());
            }else{
               $error = new Error();
               $error->error = 'El Producto ya se encuentra registrado, seleccione otro';
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(409);
               $app->response->setBody($error->toJson());
            }
        }else{
            $nomBD ='';
            if (count($verificarReg) >0){
                  $nomBD =$verificarReg->nombre;
            }
            if((count($verificarReg) == 0 )|| $producto->nombre == $nomBD){
               $result = $dbProducto->actualizarProducto($producto);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($result->toJson());        
            }else{
               $error = new Error();
               $error->error = 'El Producto ya se encuentra registrado, seleccione otro';
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

$app->put('/producto/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $producto = new Producto(); 
        $dbProducto = new DBProducto(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $producto->parseDto($posted->producto);
        $result = $dbProducto->actualizarProducto($producto);
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

$app->get('/producto/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbProducto = new DBProducto(); 
        $result = array('producto' => $dbProducto->obtenerProducto($id,1));
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
        $dbProducto = new DBProveedor();
        $dbProducto->eliminar($id);
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
