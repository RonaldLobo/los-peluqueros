<?php
	error_log("Existe el job de facturas q corre cada 10 mins", 0);

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Factura.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBFactura.php';
    require_once("pestJson.php");


    $app->get('/factura/', function() use ($app) 
    {
    	$dbFactura = new DBFactura(); 
		$factura = array('factura' => $dbFactura->obtenerInfoFactura('E', 8));


  		for (int i = $facturas.length - 1; i >= 0; i--) {

  			echo "factura: " + $facturas[i];
	
		 	$restClient = new PestJSON('http://kyrapps.com/facturador-api/');
		    $response   = $restClient->post('api/facturador',$facturas[i]);
		    $fact = createFact($facturas[i]);
			$fact->conrealizada = true;
			$fact->facturabase = {
				base: facturas[i].base
			};

  			echo "respuesta: " + response.respuesta;

		    if(response.respuesta == "aceptado"){
				$facturas[i].estado = 'P';
			} else if(response.error == "recibido"){
				$facturas[i].estado = 'E';
				$facturas[i].refresh = res.refreshToken
			} else {
				$facturas[i].estado = 'R';//Rechazada
			}

			$respuesta = $dbFactura->actualizarEstadoFactura($fac);
			$jsonArray = json_encode($respuesta);
	        $app->response->headers->set('Content-Type', 'application/json');
	        $app->response->setStatus(200);
	        $app->response->setBody($jsonArray);
		}
    });



    function createFact($factura) {
        $data = array(
        'factura' => array(
            'nombreComercial' => $factura->nombreNegocio,
            'situacion'=>'normal',
        	'emisor' => array(
        		'nombre'=> $factura->nombreCompletoBarbero,
	            'tipoId'=> $factura->tipoId, 
	            'id'=> $factura->cedulaBarbero,
	            'provincia'=> $factura->provinciaSucursal,
	            'canton'=> $factura->cantonSucursal,
	            'distrito'=> $factura->distritoSucursal,
	            'barrio'=> $factura->barrioSucursal,
	            'senas'=> $factura->,detalleDireccionSucursal
	            'codigoPaisTel'=>'506',
	            'tel'=>$factura->telefonoSucursal,
	            'codigoPaisFax'=>'',
	            'fax'=>'',
	            'email'=>$factura->correoSucursal
        	),
        	'cliente' => array(
        		'id'=>$factura->idFacturadorBarbero;
        	),
    		if($factura->cedulaUser==0){
    			'omitirReceptor'=>'true',
    		}else{
    			'omitirReceptor'=>'false',
    		}
    		'receptor' => array(
        		'email'=>$factura->correoUsuario;
        	),
    		'refreshToken'=>$factura->refresh;
    		'clave'=>$factura->clave;
    		'xml'=>$factura->xml;
    		'consecutivo'=>$factura->consecutivo;

            )
        );
        return $data;
    }
    






?>