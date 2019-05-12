<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Aprobacion.php';

class DBAprobacion {
 
    
    function agregarAprobacion($aprobacion){
        $db = new DB();
        $sql = "INSERT INTO aprobacion (FkIdSucursalBarberiaAprobacion,detalle_mensaje,mensaje,fecha_emision_doc,monto_total_impuesto,numero_cedula_emisor, numero_cedula_receptor, tipo_cedula_emisor, tipo_cedula_receptor, total_factura, claveAprobacion, estado, nombre_emisor) VALUES ("
                .$aprobacion->FkIdSucursalBarberiaAprobacion.",'"
                .$aprobacion->detalle_mensaje."','"
                .$aprobacion->mensaje."','"
                .$aprobacion->fecha_emision_doc."',"
                .$aprobacion->monto_total_impuesto."',"
                .$aprobacion->numero_cedula_emisor."',"
                .$aprobacion->numero_cedula_receptor."',"
                .$aprobacion->tipo_cedula_emisor."',"
                .$aprobacion->tipo_cedula_receptor."',"
                .$aprobacion->total_factura."',"
                .$aprobacion->claveAprobacion."',"
                .$aprobacion->estado."',"
                .$aprobacion->nombre_emisor. ")";
        $pkIdAprobacion = $db->agregar($sql);
        $aprobacion->pkIdAprobacion = $pkIdAprobacion;
        return $aprobacion;
    }
    
    
    function actualizarAprobacion($aprobacion){
        $db = new DB();
        $sql = "UPDATE aprobacion SET "
                . "FkIdSucursalBarberiaAprobacion='".$aprobacion->FkIdSucursalBarberiaAprobacion."', "
                . "detalle_mensaje=".$aprobacion->detalle_mensaje.","
                . "mensaje=".$aprobacion->mensaje.","
                . "fecha_emision_doc=".$aprobacion->fecha_emision_doc.","
                . "monto_total_impuesto=".$aprobacion->monto_total_impuesto.","
                . "numero_cedula_emisor=".$aprobacion->numero_cedula_emisor.","
                . "numero_cedula_receptor=".$aprobacion->numero_cedula_receptor.","
                . "tipo_cedula_emisor=".$aprobacion->tipo_cedula_emisor.","
                . "tipo_cedula_receptor=".$aprobacion->tipo_cedula_receptor.","
                . "total_factura=".$aprobacion->total_factura.","
                . "claveAprobacion=".$aprobacion->claveAprobacion.","
                . "estado=".$aprobacion->estado.","
                . "nombre_emisor=".$aprobacion->nombre_emisor
                . " WHERE pkIdAprobacion=".$aprobacion->pkIdAprobacion;
        $db->actualizar($sql);
        return $aprobacion;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE aprobacion SET Estado=0 WHERE pkIdAprobacion=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerAprobaciones($busqueda, $opcion){
        $sql = "SELECT * FROM aprobacion WHERE Estado=1";
        if($opcion == 1){
            $sql.= " AND pkIdAprobacion=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND FkIdSucursalBarberiaAprobacion=".$busqueda;
        }
        $db = new DB();        
        if($opcion == 0 || $opcion==2){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }
        $aprobacion= array();
        if(count($row) > 0 && ($opcion==0 || $opcion==2)){            
             $aprobacion = $this->parseDataList($row);
        } elseif (count($row) > 0 && ($opcion==1 || $opcion==3)) {
             $aprobacion =  $this->parseRowAprobacion($row);              
        }
        return $aprobacion;
    }
    
    function parseRowAprobacion($row) {
        $aprobacion = new Aprobacion();
        foreach($row as $property => $value) { 
            $aprobacion->$property = $value; 
        } 
        return $aprobacion;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowAprobacion($row));
        }
        return $parseDatos;
    }
    
  
       
  
   
    
}
