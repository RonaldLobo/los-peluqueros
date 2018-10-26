<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Factura.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/DetalleFactura.php';

class DBFactura {
   
    

    function agregarFactura($factura, $detalleFactura){
        $db = new DB();

        if ($factura->idCliente == ''){
            $factura->idCliente = null; 
        }

        $sql = "INSERT INTO factura (FkIdUsuarioClienteFactura,FkIdUsuarioCreadoFactura,FkIdSucursalBarberiaFactura,Fecha, Total,TotalImpuesto,TotalDescuento, TotalNeto ,Moneda,Detalle,TipoTransaccion,Estado, CodigoFactura,NumComprobante, Clave, Consecutivo, Xml, Refresh) VALUES ("
                .$factura->idCliente.","
                .$factura->idCreadoPor.","
                .$factura->idSucursal.",'"
                .$factura->fecha."','"
                .$factura->total."','"
                .$factura->totalImpuesto."','"
                .$factura->totalDescuento."','"
                .$factura->totalNeto."','"
                .$factura->moneda."','"
                .$factura->detalle."','"
                .$factura->tipoTransaccion."','"
                .$factura->estado. "','"
                .$factura->codigo. "','"
                .$factura->numComprobante. "','"
                .$factura->clave. "','"
                .$factura->consecutivo. "','"
                .$factura->xml. "','"
                .$factura->refresh. "')";
        $id = $db->agregar($sql);
        if ($id >0){
            foreach($detalleFactura as $detalle){
                $sql = "INSERT INTO detalleFactura (FkIdFactura , FkIdServicio ,Producto, Codigo, Cantidad, Precio, Impuesto, Descuento, TipoDescuento, RazonDescuento, Total, Unidad) VALUES (".$id.",";
                if($detalle->idServicio != ''){
                  $sql.=  $detalle->idServicio.",'";
                }else{
                     $sql.=  "null,'";
                }
                $sql.=  $detalle->producto."','".$detalle->codigo."',".$detalle->cantidad.",'".$detalle->precio."','".$detalle->impuesto."','".$detalle->descuento."','".$detalle->tipoDescuento."','".$detalle->razonDescuento."','".$detalle->total."','".$detalle->unidad."')";
                $db->agregar($sql);
           
            }
        }
        $factura->id = $id;
        return $factura;
    }
    
    
    function actualizarFactura($factura, $detalleFactura){
        $db = new DB();
        $sql = "UPDATE factura SET "
                . "Total='".$factura->total."', "
                . "TotalImpuesto='".$factura->totalImpuesto."',"
                . "TotalDescuento='".$factura->totalDescuento."',"
                . "TotalNeto='".$factura->totalNeto."',"
                . "Moneda='".$factura->Moneda."',"
                . "Detalle='".$factura->detalle."',"
                . "TipoTransaccion='".$factura->tipoTransaccion."',"
                . "CodigoFactura='".$factura->codigo."',"
                . "NumComprobante='".$factura->numComprobante."',"
                . "Moneda=".$factura->moneda.","
                . "Estado='".$factura->estado."'"
                . "Clave='".$factura->clave."'," 
                . "Consecutivo='".$factura->consecutivo."',"  
                . "Xml='".$factura->xml."'," 
                . "Refresh='".$factura->refresh."'"
                . " WHERE PkIdFactura=".$factura->id;
        if($db->actualizar($sql)) {
                $sqlClean = "DELETE FROM detalleFactura WHERE FkIdFactura=".$factura->id;
                $db->actualizar($sqlClean);
                foreach ($detalleFactura  as $detalle){
                    $sql = "INSERT INTO detalleFactura (FkIdFactura , FkIdServicio ,Producto, Codigo, Cantidad, Precio, Impuesto, Descuento, TipoDescuento, RazonDescuento, Total, Unidad) VALUES ("
                        .$id.",".$detalle->idServicio.",'" .$detalle->producto."','".$detalle->codigo."','".$detalle->precio."','".$detalle->impuesto."','".$detalle->descuento."','".$detalle->tipoDescuento."','".$detalle->razonDescuento."','".$detalle->total."','".$detalle->unidad."')";
                    $db->agregar($sql);
                    $detalleFactura->id = $id;
                }
            }
        return $factura;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE factura SET Estado=0 WHERE PkIdFactura=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerFactura($busqueda, $opcion){
        $sql = "SELECT PkIdFactura,FkIdUsuarioClienteFactura,FkIdUsuarioCreadoFactura,FkIdSucursalBarberiaFactura,Fecha,Total,TotalImpuesto,TotalDescuento,TotalNeto,Moneda,CodigoFactura,Detalle,TipoTransaccion,Estado,NumComprobante, Clave, Consecutivo, Xml, Refresh FROM factura f  WHERE Estado=1";
        if($opcion == 1){
            $sql.= " AND PkIdFactura=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND CodigoFactura LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= " AND CodigoFactura = '".$busqueda."'";
        }elseif ($opcion == 4) {
            $sql.= " AND FkIdUsuarioClienteFactura = ".$busqueda;
        }elseif ($opcion == 5) {
            $sql.= " AND FkIdUsuarioCreadoFactura = ".$busqueda;
        }elseif ($opcion == 6) {
            $sql.= " AND FkIdSucursalBarberiaFactura = ".$busqueda;
        }elseif ($opcion == 7) {
            $sql.= " AND Fecha = '".$busqueda."'";
        } 
        $db = new DB();        
        if($opcion == 1 || $opcion == 3){
            $row = $db->obtenerUno($sql);  
        }else{
            $row = $db->listar($sql);       
        }
        $factura= array();
        if(count($row) > 0 && ($opcion==1 || $opcion==3)){    
            $factura =  $this->parseDataOne($row);  
        } elseif (count($row) > 0) {
            $factura = $this->parseDataList($row);         
        }
        return $factura;
    }
    

    function parseRowFactura($row, $rowDetalleFactura) {
        $factura = new Factura();
        if(isset($row['PkIdFactura'])){
            $factura->id = $row['PkIdFactura'];
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
        if(isset($row['Total'])){
            $factura->total = $row['Total'];
        }
        if(isset($row['TotalImpuesto'])){
            $factura->totalImpuesto = $row['TotalImpuesto'];
        }
        if(isset($row['TotalDescuento'])){
            $factura->totalDescuento = $row['TotalDescuento'];
        }
         if(isset($row['CodigoFactura'])){
            $factura->codigo = $row['CodigoFactura'];
        }
        if(isset($row['TotalNeto'])){
            $factura->totalNeto = $row['TotalNeto'];
        }
        if(isset($row['Moneda'])){
            $factura->moneda = $row['Moneda'];
        }
        if(isset($row['Estado'])){
            $factura->estado = $row['Estado'];
        }
        if(isset($row['NumComprobante'])){
            $factura->numComprobante = $row['NumComprobante'];
        }
        if(isset($row['TipoTransaccion'])){
            $factura->tipoTransaccion = $row['TipoTransaccion'];
        }
        if(isset($row['Detalle'])){
            $factura->detalle = $row['Detalle'];
        }
        if(isset($row['Clave'])){
            $factura->clave = $row['Clave'];
        }
        if(isset($row['Consecutivo'])){
            $factura->consecutivo = $row['Consecutivo'];
        }
        if(isset($row['Xml'])){
            $factura->xml = $row['Xml'];
        }
        if(isset($row['Refresh'])){
            $factura->refresh = $row['Refresh'];
        }               
        $factura->productos = $this->parseRowDetalleFactura($rowDetalleFactura);
        return $factura;
    }

    
  
           
    function parseRowDetalleFactura($rowDetalleFactura) {
        $arrayDetalleFactura = array();
        foreach ($rowDetalleFactura as $row) {
            $detalleFactura = new DetalleFactura();
            if(isset($row['PkIdDetalleFactura'])){
                $detalleFactura->id = $row['PkIdDetalleFactura'];
            }
            if(isset($row['Producto'])){
                $detalleFactura->producto = $row['Producto'];
            }
            if(isset($row['FkIdFactura'])){
                $detalleFactura->idFactura = $row['FkIdFactura'];
            }
            if(isset($row['FkIdServicio'])){
                $detalleFactura->idServicio = $row['FkIdServicio'];
            }
            if(isset($row['Codigo'])){
                $detalleFactura->codigo = $row['Codigo'];
            }
            if(isset($row['Precio'])){
                $detalleFactura->precio = $row['Precio'];
            }
            if(isset($row['Cantidad'])){
                $detalleFactura->cantidad = $row['Cantidad'];
            }
            if(isset($row['Impuesto'])){
                $detalleFactura->impuesto = $row['Impuesto'];
            }
            if(isset($row['Descuento'])){
                $detalleFactura->descuento = $row['Descuento'];
            }
            if(isset($row['Total'])){
                $detalleFactura->total = $row['Total'];
            }
            if(isset($row['TipoDescuento'])){
                $detalleFactura->tipoDescuento = $row['TipoDescuento'];
            }
            if(isset($row['RazonDescuento'])){
                $detalleFactura->razonDescuento = $row['RazonDescuento'];
            }
            if(isset($row['Unidad'])){
                $detalleFactura->unidad = $row['Unidad'];
            }
            array_push($arrayDetalleFactura, $detalleFactura);
        }
       return $arrayDetalleFactura;
    }


    function obtenerDetalleFactura($id){
        $sql = "SELECT PkIdDetalleFactura, FkIdFactura,FkIdServicio  ,Producto, Codigo, Cantidad, Precio, Impuesto, Descuento, TipoDescuento, RazonDescuento, Total, Unidad FROM detalleFactura WHERE FkIdFactura=".$id;
        $db = new DB();
        $row = $db->listar($sql);
        return $row;
    }
    

    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            $detalleFactura= $this->obtenerDetalleFactura($row["PkIdFactura"]);
            array_push($parseDatos, $this->parseRowFactura($row, $detalleFactura));
        }
        return $parseDatos;
    }
    
     function parseDataOne($row) {
        $detalleFactura= $this->obtenerDetalleFactura($row["PkIdFactura"]);
        return $this->parseRowFactura($row, $detalleFactura); 
    }
  
   
    
}
