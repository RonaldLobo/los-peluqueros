<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Proveedor.php';

class DBProveedor {
 
    
    function agregarProveedor($proveedor){
        $db = new DB();
        $sql = "INSERT INTO proveedor (Nombre,Correo,Telefono,Estado) VALUES ('"
                .$proveedor->nombre."','"
                .$proveedor->Correo."',"
                .$proveedor->Telefono.","
                .$proveedor->estado. ")";
        $id = $db->agregar($sql);
        $proveedor->id = $id;
        return $proveedor;
    }
    
    
    function actualizarProveedor($proveedor){
        $db = new DB();
        $sql = "UPDATE proveedor SET "
                . "Nombre='".$proveedor->nombre."', "
                . "Correo='".$proveedor->Correo."',"
                . "Telefono=".$proveedor->Telefono.","
                . "Estado=".$proveedor->estado
                . " WHERE PkIdProveedor=".$proveedor->id;
        $db->actualizar($sql);
        return $proveedor;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE proveedor SET Estado=0 WHERE PkIdProveedor=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerProveedor($busqueda, $opcion){
        $sql = "SELECT PkIdProveedor,Nombre,Correo,Telefono,Estado FROM proveedor WHERE Estado=1";
        if($opcion == 1){
            $sql.= " AND PkIdProveedor=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND Nombre LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= " AND Nombre = '".$busqueda."'";
        }
        $db = new DB();        
        if($opcion == 0 || $opcion==2){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }
        $proveedor= array();
        if(count($row) > 0 && ($opcion==0 || $opcion==2)){            
             $proveedor = $this->parseDataList($row);
        } elseif (count($row) > 0 && ($opcion==1 || $opcion==3)) {
             $proveedor =  $this->parseRowProveedor($row);              
        }
        return $proveedor;
    }
    
    function parseRowProveedor($row) {
        $proveedor = new Proveedor();
        if(isset($row['PkIdProveedor'])){
            $proveedor->id = $row['PkIdProveedor'];
        }
        if(isset($row['Nombre'])){
            $proveedor->nombre = $row['Nombre'];
        }
        if(isset($row['Correo'])){
            $proveedor->Correo = $row['Correo'];
        }
        if(isset($row['Telefono'])){
            $proveedor->Telefono = $row['Telefono'];
        }
        if(isset($row['Estado'])){
            $proveedor->estado = $row['Estado'];
        }
        return $proveedor;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowProveedor($row));
        }
        return $parseDatos;
    }
    
  
       
  
   
    
}
