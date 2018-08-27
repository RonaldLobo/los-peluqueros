<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Factura.php';

class DBFactura {
   
    

    function agregarFactura($factura){
        $db = new DB();
        $sql = "INSERT INTO factura (s,FkIdUsuarioCreadoFactura,FkIdSucursalBarberiaFactura, FkIdReservaFactura,Fecha, Total,Impuesto,Descuento,Cantidad,Moneda,Codigo,Detalle,TipoTransacion,Estado) VALUES ("
                .$factura->idCliente.","
                .$factura->idCreadoPor.","
                .$factura->idSucursal.",'"
                .$factura->fecha."','"
                .$factura->monto."','"
                .$factura->impuesto."','"
                .$factura->descuento."',"
                .$factura->cantidad.",'"
                .$factura->codigo."','"
                .$factura->detalle."','"
                .$factura->tipoTransaccion."',"
                .$factura->estado. ")";
        $id = $db->agregar($sql);
        $factura->id = $id;
        return $factura;
    }
    
    
    function actualizarFactura($factura){
        $db = new DB();
        $sql = "UPDATE factura SET "
                . "Monto='".$factura->monto."', "
                . "Impuesto='".$factura->impuesto."',"
                . "Descuento='".$factura->descuento."',"
                . "Cantidad=".$factura->cantidad.","
                . "Moneda=".$factura->Moneda.","
                . "Detalle='".$factura->detalle."',"
                . "TipoTransacion='".$factura->tipoTransaccion.","
                . "Estado=".$factura->estado
                . " WHERE PkIdFactura=".$factura->id;
        $db->actualizar($sql);
        return $factura;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE factura SET Estado=0 WHERE PkIdFactura=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerFactura($busqueda, $opcion){
        $sql = "SELECT PkIdFactura,FkIdUsuarioClienteFactura,FkIdUsuarioCreadoFactura,FkIdSucursalBarberiaFactura,Fecha,Monto,Impuesto,Descuento,Cantidad,Moneda,Codigo,Detalle,TipoTransacion,Estado FROM factura WHERE Estado=1";
        if($opcion == 1){
            $sql.= " AND PkIdFactura=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND Codigo LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= " AND Codigo = '".$busqueda."'";
        }elseif ($opcion == 4) {
            $sql.= " AND FkIdUsuarioClienteFactura = ".$busqueda.;
        }elseif ($opcion == 5) {
            $sql.= " AND FkIdUsuarioCreadoFactura = ".$busqueda.;
        }elseif ($opcion == 6) {
            $sql.= " AND FkIdSucursalBarberiaFactura = ".$busqueda.;
        }elseif ($opcion == 7) {
            $sql.= " AND Fecha = '".$busqueda."'";
        } 
        $db = new DB();        
        if($opcion == 0 || $opcion==2){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }
        $factura= array();
        if(count($row) > 0 && ($opcion==0 || $opcion==2)){            
             $factura = $this->parseDataList($row);
        } elseif (count($row) > 0 && ($opcion==1 || $opcion==3)) {
             $factura =  $this->parseRowFactura($row);              
        }
        return $factura;
    }
    

 .$factura->idCliente.","
                .$factura->idCreadoPor.","
                .$factura->idSucursal.",'"
                .$factura->fecha."','"
                .$factura->monto."','"
                .$factura->impuesto."','"
                .$factura->descuento."',"
                .$factura->cantidad.",'"
                .$factura->codigo."','"
                .$factura->detalle."','"
                .$factura->tipoTransaccion."',"
                .$factura->estado. ")";

    function parseRowFactura($row) {
        $factura = new Factura();
        if(isset($row['PkIdProveedor'])){
            $factura->id = $row['PkIdProveedor'];
        }
        if(isset($row['IdCliente'])){
            $factura->idCliente = $row['IdCliente'];
        }
        if(isset($row['IdCreadoPor'])){
            $factura->idCreadoPor = $row['IdCreadoPor'];
        }
        if(isset($row['IdSucursal'])){
            $factura->idSucursal = $row['IdSucursal'];
        }
        if(isset($row['Fecha'])){
            $factura->fecha = $row['Fecha'];
        }
        if(isset($row['Monto'])){
            $factura->monto = $row['Monto'];
        }
        if(isset($row['Impuesto'])){
            $factura->impuesto = $row['Impuesto'];
        }
        if(isset($row['Descuento'])){
            $factura->descuento = $row['Descuento'];
        }
         if(isset($row['Codigo'])){
            $factura->codigo = $row['Codigo'];
        }
        if(isset($row['Cantidad'])){
            $factura->cantidad = $row['Cantidad'];
        }
        if(isset($row['Moneda'])){
            $factura->moneda = $row['Moneda'];
        }
        if(isset($row['Cantidad'])){
            $factura->cantidad = $row['Cantidad'];
        }
        if(isset($row['Estado'])){
            $factura->estado = $row['Estado'];
        }
        return $factura;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowFactura($row));
        }
        return $parseDatos;
    }
    
  
       
  
   
    
}
