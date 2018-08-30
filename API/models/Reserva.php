<?php


class Reserva {
    
    public $id=0;
    public $idSucursal=0;
    public $idUsuarioReserva=0;
    public $idUsuarioBarbero=0;
    public $idServicio=0;
    public $dia="";
    public $horaInicial="";
    public $estado="";
    public $sucursal="";
    public $servicio="";
    public $duracion=0;
    public $precio=0;
    public $nombreUserReserva="";
    public $primerApellidoUserReserva=""; 
    public $segundoApellidoUserReserva="";    
    public $nombreBarbero="";
    public $telefonoBarbero="";
    public $primerApellidoBarbero="";
    public $segundoApellidoBarbero=""; 
    public $descripcion="";
    public $precioDinamico=0;
    public $duracionDinamica=0;
    public $esDinamico=false;
    public $detalleDireccion="";
    public $estadoFactura="";
    public $detalleFactura="";
    public $comprobantePago="";
    public $tipoPago ="";
    public $clave ="";
    public $consecutivo ="";
    
    function getId() {
        return $this->id;
    }

    function getIdSucursal() {
        return $this->idSucursal;
    }

    function getIdUsuarioReserva() {
        return $this->idUsuarioReserva;
    }

    function getIdUsuarioBarbero() {
        return $this->idUsuarioBarbero;
    }

    function getIdServicio() {
        return $this->idServicio;
    }

    function getDia() {
        return $this->dia;
    }

    function getHoraInicial() {
        return $this->horaInicial;
    }

    function getEstado() {
        return $this->estado;
    }

    function getServicio() {
        return $this->servicio;
    }

    function getDuracion() {
        return $this->duracion;
    }

    function getPrecio() {
        return $this->precio;
    }

    function getNombreUserReserva() {
        return $this->nombreUserReserva;
    }

    function getPrimerApellidoUserReserva() {
        return $this->primerApellidoUserReserva;
    }

    function getSegundoApellidoUserReserva() {
        return $this->segundoApellidoUserReserva;
    }

    function getNombreBarbero() {
        return $this->nombreBarbero;
    }

    function getTelefonoBarbero() {
        return $this->telefonoBarbero;
    }

    function getPrimerApellidoBarbero() {
        return $this->primerApellidoBarbero;
    }

