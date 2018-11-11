<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Factura.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Auth.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBFactura.php';


$app->get('/factura/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbFactura = new DBProveedor(); 
        $codigo = $app->request->params('codigo');
        $idCliente = $app->request->params('idCliente');
        $idCreadoPor = $app->request->params('idCreadoPor');
        $idSucursal = $app->request->params('idSucursal');
        $estado = $app->request->params('estado');
        $fecha = $app->request->params('fecha');
        if (!empty($codigo)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($codigo,"",2));
        } elseif  (!empty($idCliente)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($idCliente,"",4));
        }elseif  (!empty($idCreadoPor)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($idCreadoPor,"",5));
        }elseif  (!empty($idSucursal)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($idSucursal, $estado,8));
        }elseif  (!empty($idSucursal)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($idSucursal,"",6));
        }elseif  (!empty($fecha)){ 
            $factura = array('factura' => $dbFactura->obtenerFactura($fecha,"",7));
        } else{
            $factura = array('factura' => $dbFactura->obtenerFactura("","",0));
        }
        $jsonArray = json_encode($factura);
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


$app->post('/factura/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    $method = $app->request->params('method');
    if($auth->isAuth($authToken)){
        $factura = new Factura(); 
        $dbFactura = new DBFactura(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $factura->parseDto($posted->factura);
        //$verificarReg = $dbFactura->obtenerFactura($factura->codigo,3);
        if(is_null($method)){      
          //  if( count($verificarReg) == 0){
                $result = $dbFactura->agregarFactura($factura,$posted->factura->detalleFactura);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setStatus(200);
                $app->response->setBody($result->toJson());
           // }else{
             //  $error = new Error();
             //  $error->error = 'La Factura ya se encuentra registrado, seleccione otro';
             //  $app->response->headers->set('Content-Type', 'application/json');
             //  $app->response->setStatus(409);
             //  $app->response->setBody($error->toJson());
            //}
        }else{
           // $nomBD ='';
           // if (count($verificarReg) >0){
            //      $nomBD =$verificarReg->codigo;
           // }
           // if((count($verificarReg) == 0 )|| $factura->codigo == $nomBD){
               $result = $dbFactura->actualizarFactura($factura,$posted->factura->detalleFactura);
               $app->response->headers->set('Content-Type', 'application/json');
               $app->response->setStatus(200);
               $app->response->setBody($result->toJson());        
           // }else{
           //    $error = new Error();
           //    $error->error = 'La Factura ya se encuentra registrado, seleccione otro';
           //    $app->response->headers->set('Content-Type', 'application/json');
           //    $app->response->setStatus(409);
           //    $app->response->setBody($error->toJson());
          //  }
        }       
    }
    else{
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setStatus(401);
        $app->response->setBody("");
    }
    return $app;
});

$app->put('/factura/', function() use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $factura = new Factura(); 
        $dbFactura = new DBFactura(); 
        $body = $app->request->getBody();
        $posted = json_decode($body);
        $factura->parseDto($posted->factura);
        $result = $dbFactura->actualizarFactura($factura, $posted->factura->detalleFactura);
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

$app->get('/factura/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbFactura = new DBFactura(); 
        $result = array('factura' => $dbFactura->obtenerFactura($id,"",1));
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


$app->delete('/factura/:id', function($id) use ($app) {
    $auth = new Auth();
    $authToken = $app->request->headers->get('Authorization');
    if($auth->isAuth($authToken)){
        $dbFactura = new DBFactura();
        $dbFactura->eliminar($id);
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
