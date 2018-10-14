<?php

class Factura {

    public $fecha ='';    
    public $id =0;
    public $estado=0;
    public $idCliente=0;
    public $idCreadoPor=0;
    public $idSucursal=0;
    public $monto=0;
    public $impuesto=0;
    public $descuento=0;
    public $cantidad=0;
    public $moneda=0;
    public $detalle='';
    public $codigo='';
    public $tipoTransaccion='';
    public $detalleFactura = array();
    
    function getFecha() {
        return $this->fecha;
    }        
    
    function getIdCliente() {
        return $this->idCliente;
    }

    function getId() {
        return $this->id;
    }

    function getEstado() {
        return $this->estado;
    }

    function getIdCreadoPor() {
        return $this->idCreadoPor;
    }

    function getIdSucursal() {
        return $this->idSucursal;
    }

    function getMonto() {
        return $this->monto;
    }

    function getImpuesto() {
        return $this->impuesto;
    }

    function getDescuento() {
        return $this->descuento;
    }

    function getCantidad() {
        return $this->cantidad;
    }

    function getCodigo() {
        return $this->codigo;
    }

    function getMoneda() {
        return $this->moneda;
    }

    function getDetalle() {
        return $this->detalle;
    }

    function getTipoTransaccion() {
        return $this-> tipoTransaccion;
    }

    function getDetalleFactura(){
        return $this->detalleFactura;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setIdCliente($idCliente) {
        $this->idCliente = $idCliente;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setIdSucursal($idSucursal) {
        $this->idSucursal = $idSucursal;
    }

    function setIdCreadoPor($idCreadoPor) {
        $this->idCreadoPor = $idCreadoPor;
    }

     function setMonto($monto) {
        $this->monto = $monto;
    }

     function setImpuesto($impuesto) {
        $this->impuesto = $impuesto;
    }

     function setDescuento($descuento) {
        $this->descuento = $descuento;
    }

     function setMoneda($moneda) {
        $this-> moneda = $moneda;
    }

     function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

     function setDetalle($detalle) {
        $this->detalle = $detalle;
    }

    function setTipoTransaccion($tipoTransaccion) {
        $this->tipoTransaccion = $tipoTransaccion;
    }
    
    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    function setDetalleFactura($detalleFactura) {
        $this->detalleFactura = $detalleFactura;
    }


 function parseDto($factura) {
        if(isset($factura->id)){
            $this->id = $factura->id;
        }
        if(isset($factura->estado)){
            $this->estado = $factura->estado;
        }
        if(isset($factura->idSucursal)){
            $this->idSucursal = $factura->idSucursal;
        }
        if(isset($factura->idCreadoPor)){
            $this->idCreadoPor = $factura->idCreadoPor;
        }
        if(isset($factura->idCliente)){
            $this->idCliente = $factura->idCliente;
        }
         if(isset($factura->moneda)){
            $this->moneda = $factura->moneda;
        }
        if(isset($factura->monto)){
            $this->monto = $factura->monto;
        }
        if(isset($factura->descuento)){
            $this->descuento = $factura->descuento;
        }
        if(isset($factura->impuesto)){
            $this->impuesto = $factura->impuesto;
        }
        if(isset($factura->detalle)){
            $this->detalle = $factura->detalle;
        }
        if(isset($factura->tipoTransaccion)){
            $this->tipoTransaccion = $factura->tipoTransaccion;
        }

        if(isset($factura->cantidad)){
            $this->cantidad = $factura->cantidad;
        }
    }
    
 


    function toJson() {
        $data = array(
        'factura' => array(
            'fecha' => $this->fecha,
            'id'=>$this->id,
            'estado'=> $this->estado,
            'idCliente'=> $this->idCliente,
            'idCreadoPor'=> $this->idCreadoPor,
            'idSucursal'=> $this->idSucursal,
            'monto'=> $this->monto,
            'impuesto'=> $this->impuesto,
            'descuento'=> $this->descuento,
            'cantidad'=>$this->cantidad,
            'moneda'=>$this->moneda,
            'detalle'=>$this->detalle,
            'codigo'=>$this->codigo,
            'tipoTransaccion'=>$this->tipoTransaccion,
            'detalleFactura'=>$this->detalleFactura
            )
        );
        return json_encode($data);
    }
    
    function AgregarDetalleFactura($detalleFact){
        array_push($this->detalleFactura, $detalleFact);
    }
}
