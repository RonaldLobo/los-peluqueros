<?php

class Factura {

    public $fecha ='';    
    public $id =0;
    public $estado='';
    public $idCliente = null;
    public $idCreadoPor=0;
    public $idSucursal=0;
    public $total=0;
    public $totalImpuesto=0;
    public $totalDescuento=0;
    public $totalNeto=0;
    public $cantidad=0;
    public $moneda=0;
    public $detalle='';
    public $codigo='';
    public $tipoTransaccion='';
    public $numComprobante='';
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

    function getTotal() {
        return $this->total;
    }

    function getTotalImpuesto() {
        return $this->totalImpuesto;
    }

    function getTotalDescuento() {
        return $this->totalDescuento;
    }

    function getTotalNeto() {
        return $this->totalNeto;
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

    function getNumComprobante(){
        return $this->numComprobante;
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

     function setTotal($total) {
        $this->total = $total;
    }

    function setTotalImpuesto($totalImpuesto) {
        $this->totalImpuesto = $totalImpuesto;
    }

    function setTotalDescuento($totalDescuento) {
        $this->totalDescuento = $totalDescuento;
    }

    function setTotalNeto($totalNeto) {
        $this->totalNeto = $totalNeto;
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

    function setNumComprobante($numComprobante) {
        $this->numComprobante = $numComprobante;
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
        if(isset($factura->total)){
            $this->total = $factura->total;
        }
        if(isset($factura->totalDescuento)){
            $this->totalDescuento = $factura->totalDescuento;
        }
        if(isset($factura->totalImpuesto)){
            $this->totalImpuesto = $factura->totalImpuesto;
        }
        if(isset($factura->totalNeto)){
            $this->totalNeto = $factura->totalNeto;
        }
        if(isset($factura->detalle)){
            $this->detalle = $factura->detalle;
        }
        if(isset($factura->tipoTransaccion)){
            $this->tipoTransaccion = $factura->tipoTransaccion;
        }
        if(isset($factura->codigo)){
            $this->codigo = $factura->codigo;
        }
        if(isset($factura->numComprobante)){
            $this->numComprobante = $factura->numComprobante;
        }     
        if(isset($factura->fecha)){
            $this->fecha = $factura->fecha;
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
            'total'=> $this->total,
            'totalImpuesto'=> $this->totalImpuesto,
            'totalDescuento'=> $this->totalDescuento,
            'totalNeto'=> $this->totalNeto,
            'cantidad'=>$this->cantidad,
            'moneda'=>$this->moneda,
            'detalle'=>$this->detalle,
            'codigo'=>$this->codigo,
            'tipoTransaccion'=>$this->tipoTransaccion,
            'detalleFactura'=>$this->detalleFactura,
            'numComprobante'=>$this->numComprobante
            )
        );
        return json_encode($data);
    }
    
    function AgregarDetalleFactura($detalleFact){
        array_push($this->detalleFactura, $detalleFact);
    }
}
