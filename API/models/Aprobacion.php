<?php

class Aprobacion {

    public $pkIdAprobacion ='';  
    public $detalle_mensaje ='';    
    public $mensaje ='';  
    public $fecha_emision_doc = '';
    public $monto_total_impuesto = '';
    public $numero_cedula_emisor = '';
    public $numero_cedula_receptor = '';
    public $tipo_cedula_emisor = '';
    public $tipo_cedula_receptor = '';
    public $total_factura = '';
    public $FkIdSucursalBarberiaAprobacion = '';
    public $claveAprobacion = '';
    public $clave = '';
    public $estado = '';
    public $nombre_emisor = '';

    function setPkIdAprobacion($pkIdAprobacion) { $this->pkIdAprobacion = $pkIdAprobacion; }
    function getPkIdAprobacion() { return $this->pkIdAprobacion; }
    function setDetalle_mensaje($detalle_mensaje) { $this->detalle_mensaje = $detalle_mensaje; }
    function getDetalle_mensaje() { return $this->detalle_mensaje; }
    function setMensaje($mensaje) { $this->mensaje = $mensaje; }
    function getMensaje() { return $this->mensaje; }
    function setFecha_emision_doc($fecha_emision_doc) { $this->fecha_emision_doc = $fecha_emision_doc; }
    function getFecha_emision_doc() { return $this->fecha_emision_doc; }
    function setMonto_total_impuesto($monto_total_impuesto) { $this->monto_total_impuesto = $monto_total_impuesto; }
    function getMonto_total_impuesto() { return $this->monto_total_impuesto; }
    function setNumero_cedula_emisor($numero_cedula_emisor) { $this->numero_cedula_emisor = $numero_cedula_emisor; }
    function getNumero_cedula_emisor() { return $this->numero_cedula_emisor; }
    function setNumero_cedula_receptor($numero_cedula_receptor) { $this->numero_cedula_receptor = $numero_cedula_receptor; }
    function getNumero_cedula_receptor() { return $this->numero_cedula_receptor; }
    function setTipo_cedula_emisor($tipo_cedula_emisor) { $this->tipo_cedula_emisor = $tipo_cedula_emisor; }
    function getTipo_cedula_emisor() { return $this->tipo_cedula_emisor; }
    function setTipo_cedula_receptor($tipo_cedula_receptor) { $this->tipo_cedula_receptor = $tipo_cedula_receptor; }
    function getTipo_cedula_receptor() { return $this->tipo_cedula_receptor; }
    function setTotal_factura($total_factura) { $this->total_factura = $total_factura; }
    function getTotal_factura() { return $this->total_factura; }
    function setFkIdSucursalBarberiaAprobacion($FkIdSucursalBarberiaAprobacion) { $this->FkIdSucursalBarberiaAprobacion = $FkIdSucursalBarberiaAprobacion; }
    function getFkIdSucursalBarberiaAprobacion() { return $this->FkIdSucursalBarberiaAprobacion; }
    function setClaveAprobacion($claveAprobacion) { $this->claveAprobacion = $claveAprobacion; }
    function getClaveAprobacion() { return $this->claveAprobacion; }
    function setEstado($estado) { $this->estado = $estado; }
    function getEstado() { return $this->estado; }
    function setNombre_emisor($nombre_emisor) { $this->nombre_emisor = $nombre_emisor; }
    function getNombre_emisor() { return $this->nombre_emisor; }

    function setClave($clave) { $this->clave = $clave; }
    function getClave() { return $this->clave; }

    
    



    function parseDto($aprobacion) {
        if(isset($aprobacion->pkIdAprobacion)){
            $this->pkIdAprobacion = $aprobacion->pkIdAprobacion;
        }
        if(isset($aprobacion->detalle_mensaje)){
            $this->detalle_mensaje = $aprobacion->detalle_mensaje;
        }
        if(isset($aprobacion->mensaje)){
            $this->mensaje = $aprobacion->mensaje;
        }
        if(isset($aprobacion->fecha_emision_doc)){
            $this->fecha_emision_doc = $aprobacion->fecha_emision_doc;
        }
        if(isset($aprobacion->monto_total_impuesto)){
            $this->monto_total_impuesto = $aprobacion->monto_total_impuesto;
        }
        if(isset($aprobacion->monto_total_impuesto)){
            $this->monto_total_impuesto = $aprobacion->monto_total_impuesto;
        }
        if(isset($aprobacion->numero_cedula_emisor)){
            $this->numero_cedula_emisor = $aprobacion->numero_cedula_emisor;
        }
        if(isset($aprobacion->numero_cedula_receptor)){
            $this->numero_cedula_receptor = $aprobacion->numero_cedula_receptor;
        }
        if(isset($aprobacion->tipo_cedula_emisor)){
            $this->tipo_cedula_emisor = $aprobacion->tipo_cedula_emisor;
        }
        if(isset($aprobacion->tipo_cedula_receptor)){
            $this->tipo_cedula_receptor = $aprobacion->tipo_cedula_receptor;
        }
        if(isset($aprobacion->total_factura)){
            $this->total_factura = $aprobacion->total_factura;
        }
        if(isset($aprobacion->FkIdSucursalBarberiaAprobacion)){
            $this->FkIdSucursalBarberiaAprobacion = $aprobacion->FkIdSucursalBarberiaAprobacion;
        }
        if(isset($aprobacion->claveAprobacion)){
            $this->claveAprobacion = $aprobacion->claveAprobacion;
        }
        if(isset($aprobacion->estado)){
            $this->estado = $aprobacion->estado;
        }
        if(isset($aprobacion->clave)){
            $this->clave = $aprobacion->clave;
        }
        if(isset($aprobacion->nombre_emisor)){
            $this->nombre_emisor = $aprobacion->nombre_emisor;
        }
    }
    
}