    function getSegundoApellidoBarbero() {
        return $this->segundoApellidoBarbero;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getPrecioDinamico() {
        return $this->precioDinamico;
    }

    function getDuracionDinamica() {
        return $this->duracionDinamica;
    }

    function getDetalleFactura(){
         return $this->detalleFactura;
    }
    function getComprobantePago(){
         return $this->comprobantePago;
    }
    function getTipoPago(){
         return $this->tipoPago;
    }
    
    function getEstadoFactura(){
         return $this->estadoFactura;
    }

    function getClave(){
         return $this->clave;
    }

    function getConsecutivo(){
         return $this->consecutivo;
    }

    function setConsecutivo($consecutivo) {
        $this->consecutivo = $consecutivo;
    }

    function setClave($clave) {
        $this->clave = $clave;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setIdSucursal($idSucursal) {
        $this->idSucursal = $idSucursal;
    }

    function setIdUsuarioReserva($idUsuarioReserva) {
        $this->idUsuarioReserva = $idUsuarioReserva;
    }

    function setIdUsuarioBarbero($idUsuarioBarbero) {
        $this->idUsuarioBarbero = $idUsuarioBarbero;
    }

    function setIdServicio($idServicio) {
        $this->idServicio = $idServicio;
    }

    function setDia($dia) {
        $this->dia = $dia;
    }

    function setHoraInicial($horaInicial) {
        $this->horaInicial = $horaInicial;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setServicio($servicio) {
        $this->servicio = $servicio;
    }

    function setDuracion($duracion) {
        $this->duracion = $duracion;
    }

    function setPrecio($precio) {
        $this->precio = $precio;
    }

    function setNombreUserReserva($nombreUserReserva) {
        $this->nombreUserReserva = $nombreUserReserva;
    }

    function setPrimerApellidoUserReserva($primerApellidoUserReserva) {
        $this->primerApellidoUserReserva = $primerApellidoUserReserva;
    }

    function setSegundoApellidoUserReserva($segundoApellidoUserReserva) {
        $this->segundoApellidoUserReserva = $segundoApellidoUserReserva;
    }

    function setNombreBarbero($nombreBarbero) {
        $this->nombreBarbero = $nombreBarbero;
    }

    function setTelefonoBarbero($telefonoBarbero) {
        $this->telefonoBarbero = $telefonoBarbero;
    }

    function setPrimerApellidoBarbero($primerApellidoBarbero) {
        $this->primerApellidoBarbero = $primerApellidoBarbero;
    }

    function setSegundoApellidoBarbero($segundoApellidoBarbero) {
        $this->segundoApellidoBarbero = $segundoApellidoBarbero;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setPrecioDinamico($precioDinamico) {
        $this->precioDinamico = $precioDinamico;
    }

    function setDuracionDinamica($duracionDinamica) {
        $this->duracionDinamica = $duracionDinamica;
    }

    function getSucursal() {
        return $this->sucursal;
    }

    function setSucursal($sucursal) {
        $this->sucursal = $sucursal;
    }        

    function getEsDinamico() {
        return $this->esDinamico;
    }
    
    function setEsDinamico($esDinamico) {
        $this->esDinamico = $esDinamico;
    }

    function getDetalleDireccion() {
        return $this->detalleDireccion;
    }
    
    function setDetalleDireccion($detalleDireccion) {
        $this->detalleDireccion = $detalleDireccion;
    }

    function setEstadoFactura($estadoFactura) {
        $this->estadoFactura = $estadoFactura;
    }

    function setDetalleFactura($detalleFactura) {
        $this->detalleFactura = $detalleFactura;
    }

    function setComprobantePago($comprobantePago) {
        $this->comprobantePago = $comprobantePago;
    }

    function setTipoPago($tipoPago) {
        $this->tipoPago = $tipoPago;
    }
    
    
       
    function parseDto($reserva) {
        if(isset($reserva->idSucursal)){
            $this->idSucursal = $reserva->idSucursal;
        }
        if(isset($reserva->id)){
            $this->id = $reserva->id;
        }
        if(isset($reserva->estado)){
            $this->estado = $reserva->estado;
        }
        if(isset($reserva->idUsuarioReserva)){
            $this->idUsuarioReserva = $reserva->idUsuarioReserva;
        }     
        if(isset($reserva->idUsuarioBarbero)){
            $this->idUsuarioBarbero = $reserva->idUsuarioBarbero;
        }
        if(isset($reserva->horaInicial)){
            $this->horaInicial = $reserva->horaInicial;
        }
        if(isset($reserva->dia)){
            $this->dia = $reserva->dia;
        }
        if(isset($reserva->idServicio)){
            $this->idServicio = $reserva->idServicio;
        }  
        if(isset($reserva->servicio)){
            $this->servicio = $reserva->servicio;
        }
        if(isset($reserva->duracion)){
            $this->duracion = $reserva->duracion;
        }
        if(isset($reserva->precio)){
            $this->precio = $reserva->precio;
        }
        if(isset($reserva->sucursal)){
            $this->sucursal = $reserva->sucursal;
        }
        if(isset($reserva->nombreUserReserva)){
            $this->nombreUserReserva = $reserva->nombreUserReserva;
        }
        if(isset($reserva->primerApellidoUserReserva)){
            $this->primerApellidoUserReserva = $reserva->primerApellidoUserReserva;
        }
        if(isset($reserva->segundoApellidoUserReserva)){
            $this->segundoApellidoUserReserva = $reserva->segundoApellidoUserReserva;
        }
        if(isset($reserva->primerApellidoUserReserva)){
            $this->primerApellidoUserReserva = $reserva->primerApellidoUserReserva;
        }
        if(isset($reserva->nombreBarbero)){
            $this->nombreBarbero = $reserva->nombreBarbero;
        }
        if(isset($reserva->telefonoBarbero)){
            $this->telefonoBarbero = $reserva->telefonoBarbero;
        }
        if(isset($reserva->primerApellidoBarbero)){
            $this->primerApellidoBarbero = $reserva->primerApellidoBarbero;
        }
        if(isset($reserva->segundoApellidoBarbero)){
            $this->segundoApellidoBarbero = $reserva->segundoApellidoBarbero;
        }
        if(isset($reserva->descripcion)){
            $this->descripcion = $reserva->descripcion;
        }
        if(isset($reserva->precioDinamico)){
            $this->precioDinamico = $reserva->precioDinamico;
        }
        if(isset($reserva->duracionDinamica)){
            $this->duracionDinamica = $reserva->duracionDinamica;
        }
        if(isset($reserva->esDinamico)){
            $this->esDinamico = $reserva->esDinamico;
        }
        if(isset($reserva->detalleDireccion)){
            $this->detalleDireccion = $reserva->detalleDireccion;
        }
        if(isset($reserva->estadoFactura)){
            $this->estadoFactura = $reserva->estadoFactura;
        }
        if(isset($reserva->detalleFactura)){
            $this->detalleFactura = $reserva->detalleFactura;
        }
        if(isset($reserva->comprobantePago)){
            $this->comprobantePago = $reserva->comprobantePago;
        }
        if(isset($reserva->tipoPago)){
            $this->tipoPago = $reserva->tipoPago;
        }
        if(isset($reserva->consecutivo)){
            $this->consecutivo = $reserva->consecutivo;
        }
        if(isset($reserva->clave)){
            $this->clave = $reserva->clave;
        }
    }
    
     function toJson() {
        $data = array(
        'reserva' => array(
            'idSucursal' => $this->idSucursal,
            'id'=>$this->id,
            'idUsuarioReserva'=> $this->idUsuarioReserva,
            'idUsuarioBarbero'=> $this->idUsuarioBarbero,
            'horaInicial'=> $this->horaInicial,
            'estado'=> $this->estado,
            'sucursal'=> $this->sucursal,
            'dia'=> $this->dia,
            'idServicio'=> $this->idServicio,
            'servicio'=>$this->servicio,
            'duracion'=> $this->duracion,
            'precio'=> $this->precio,
            'nombreUserReserva'=> $this->nombreUserReserva,
            'primerApellidoUserReserva'=> $this->primerApellidoUserReserva,
            'segundoApellidoUserReserva'=> $this->segundoApellidoUserReserva,
            'nombreBarbero'=> $this->nombreBarbero,
            'telefonoBarbero'=> $this->telefonoBarbero,
            'primerApellidoBarbero'=> $this->primerApellidoBarbero,
            'segundoApellidoBarbero'=> $this->segundoApellidoBarbero,
            'descripcion'=> $this->descripcion,
            'precioDinamico'=> $this->precioDinamico,
            'duracionDinamica'=> $this->duracionDinamica,
            'detalleDireccion'=> $this->detalleDireccion,
            'esDinamico'=> $this->esDinamico,
            'estadoFactura'=> $this->estadoFactura,
            'detalleFactura'=> $this->detalleFactura,
            'comprobantePago'=> $this->comprobantePago,
            'tipoPago'=> $this->tipoPago,
            'consecutivo'=> $this->consecutivo,
            'clave'=> $this->clave
            )
        );
        return json_encode($data);
    }
}
