<?php

class DetalleFactura {
    public $id = 0;
    public $idFactura = 0;
    public $idServicio = 0;
    public $producto = '';
    public $codigo = '';
    public $precio = 0;
    public $cantidad = 0;
    public $impuesto = 0;
    public $total = 0;
    public $descuento = 0;
    public $tipoDescuento = '';
    public $razonDescuento = '';
    public $unidad = '';
    public $detalleFactura = array();
            
    function getProducto() {
        return $this->producto;
    }
    function getId() {
        return $this->id;
    }
    function getIdFactura() {
        return $this->idFactura;
    }
    function getIdServicio() {
        return $this->idServicio;
    }
    function getCodigo() {
        return $this->codigo;
    }
    function getPrecio() {
        return $this->precio;
    }
    function getCantidad() {
        return $this->cantidad;
    }
    function getImpuesto() {
        return $this->impuesto;
    }
    function getDescuento() {
        return $this->descuento;
    }
    function getTotal() {
        return $this->total;
    }   
    function getTipoDescuento() {
        return $this->tipoDescuento;
    }
    function getRazonDescuento() {
        return $this->razonDescuento;
    }
    function getUnidad() {
        return $this->unidad;
    }
    function getDetalleFactura() {
        return $this->detalleFactura;
    }

    function setProducto($producto) {
        $this->producto = $producto;
    }
    function setId($id) {
        $this->id = $id;
    }
    function setIdServicio($idServicio) {
        $this->idServicio = $idServicio;
    }   
    function setIdFactura($idFactura) {
        $this->idFactura = $idFactura;
    }   
    function setCodigo($codigo) {
        $this->codigo = $codigo;
    }
    function setPrecio($precio) {
        $this->precio = $precio;
    }
    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }
    function setImpuesto($impuesto) {
        $this->impuesto = $impuesto;
    }
    function setDescuento($descuento) {
        $this->descuento = $descuento;
    }
    function setTotal($total) {
        $this->total = $total;
    }
    function setTipoDescuento($tipoDescuento) {
        $this->tipoDescuento = $tipoDescuento;
    }
    function setRazonDescuento($razonDescuento) {
        $this->razonDescuento = $razonDescuento;
    }
    function setUnidad($unidad) {
        $this->unidad = $unidad;
    }

   function setDetalleFactura($detalleFactura) {
        $this->detalleFactura = $detalleFactura;
    }

    function parseDto($detalleFactura) {
        if(isset($detalleFactura->id)){
            $this->id = $detalleFactura->id;
        }
        if(isset($detalleFactura->idServicio)){
            $this->idServicio = $detalleFactura->idServicio;
        }
        if(isset($detalleFactura->producto)){
            $this->producto = $detalleFactura->producto;
        }
        if(isset($detalleFactura->idFactura)){
            $this->idFactura = $detalleFactura->idFactura;
        }
        if(isset($detalleFactura->codigo)){
            $this->codigo = $detalleFactura->codigo;
        }
        if(isset($detalleFactura->precio)){
            $this->precio = $detalleFactura->precio;
        }
        if(isset($detalleFactura->cantidad)){
            $this->cantidad = $detalleFactura->cantidad;
        }
        if(isset($detalleFactura->impuesto)){
            $this->impuesto = $detalleFactura->impuesto;
        }
        if(isset($detalleFactura->descuento)){
            $this->descuento = $detalleFactura->descuento;
        }
        if(isset($detalleFactura->total)){
            $this->total = $detalleFactura->total;
        }
        if(isset($detalleFactura->tipoDescuento)){
            $this->tipoDescuento = $detalleFactura->tipoDescuento;
        }
        if(isset($detalleFactura->razonDescuento)){
            $this->razonDescuento = $detalleFactura->razonDescuento;
        }
        if(isset($detalleFactura->unidad)){
            $this->unidad = $detalleFactura->unidad;
        }
    }

    function AgregarDetalleFactura($detalle){
        array_push($this->detalleFactura, $detalle);
    }
    
     function toJson() {
        $data = array(
        'facturaProductos' => array(
            'producto' => $this->producto,
            'id'=>$this->id,
            'idFactura'=> $this->idFactura,
            'idServicio'=> $this->idServicio,
            'precio'=> $this->precio,
            'codigo'=> $this->codigo,
            'cantidad'=> $this->cantidad,
            'idFactura'=> $this->idFactura,
            'impuesto'=> $this->impuesto,
            'descuento'=> $this->descuento,
            'total'=> $this->total,
            'tipoDescuento'=> $this->tipoDescuento,
            'razonDescuento'=> $this->razonDescuento,
            'unidad'=> $this->unidad,
            'detalleFactura'=> $this->detalleFactura,

            )
        );
        return json_encode($data);
    }
}