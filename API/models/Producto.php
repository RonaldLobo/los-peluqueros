<?php

class Producto {

    public $codigo ='';    
    public $marca ='';  
    public $id =0;
    public $estado=0;
    public $idProveedor=0;
    public $nombre;
    
    function getNombre() {
        return $this->nombre;
    }        
    
    function getCodigo() {
        return $this->codigo;
    }

    function getId() {
        return $this->id;
    }

    function getEstado() {
        return $this->estado;
    }

    function getIdProveedor() {
        return $this->idProveedor;
    }

    function getMarca() {
        return $this->marca;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setIdProveedor($idProveedor) {
        $this->idProveedor = $idProveedor;
    }

    function setMarca($marca) {
        $this->marca = $marca;
    }


 function parseDto($producto) {
        if(isset($producto->id)){
            $this->id = $producto->id;
        }
        if(isset($producto->estado)){
            $this->estado = $producto->estado;
        }
        if(isset($producto->idProveedor)){
            $this->idProveedor = $producto->idProveedor;
        }
        if(isset($producto->codigo)){
            $this->codigo = $producto->codigo;
        }
        if(isset($producto->nombre)){
            $this->nombre = $producto->nombre;
        }
        if(isset($producto->marca)){
            $this->marca = $producto->marca;
        }
    }
    
}
