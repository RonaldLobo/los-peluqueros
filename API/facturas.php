<?php
	error_log("Existe el job de facturas q corre cada 10 mins", 0);

    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Factura.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBFactura.php';
    require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Servicios/pestJson.php';


    	// try{
		$dbFactura = new DBFactura(); 
		$facturaList = $dbFactura->obtenerInfoFactura('E', 8);
		error_log("en la factura ".gettype($facturaList),0);
		error_log("en la factura ".count($facturaList),0);
		error_log("En el job 1", 0);


		function createFact($factura,$base) {
	    	if($factura->cedulaUser==0){
	    		$receptor = 'true';
			}else{
				$receptor = 'false';
			}

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
			            'senas'=> $factura->detalleDireccionSucursal,
			            'codigoPaisTel'=>'506',
			            'tel'=>$factura->telefonoSucursal,
			            'codigoPaisFax'=>'',
			            'fax'=>'',
			            'email'=>$factura->correoSucursal
		        	),
		    		'omitirReceptor'=>$receptor,
		    		'receptor' => array(
		        		'email'=>$factura->correoUsuario
		        	),
		    		'refreshToken'=>$factura->refresh,
		    		'clave'=>$factura->clave,
		    		'xml'=>$factura->xml,
		    		'consecutivo'=>$factura->consecutivo
		        ),
	    		'conrealizada'=>true,
	        	'cliente' => array(
	        		'id'=>$factura->idFacturadorBarbero
	        	),
		    	'facturabase' => array(
	        		'base'=>$base
	        	)
	        );
	        return $data;
	    }
	    error_log("En el job 2", 0);
	    error_log("facturas".count($facturaList), 0);
		for ($i = 0; $i < count($facturaList); ++$i) {

		 	$restClient = new PestJSON('');
		    $fact = createFact($facturaList[$i],$facturaList[$i]->base);
		    // error_log("despues de fact".json_encode($fact), 0);
		    $response = $restClient->post('http://kyrapps.com/facturador-api/api/facturador',$fact);
		    error_log('respuesta'.gettype($response), 0);
			error_log('respuesta'.json_encode($response), 0);
			error_log('respuesta respuesta'.$response["respuesta"], 0);

		    if($response->respuesta == "aceptado"){
				$facturaList[$i]->estado = 'P';
			} else if($response->error == "recibido"){
				$facturaList[$i]->estado = 'E';
			} else {
				$facturaList[$i]->estado = 'R';//Rechazada
			}

			// $respuesta = $dbFactura->actualizarEstadoFactura($facturaList[$i]);
		}
	// } catch(Exception $e){
	// 	error_log("En el job se fue al suelo", 0);
	// 	error_log($e->getMessage(), 0);
	// }



    
    






?>