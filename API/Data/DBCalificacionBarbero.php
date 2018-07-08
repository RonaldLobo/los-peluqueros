<?php
  
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/CalificacionBarbero.php';

class DBServicio {

    function agregarCalificacionBarbero($calificacionBarbero){
        $db = new DB();
        $sql = "INSERT INTO calificacionbarbero (FkIdUsuarioCalificacionBarbero,FkIdUsuarioBarberoCalificacionBarbero,Comentario,Calificacion) VALUES ("
                .$calificacionBarbero->idUsuario.","
                .$calificacionBarbero->idUsuarioBarbero.",'"
                .$calificacionBarbero->Comentario."',"
                .$calificacionBarbero->Calificacion. ")";
        $id = $db->agregar($sql);
        $calificacionBarbero->id = $id;
        return $calificacionBarbero;
    }
    
    
    function actualizarCalificacionBarbero($calificacionBarbero){
        $db = new DB();
        $sql = "UPDATE calificacionbarbero SET "
                . "Comentario=".$calificacionBarbero->Comentario.", "
                . "Calificacion='".$calificacionBarbero->Calificacion."'"
                . "WHERE PkIdCalificacionBarbero=".$calificacionBarbero->id;
        $db->actualizar($sql);
        return $calificacionBarbero;
    }
   

    
    function obtenerCalificacionBarbero($busqueda, $opcion){
        $sql = "SELECT PkIdCalificacionBarbero,FkIdUsuarioCalificacionBarbero,FkIdUsuarioBarberoCalificacionBarbero,Comentario,Calificacion FROM calificacionbarbero ";
        if($opcion == 1){
            $sql.= " WHERE FkIdUsuarioCalificacionBarbero=".$busqueda;
        }elseif ($opcion ==2) {
            $sql.= " WHERE PkIdCalificacionBarbero=".$busqueda;
        }elseif ($opcion ==3) {
            $sql.= " WHERE FkIdUsuarioBarberoCalificacionBarbero=".$busqueda;
        }
        $db = new DB();
       if( $opcion==0){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }    
        $calificacionBarbero = array();
        if(count($row) > 0 && $opcion!=1){            
             $calificacionBarbero = $this->parseDataList($row);
        } elseif (count($row) > 0 && $opcion==1) {
             $calificacionBarbero =  $this->parseRowCalificacionBarbero($row);              
        }
        return $calificacionBarbero;
    }


    
    function parseRowCalificacionBarbero($row) {
        $calificacionBarbero = new calificacionbarbero();
        if(isset($row['PkIdCalificacionBarbero'])){
            $calificacionBarbero->id = $row['PkIdCalificacionBarbero'];
        }
        if(isset($row['FkIdUsuarioCalificacionBarbero'])){
            $calificacionBarbero->idUsuario = $row['FkIdUsuarioCalificacionBarbero'];
        }
        if(isset($row['Calificacion'])){
            $calificacionBarbero->Calificacion = $row['Calificacion'];
        }
        if(isset($row['FkIdUsuarioBarberoCalificacionBarbero'])){
            $calificacionBarbero->idUsuarioBarbero = $row['FkIdUsuarioBarberoCalificacionBarbero'];
        }
        if(isset($row['Comentario'])){
            $calificacionBarbero->Comentario = $row['Comentario'];
        }
        return $calificacionBarbero;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowCalificacionBarbero($row));
        }
        return $parseDatos;
    }
    
    

    
}
