<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Reserva.php';

class DBReserva {
  
    
    function agregarReserva($reserva){
        $db = new DB();
        $sql = "INSERT INTO reserva (FkIdSucursalBarberiaReserva,FkIdUsuarioReserva,FkIdUsuarioBarbero,FkIdServicioReserva,Dia,HoraInicial,Estado,Descripcion,PrecioDinamico,DuracionDinamica,EstadoFactura,TipoPago,Clave,Xml,Refresh,Consecutivo) VALUES ("
                .$reserva->idSucursal.","
                .$reserva->idUsuarioReserva.","
                .$reserva->idUsuarioBarbero.","
                .$reserva->idServicio. ",'"
                .$reserva->dia. "','"
                .$reserva->horaInicial. "',"
                .$reserva->estado. ",'"
                .$reserva->descripcion. "',"
                .$reserva->precioDinamico. ","
                .$reserva->duracionDinamica. ", 'R','E','"
                .$reserva->clave. "','"
                .$reserva->xml. "','"
                .$reserva->refresh. "','"
                .$reserva->consecutivo. "'"
                .")";
        $id = $db->agregar($sql);
        $reserva->id = $id;
        return $reserva;
    }
    
    
    function actualizarReserva($reserva){
        $db = new DB();
        $sql = "UPDATE reserva SET "
                . "FkIdSucursalBarberiaReserva=".$reserva->idSucursal.", "
                . "FkIdUsuarioReserva=".$reserva->idUsuarioReserva.","
                . "FkIdServicioReserva=".$reserva->idServicio.", "
                . "Dia='".$reserva->dia."', "
                . "HoraInicial='".$reserva->horaInicial."', "
                . "FkIdUsuarioBarbero=".$reserva->idUsuarioBarbero.", "
                . "Estado=".$reserva->estado.", "
                . "Descripcion='".$reserva->descripcion."', "
                . "DuracionDinamica=".$reserva->duracionDinamica.", "
                . "PrecioDinamico=".$reserva->precioDinamico.", "
                . "EstadoFactura='".$reserva->estadoFactura."', "
                . "DetalleFactura='".$reserva->detalleFactura."', "
                . "ComprobantePago='".$reserva->comprobantePago."', "
                . "Clave='".$reserva->clave."', "
                . "Consecutivo='".$reserva->consecutivo."', "
                . "Xml='".$reserva->xml."', "
                . "Refresh='".$reserva->refresh."', "
                . "TipoPago='".$reserva->tipoPago."' "
                . "WHERE PkIdReserva=".$reserva->id;
        $db->actualizar($sql);
        return $reserva;
    }

    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE reserva SET Estado=0 WHERE PkIdReserva=".$id;
        $db->actualizar($sql);   
    }    
    
    
  
    function obtenerReserva($busqueda, $busqueda2, $opcion){
        $sql = "SELECT r.PkIdReserva,r.FkIdSucursalBarberiaReserva,r.FkIdUsuarioReserva,r.FkIdUsuarioBarbero, r.FkIdServicioReserva,r.Dia,r.HoraInicial,r.Estado, r.Descripcion AS DescripcionDinamica, r.DuracionDinamica, r.PrecioDinamico,
                s.Descripcion AS Servicio, s.Duracion, s.EsDinamico, s.Precio, r.Consecutivo,r.Clave,r.Xml,r.Refresh, u.Nombre AS NombreUserReserva, u.PrimerApellido AS PrimerApellidoUserReserva, u.SegundoApellido AS SegundoApellidoUserReserva, u.Cedula AS CedulaUserReserva,  ub.Nombre AS NombreBarbero, ub.PrimerApellido AS PrimerApellidoBarbero, ub.SegundoApellido AS SegundoApellidoBarbero,
                sb.Descripcion AS Sucursal, sb.DetalleDireccion, r.EstadoFactura, r.DetalleFactura, r.ComprobantePago,r.TipoPago, ub.Cedula AS CedulaBarbero
                FROM reserva r LEFT JOIN servicio s ON s.PkIdServicio= r.FkIdServicioReserva AND s.Estado =1 AND s.FkIdUsuarioServicio=r.FkIdUsuarioBarbero
                LEFT JOIN usuarios u ON u.PkIdUsuario= r.FkIdUsuarioReserva AND u.Estado=1
                LEFT JOIN usuarios ub ON ub.PkIdUsuario= r.FkIdUsuarioBarbero AND ub.Estado=1
                JOIN sucursalbarberia sb ON sb.PkIdSucursalBarberia = r.FkIdSucursalBarberiaReserva WHERE r.Estado=1";
         if($opcion == 1){
            $sql.= " AND PkIdReserva=".$busqueda;
         } elseif ($opcion == 2) {
            $sql.= " AND FkIdSucursalBarberiaReserva=".$busqueda." ORDER BY HoraInicial";
         } elseif ($opcion == 3) {
            $sql.= " AND FkIdUsuarioReserva=".$busqueda." ORDER BY HoraInicial";
         } elseif ($opcion == 4) {
            $sql.= " AND FkIdServicioReserva=".$busqueda." ORDER BY HoraInicial";
        }elseif ($opcion == 5) {
            $sql.= " AND FkIdSucursalBarberiaReserva=".$busqueda." AND r.EstadoFactura='P' ORDER BY r.Dia desc";
        }elseif ($opcion == 6) {
            $sql.= " AND r.FkIdSucursalBarberiaReserva=".$busqueda." AND r.Dia = '".$busqueda2."' ORDER BY r.Dia desc";
        }
        $db = new DB();
        if( $opcion!=1){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }    
        $reserva= array();
        if(count($row) > 0 && $opcion!=1){            
             $reserva = $this->parseDataList($row);
        } elseif (count($row) > 0 && $opcion==1) {
             $reserva =  $this->parseRowReserva($row);              
        }
        return $reserva;
    }
    
    function obtenerReservaFecha($busqueda, $fecha){
        $sql = "SELECT r.PkIdReserva,r.FkIdSucursalBarberiaReserva,r.FkIdUsuarioReserva,r.FkIdUsuarioBarbero, r.FkIdServicioReserva,r.Dia,r.HoraInicial,r.Estado, r.Descripcion AS DescripcionDinamica, r.DuracionDinamica, r.PrecioDinamico,
                s.Descripcion AS Servicio, s.Duracion, s.EsDinamico, s.Precio, r.Consecutivo, r.Clave,r.Xml,r.Refresh, u.Nombre AS NombreUserReserva, u.PrimerApellido AS PrimerApellidoUserReserva, u.SegundoApellido AS SegundoApellidoUserReserva,  ub.Nombre AS NombreBarbero, ub.PrimerApellido AS PrimerApellidoBarbero, ub.SegundoApellido AS SegundoApellidoBarbero,
                sb.Descripcion AS Sucursal, sb.DetalleDireccion, r.EstadoFactura, r.DetalleFactura, r.ComprobantePago,r.TipoPago
                FROM reserva r LEFT JOIN servicio s ON s.PkIdServicio= r.FkIdServicioReserva AND s.Estado =1 AND s.FkIdUsuarioServicio=r.FkIdUsuarioBarbero
                LEFT JOIN usuarios u ON u.PkIdUsuario= r.FkIdUsuarioReserva AND u.Estado=1
                LEFT JOIN usuarios ub ON ub.PkIdUsuario= r.FkIdUsuarioBarbero AND ub.Estado=1
                JOIN sucursalbarberia sb ON sb.PkIdSucursalBarberia = r.FkIdSucursalBarberiaReserva WHERE r.Estado=1";
            $sql.= " AND FkIdUsuarioBarbero=".$busqueda;
            $sql.= " AND r.dia='".$fecha."' ORDER BY HoraInicial;";
//        echo $sql;
        $db = new DB();
        $row = $db->listar($sql);     
        $reserva = $this->parseDataList($row);
        return $reserva;
    }

    function obtenerReservaFechaHora($fecha, $horaInicial, $horaFinal){
        $sql = "SELECT r.PkIdReserva,r.FkIdSucursalBarberiaReserva,r.FkIdUsuarioReserva,r.FkIdUsuarioBarbero, r.FkIdServicioReserva,r.Dia,r.HoraInicial,r.Estado, r.Descripcion AS DescripcionDinamica, r.DuracionDinamica, r.PrecioDinamico,
                s.Descripcion AS Servicio, s.Duracion, s.EsDinamico, s.Precio, r.Consecutivo, r.Clave,r.Xml,r.Refresh, u.Nombre AS NombreUserReserva, u.PrimerApellido AS PrimerApellidoUserReserva, u.SegundoApellido AS SegundoApellidoUserReserva,  ub.Nombre AS NombreBarbero, ub.PrimerApellido AS PrimerApellidoBarbero, ub.SegundoApellido AS SegundoApellidoBarbero,
                sb.Descripcion AS Sucursal, sb.DetalleDireccion, r.EstadoFactura, r.DetalleFactura, r.ComprobantePago,r.TipoPago
                FROM reserva r LEFT JOIN servicio s ON s.PkIdServicio= r.FkIdServicioReserva AND s.Estado =1 AND s.FkIdUsuarioServicio=r.FkIdUsuarioBarbero
                LEFT JOIN usuarios u ON u.PkIdUsuario= r.FkIdUsuarioReserva AND u.Estado=1
                LEFT JOIN usuarios ub ON ub.PkIdUsuario= r.FkIdUsuarioBarbero AND ub.Estado=1
                JOIN sucursalbarberia sb ON sb.PkIdSucursalBarberia = r.FkIdSucursalBarberiaReserva WHERE r.Estado=1";
            $sql.= " AND r.dia='".$fecha."'";
            $sql.= " AND r.HoraInicial>='".$horaInicial."'";
            $sql.= " AND r.HoraInicial<='".$horaFinal."' ORDER BY HoraInicial;";
        $db = new DB();
        $row = $db->listar($sql);     
        $reserva = $this->parseDataList($row);
        return $reserva;
    }
    
    function obtenerReservaFechaRango($busqueda, $fechaInicial,$fechaFinal){
        $sql = "SELECT r.PkIdReserva,r.FkIdSucursalBarberiaReserva,r.FkIdUsuarioReserva,r.FkIdUsuarioBarbero, r.FkIdServicioReserva,r.Dia,r.HoraInicial,r.Estado, r.Descripcion AS DescripcionDinamica, r.DuracionDinamica, r.PrecioDinamico,
                s.Descripcion AS Servicio, s.Duracion, s.EsDinamico, s.Precio, r.Consecutivo, r.Clave,r.Xml,r.Refresh, u.Nombre AS NombreUserReserva, u.PrimerApellido AS PrimerApellidoUserReserva, u.SegundoApellido AS SegundoApellidoUserReserva,  ub.Nombre AS NombreBarbero, ub.PrimerApellido AS PrimerApellidoBarbero, ub.SegundoApellido AS SegundoApellidoBarbero,
                sb.Descripcion AS Sucursal, sb.DetalleDireccion, r.EstadoFactura, r.DetalleFactura, r.ComprobantePago,r.TipoPago
                FROM reserva r LEFT JOIN servicio s ON s.PkIdServicio= r.FkIdServicioReserva AND s.Estado =1 AND s.FkIdUsuarioServicio=r.FkIdUsuarioBarbero
                LEFT JOIN usuarios u ON u.PkIdUsuario= r.FkIdUsuarioReserva AND u.Estado=1
                LEFT JOIN usuarios ub ON ub.PkIdUsuario= r.FkIdUsuarioBarbero AND ub.Estado=1
                JOIN sucursalbarberia sb ON sb.PkIdSucursalBarberia = r.FkIdSucursalBarberiaReserva WHERE r.Estado=1";
            $sql.= " AND FkIdUsuarioBarbero=".$busqueda;
            $sql.= " AND r.dia>='".$fechaInicial."'";
            $sql.= " AND r.dia<='".$fechaFinal."' ORDER BY HoraInicial;";
//        echo $sql;
        $db = new DB();
        $row = $db->listar($sql);     
        $reserva = $this->parseDataList($row);
        return $reserva;
    }
    
    function parseRowReserva($row) {
        $reserva = new Reserva();
        if(isset($row['PkIdReserva'])){
            $reserva->id = $row['PkIdReserva'];
        }
        if(isset($row['FkIdSucursalBarberiaReserva'])){
            $reserva->idSucursal = $row['FkIdSucursalBarberiaReserva'];
        }
        if(isset($row['FkIdUsuarioReserva'])){
            $reserva->idUsuarioReserva = $row['FkIdUsuarioReserva'];
        }        
        if(isset($row['FkIdUsuarioBarbero'])){
            $reserva->idUsuarioBarbero = $row['FkIdUsuarioBarbero'];
        }
        if(isset($row['FkIdServicioReserva'])){
            $reserva->idServicio = $row['FkIdServicioReserva'];
        }
        if(isset($row['Dia'])){
            $reserva->dia = $row['Dia'];
        }
        if(isset($row['HoraInicial'])){
            $reserva->horaInicial = $row['HoraInicial'];
        }
        if(isset($row['HoraFinal'])){
            $reserva->horaFinal = $row['HoraFinal'];
        }
        if(isset($row['Estado'])){
            $reserva->estado = $row['Estado'];
        }
        if(isset($row['Servicio'])){
            $reserva->servicio = $row['Servicio'];
        }
        if(isset($row['EsDinamico'])){
            $reserva->esDinamico = $row['EsDinamico'];
        }
        if(isset($row['Sucursal'])){
            $reserva->sucursal = $row['Sucursal'];
        }
        if(isset($row['Duracion'])){
            $reserva->duracion = $row['Duracion'];
        }
        if(isset($row['Precio'])){
            $reserva->precio = $row['Precio'];
        }
        if(isset($row['NombreUserReserva'])){
            $reserva->nombreUserReserva = $row['NombreUserReserva'];
        }
        if(isset($row['PrimerApellidoUserReserva'])){
            $reserva->primerApellidoUserReserva = $row['PrimerApellidoUserReserva'];
        }
        if(isset($row['SegundoApellidoUserReserva'])){
            $reserva->segundoApellidoUserReserva = $row['SegundoApellidoUserReserva'];
        }
        if(isset($row['NombreBarbero'])){
            $reserva->nombreBarbero = $row['NombreBarbero'];
        }
        if(isset($row['PrimerApellidoBarbero'])){
            $reserva->primerApellidoBarbero = $row['PrimerApellidoBarbero'];
        }
        if(isset($row['SegundoApellidoBarbero'])){
            $reserva->segundoApellidoBarbero = $row['SegundoApellidoBarbero'];
        }
        if(isset($row['DuracionDinamica'])){
            $reserva->duracionDinamica = $row['DuracionDinamica'];
        }
        if(isset($row['PrecioDinamico'])){
            $reserva->precioDinamico = $row['PrecioDinamico'];
        }
        if(isset($row['DescripcionDinamica'])){
            $reserva->descripcion = $row['DescripcionDinamica'];
        }
        if(isset($row['DetalleDireccion'])){
            $reserva->detalleDireccion = $row['DetalleDireccion'];
        }
        if(isset($row['EstadoFactura'])){
            $reserva->estadoFactura = $row['EstadoFactura'];
        }
        if(isset($row['DetalleFactura'])){
            $reserva->detalleFactura = $row['DetalleFactura'];
        }
        if(isset($row['ComprobantePago'])){
            $reserva->comprobantePago = $row['ComprobantePago'];
        }
        if(isset($row['TipoPago'])){
            $reserva->tipoPago = $row['TipoPago'];
        }
        if(isset($row['Consecutivo'])){
            $reserva->consecutivo = $row['Consecutivo'];
        }
        if(isset($row['Clave'])){
            $reserva->clave = $row['Clave'];
        }
        if(isset($row['Xml'])){
            $reserva->xml = $row['Xml'];
        }
        if(isset($row['Refresh'])){
            $reserva->refresh = $row['Refresh'];
        }
        return $reserva;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowReserva($row));
        }
        return $parseDatos;
    }
    
    
    
    
}
