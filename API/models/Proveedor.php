<?php

class Proveedor {

    public $correo ='';    
    public $id =0;
    public $estado=0;
    public $telefono=0;
    public $nombre;
    
    function getNombre() {
        return $this->nombre;
    }        
    
    function getCorreo() {
        return $this->correo;
    }

    function getId() {
        return $this->id;
    }

    function getEstado() {
        return $this->estado;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setCorreo($correo) {
        $this->correo = $correo;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }


 function parseDto($proveedor) {
        if(isset($proveedor->id)){
            $this->id = $proveedor->id;
        }
        if(isset($proveedor->estado)){
            $this->estado = $proveedor->estado;
        }
        if(isset($proveedor->telefono)){
            $this->telefono = $proveedor->telefono;
        }
        if(isset($proveedor->correo)){
            $this->correo = $proveedor->correo;
        }
        if(isset($proveedor->nombre)){
            $this->nombre = $proveedor->nombre;
        }
    }
    
}
