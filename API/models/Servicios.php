<?php

class Servicios {
    public $id=0;
    public $idUsuario=0;
    public $descripcion="";
    public $duracion=0;
    public $estado="";
    public $esDinamico=false;
    public $precio=0;
    
    function getId() {
        return $this->id;
    }

    function getIdSucursal() {
        return $this->idUsuario;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getDuracion() {
        return $this->duracion;
    }

    function getEstado() {
        return $this->estado;
    }
    function getPrecio() {
        return $this->precio;
    }

    function getEsDinamico() {
        return $this->esDinamico;
    }
    
    function setEsDinamico($esDinamico) {
        $this->esDinamico = $esDinamico;
    }
    
    function setId($id) {
        $this->id = $id;
    }

    function setIdSucursal($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setDuracion($duracion) {
        $this->duracion = $duracion;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }
    function setPrecio($precio) {
        $this->precio = $precio;
    }
    function parseDto($servicios) {
        if(isset($servicios->idUsuario)){
            $this->idUsuario = $servicios->idUsuario;
        }
        if(isset($servicios->id)){
            $this->id = $servicios->id;
        }
        if(isset($servicios->estado)){
            $this->estado = $servicios->estado;
        }
        if(isset($servicios->descripcion)){
            $this->descripcion = $servicios->descripcion;
        }
        if(isset($servicios->duracion)){
            $this->duracion = $servicios->duracion;
        }
        if(isset($servicios->precio)){
            $this->precio = $servicios->precio;
        }
        if(isset($servicios->esDinamico) || $servicios->esDinamico == false){
            $this->esDinamico = $servicios->esDinamico;
        }
    }
  
     function toJson() {
        $data = array(
        'servicio' => array(
            'idUsuario' => $this->idUsuario,
            'id'=>$this->id,
            'descripcion'=> $this->descripcion,
            'duracion'=> $this->duracion,
            'estado'=> $this->estado,
            'precio'=> $this->precio,
            'esDinamico'=> $this->esDinamico
            )
        );
        return json_encode($data);
    }

}
