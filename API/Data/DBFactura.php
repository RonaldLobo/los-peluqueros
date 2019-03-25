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

        $sql = "INSERT INTO factura (FkIdUsuarioClienteFactura,FkIdUsuarioCreadoFactura,FkIdSucursalBarberiaFactura,Fecha, Total,TotalImpuesto,TotalDescuento, TotalNeto ,Moneda,Detalle,TipoTransaccion,Estado, CodigoFactura,NumComprobante, Clave, Consecutivo, Xml, Refresh, Base) VALUES ("
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
                .$factura->refresh. "','"
                .$factura->base. "')";
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
                . "Refresh='".$factura->refresh."',"
                . "Base='".$factura->base."'"
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


    function actualizarEstadoFactura($factura){
        $db = new DB();
        $sql = "UPDATE factura SET "
                . "Estado='".$factura->estado."'," . "Xml='".$factura->xml."'," 
                . "Refresh='".$factura->refresh."'"
                . " WHERE PkIdFactura=".$factura->id;
        $db->actualizar($sql);
        return $factura;
    }

    function actualizarBaseFactura($factura){
        $db = new DB();
        $sql = "UPDATE factura SET "
                .  "Base='".$factura->base."'" 
                . " WHERE PkIdFactura=".$factura->id;
        $db->actualizar($sql);
        return $factura;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE factura SET Estado=0 WHERE PkIdFactura=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerFactura($busqueda, $busqueda2, $opcion){
        $sql = " SELECT f.PkIdFactura, f.FkIdUsuarioClienteFactura, f.FkIdUsuarioCreadoFactura, f.FkIdSucursalBarberiaFactura, f.Fecha,f.Total,f.TotalImpuesto,f.TotalDescuento,f.TotalNeto,f.Moneda,f.CodigoFactura,f.Detalle,f.TipoTransaccion,f.Estado,f.NumComprobante, f.Clave, f.Consecutivo, f.Xml, f.Refresh, f.Base, u.Nombre AS nombreUserReserva , u.PrimerApellido AS primerApellidoUserReserva,u.SegundoApellido AS segundoApellidoUserReserva, ub.Nombre AS nombreBarbero , ub.PrimerApellido AS primerApellidoBarbero, ub.SegundoApellido AS segundoApellidoBarbero, ub.Cedula as CedulaBarbero, u.Cedula AS CedulaUser, ub.IdFacturador as IdFacturadorBarbero FROM factura f LEFT JOIN Usuarios u on f.FkIdUsuarioClienteFactura = u.PkIdUsuario LEFT JOIN Usuarios ub on f.FkIdUsuarioCreadoFactura = ub.PkIdUsuario WHERE ";
        if($opcion == 1){
            $sql.= "  PkIdFactura=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= "  CodigoFactura LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= "  CodigoFactura = '".$busqueda."'";
        }elseif ($opcion == 4) {
            $sql.= "  FkIdUsuarioClienteFactura = ".$busqueda;
        }elseif ($opcion == 5) {
            $sql.= "  FkIdUsuarioCreadoFactura = ".$busqueda;
        }elseif ($opcion == 6) {
            $sql.= "  FkIdSucursalBarberiaFactura = ".$busqueda;
        }elseif ($opcion == 7) {
            $sql.= "  f.Fecha = '".$busqueda."'";
        } elseif ($opcion == 8) {
            $sql.= " FkIdSucursalBarberiaFactura = ".$busqueda." AND f.Estado = '".$busqueda2."'";
        }elseif ($opcion == 9) {
            $sql.= "  f.Estado = '".$busqueda2."'";
        }
        $sql.= " ORDER BY f.Fecha DESC ";
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
    



    function obtenerInfoFactura($busqueda,  $opcion){
        $sql = " SELECT f.PkIdFactura, f.Fecha,f.Total,f.TotalImpuesto,f.TotalDescuento,f.TotalNeto,f.Moneda,f.CodigoFactura,f.Detalle,f.TipoTransaccion,f.Estado,f.NumComprobante, f.Clave, f.Consecutivo, f.Xml, f.Refresh,f.Base, ub.Cedula as CedulaBarbero, u.Cedula AS CedulaUser, ub.IdFacturador as IdFacturadorBarbero, CONCAT( ub.Nombre , ' ' , ub.PrimerApellido  ,' ' ,ub.SegundoApellido) as NombreCompletoBarbero,CASE WHEN u.Nombre = 'generico' THEN u.Nombre else CONCAT( u.Nombre , ' ' , u.PrimerApellido  ,' ' ,u.SegundoApellido) end as NombreCompletoUsuario,s.Provincia AS ProvinciaSucursal,s.Canton as CantonSucursal,s.Distrito as DistritoSucursal,s.Canton as CantonSucursal,s.Barrio as BarrioSucursal,  s.DetalleDireccion as DetalleDireccionSucursal,s.NombreNegocio,s.TipoId, (SELECT   Telefono  FROM  telefonosucursal ts WHERE ts.FkIdSucursalBarberiaTelefono = s.PkIdSucursalBarberia  limit  1 ) as TelefonoSucursal, (SELECT   Email  FROM  emailsucursal es WHERE es.FkIdSucursalBarberiaEmail = s.PkIdSucursalBarberia  limit  1 ) as CorreoSucursal, (SELECT   Email  FROM  emailusuario eu WHERE eu.FkIdUsuarioEmail = u.PkIdUsuario limit  1 ) as CorreoUsuario 
            FROM factura f LEFT JOIN Usuarios u on f.FkIdUsuarioClienteFactura = u.PkIdUsuario LEFT JOIN Usuarios ub on f.FkIdUsuarioCreadoFactura = ub.PkIdUsuario LEFT JOIN SucursalBarberia s ON f.FkIdSucursalBarberiaFactura = s.PkIdSucursalBarberia WHERE ";
        if($opcion == 1){
            $sql.= "  PkIdFactura=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= "  CodigoFactura LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= "  CodigoFactura = '".$busqueda."'";
        }elseif ($opcion == 4) {
            $sql.= "  FkIdUsuarioClienteFactura = ".$busqueda;
        }elseif ($opcion == 5) {
            $sql.= "  FkIdUsuarioCreadoFactura = ".$busqueda;
        }elseif ($opcion == 6) {
            $sql.= "  FkIdSucursalBarberiaFactura = ".$busqueda;
        }elseif ($opcion == 7) {
            $sql.= "  f.Fecha = '".$busqueda."'";
        }elseif ($opcion == 8) {
            $sql.= "  f.Estado = '".$busqueda."'";
        }
        $sql.= " ORDER BY f.Fecha DESC ";

        error_log("SQL  ".$sql, 0);

        $db = new DB();        
        if($opcion == 1 || $opcion == 3){
            $row = $db->obtenerUno($sql);  
        }else{
            $row = $db->listar($sql);       
        }

        error_log("count row  ".count($row), 0);
        $factura= array();
        if(count($row) > 0 && ($opcion==1 || $opcion==3)){    
            $factura =  $this->parseDataOne($row);  
        } elseif (count($row) > 0) {
            $factura = $this->parseDataList($row);         
        }
        
        error_log("count factura  ".count($factura), 0);
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
        if(isset($row['nombreUserReserva'])){
            $factura->nombreUserReserva = $row['nombreUserReserva'];
        }  
        if(isset($row['primerApellidoUserReserva'])){
            $factura->primerApellidoUserReserva = $row['primerApellidoUserReserva'];
        }
        if(isset($row['segundoApellidoBarbero'])){
            $factura->segundoApellidoUserReserva = $row['segundoApellidoUserReserva'];
        }
        if(isset($row['nombreBarbero'])){
            $factura->nombreBarbero = $row['nombreBarbero'];
        }
        if(isset($row['primerApellidoBarbero'])){
            $factura->primerApellidoBarbero = $row['primerApellidoBarbero'];
        }
        if(isset($row['segundoApellidoBarbero'])){
            $factura->segundoApellidoBarbero = $row['segundoApellidoBarbero'];
        }       
        if(isset($row['CedulaBarbero'])){
            $factura->cedulaBarbero = $row['CedulaBarbero'];
        }
        if(isset($row['CedulaUser'])){
            $factura->cedulaUser = $row['CedulaUser'];
        }  
        if(isset($row['IdFacturadorBarbero'])){
            $factura->idFacturadorBarbero = $row['IdFacturadorBarbero'];
        }     

        if(isset($row['NombreCompletoBarbero'])){
            $factura->nombreCompletoBarbero = $row['NombreCompletoBarbero'];
        }
        if(isset($row['NombreCompletoUsuario'])){
            $factura->nombreCompletoUsuario = $row['NombreCompletoUsuario'];
        }  
        if(isset($row['ProvinciaSucursal'])){
            $factura->provinciaSucursal = $row['ProvinciaSucursal'];
        }  
        if(isset($row['CantonSucursal'])){
            $factura->cantonSucursal = $row['CantonSucursal'];
        }

        if(isset($row['DistritoSucursal'])){
            $factura->distritoSucursal = $row['DistritoSucursal'];
        }
        if(isset($row['BarrioSucursal'])){
            $factura->barrioSucursal = $row['BarrioSucursal'];
        }
        if(isset($row['DetalleDireccionSucursal'])){
            $factura->detalleDireccionSucursal = $row['DetalleDireccionSucursal'];
        }
        if(isset($row['NombreNegocio'])){
            $factura->nombreNegocio = $row['NombreNegocio'];
        }     
        if(isset($row['TipoId'])){
            $factura->tipoId = $row['TipoId'];
        }
        if(isset($row['TelefonoSucursal'])){
            $factura->telefonoSucursal = $row['TelefonoSucursal'];
        }  
        if(isset($row['CorreoSucursal'])){
            $factura->correoSucursal = $row['CorreoSucursal'];
        } 
        if(isset($row['CorreoUsuario'])){
            $factura->correoUsuario = $row['CorreoUsuario'];
        }  
        if(isset($row['Base'])){
            $factura->base = $row['Base'];
        }    

        $factura->detalleFactura = $this->parseRowDetalleFactura($rowDetalleFactura);
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
            if(isset($row['Duracion'])){
                $detalleFactura->duracion = $row['Duracion'];
            }
            array_push($arrayDetalleFactura, $detalleFactura);
        }
       return $arrayDetalleFactura;
    }


    function obtenerDetalleFactura($id){
        $sql = "SELECT f.PkIdDetalleFactura, f.FkIdFactura, f.FkIdServicio  ,f.Producto, f.Codigo, f.Cantidad, f.Precio, f.Impuesto, f.Descuento, f.TipoDescuento, f.RazonDescuento, f.Total, f.Unidad, s.Duracion  FROM detalleFactura f  INNER JOIN Servicio s ON s.PkIdServicio = f.FkIdServicio WHERE FkIdFactura=".$id;
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
