<?php


class Inventario {

    public $id=0;
    public $idSurcursal =0;
    public $codigo="";
    public $producto="";
    public $marca=""; 
    public $descripcion="";
    public $cantDisponible=0; 
    public $cantMinima=0; 
    public $precio=0; 
    public $costo=0; 
    public $descuento=0; 
    public $impuesto=0;
    public $utilidad=0; 
    public $proveedor=""; 
    public $categoria=0; 
    public $modelo="";
    public $estado=0;  
    
    function getId() {
        return $this->id;
    }

    function getIdSucursal() {
        return $this->idSucursal;
    }

    function getCodigo() {
        return $this->codigo;
    } 

    function getDescripcion() {
        return $this->descripcion;
    }

    function getProducto() {
        return $this->producto;
    }

    function getMarca() {
        return $this->marca;
    }

    function getCantDisponible() {
        return $this->cantDisponible;
    }

    function getCantMinima() {
        return $this->cantMinima;
    }

    function getPrecio() {
        return $this->precio;
    }

    function getCosto() {
        return $this->costo;
    }

    function getDescuento() {
        return $this->descuento;
    }

    function getImpuesto() {
        return $this->impuesto;
    }

    function getUtilidad() {
        return $this->utilidad;
    }

    function getProveedor() {
        return $this->proveedor;
    }

    function getCategoria() {
        return $this->categoria;
    }

    function getModelo() {
        return $this->modelo;
    }

    function getEstado() {
        return $this->estado;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setIdSucursal($idSucursal) {
        $this->idSucursal = $idSucursal;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setProducto($producto) {
        $this->producto = $producto;
    }

    function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

    function setMarca($marca) {
        $this->marca = $marca;
    }

    function setModelo($modelo) {
        $this->modelo = $modelo;
    }

    function setProveedor($proveedor) {
        $this->proveedor = $proveedor;
    }

    function setCantMinima($cantMinima) {
        $this->cantMinima = $cantMinima;
    }

    function setCantDisponible($cantDisponible) {
        $this->cantDisponible = $cantDisponible;
    }

    function setPrecio($precio) {
        $this->precio = $precio;
    }

    function setImpuesto($impuesto) {
        $this->impuesto = $impuesto;
    }

    function setCosto($costo) {
        $this->costo = $costo;
    }

    function setUtilidad($utilidad) {
        $this->utilidad = $utilidad;
    }

    function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }


    function parseDto($inventario) {
            if(isset($inventario->idSucursal)){
                $this->idSucursal = $inventario->idSucursal;
            }
            if(isset($inventario->id)){
                $this->id = $inventario->id;
            }
            if(isset($inventario->descripcion)){
                $this->descripcion = $inventario->descripcion;
            }
            if(isset($inventario->producto)){
                $this->producto = $inventario->producto;
            }
            if(isset($inventario->codigo)){
                $this->codigo = $inventario->codigo;
            }
            if(isset($inventario->proveedor)){
                $this->proveedor = $inventario->proveedor;
            }
            if(isset($inventario->marca)){
                $this->marca = $inventario->marca;
            }
            if(isset($inventario->cantDisponible)){
                $this->cantDisponible = $inventario->cantDisponible;
            }
            if(isset($inventario->cantMinima)){
                $this->cantMinima = $inventario->cantMinima;
            }
            if(isset($inventario->precio)){
                $this->precio = $inventario->precio;
            }
            if(isset($inventario->costo)){
                $this->costo = $inventario->costo;
            }
            if(isset($inventario->modelo)){
                $this->modelo = $inventario->modelo;
            }
            if(isset($inventario->categoria)){
                $this->categoria = $inventario->categoria;
            }
            if(isset($inventario->utilidad)){
                $this->utilidad = $inventario->utilidad;
            }
            if(isset($inventario->impuesto)){
                $this->impuesto = $inventario->impuesto;
            }
            if(isset($inventario->estado)){
                $this->estado = $inventario->estado;
            }
            if(isset($inventario->ubicacion)){
                $this->ubicacion = $inventario->ubicacion;
            }
            
    }
    
    
     function toJson() {
        $data = array(
        'inventario' => array(
            'idSucursal' => $this->idSucursal,
            'id'=>$this->id,
            'producto'=>$this->producto,
            'ubicacion'=>$this->ubicacion,
            'descripcion'=> $this->descripcion,       
            'codigo' => $this->codigo,
            'marca'=>$this->marca,
            'modelo'=> $this->modelo,  
            'utilidad' => $this->utilidad,
            'proveedor'=>$this->proveedor,
            'costo'=> $this->costo,  
            'precio' => $this->precio,
            'impuesto'=>$this->impuesto,
            'categoria'=> $this->categoria,
            'cantDisponible' => $this->cantDisponible,
            'cantMinima'=>$this->cantMinima,   
            'estado'=> $this->estado
            )
        );
        return json_encode($data);
    }
    
}
