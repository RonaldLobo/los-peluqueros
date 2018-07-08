<?php

class Servicios {
    public $id=0;
    public $idUsuario=0;
    public $idUsuarioBarbero=0;
    public $calificacion=0;
    public $comentario="";

    function getId() {
        return $this->id;
    }

    function getIdUsuario() {
        return $this->idUsuario;
    }

    function getCalificacion() {
        return $this->calificacion;
    }

    function getIdUsuarioBarbero() {
        return $this->idUsuarioBarbero;
    }

    function getComentario() {
        return $this->comentario;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    function setCalificacion($calificacion) {
        $this->calificacion = $calificacion;
    }

    function setIdUsuarioBarbero($idUsuarioBarbero) {
        $this->idUsuarioBarbero = $idUsuarioBarbero;
    }

    function setComentario($comentario) {
        $this->comentario = $comentario;
    }
   
    function parseDto($calificacionBarbero) {
        if(isset($calificacionBarbero->idUsuario)){
            $this->idUsuario = $calificacionBarbero->idUsuario;
        }
        if(isset($calificacionBarbero->id)){
            $this->id = $calificacionBarbero->id;
        }
        if(isset($calificacionBarbero->calificacion)){
            $this->calificacion = $calificacionBarbero->calificacion;
        }
        if(isset($calificacionBarbero->idUsuarioBarbero)){
            $this->idUsuarioBarbero = $calificacionBarbero->idUsuarioBarbero;
        }
        if(isset($calificacionBarbero->comentario)){
            $this->comentario = $calificacionBarbero->comentario;
        }
    }
  
     function toJson() {
        $data = array(
        'calificacionBarbero' => array(
            'idUsuario' => $this->idUsuario,
            'idUsuarioBarbero' => $this->idUsuarioBarbero,
            'id'=>$this->id,
            'calificacion'=> $this->calificacion,
            'comentario'=> $this->comentario
            )
        );
        return json_encode($data);
    }

}
