<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Producto.php';

class DBProducto {
 
    
    function agregarProducto($producto){
        $db = new DB();
        $sql = "INSERT INTO producto (FkIdProveedorProducto,Nombre,Codigo,Marca,Estado) VALUES ("
                .$producto->idProveedor.",'"
                .$producto->nombre."','"
                .$producto->Codigo."','"
                .$producto->Marca."',"
                .$producto->estado. ")";
        $id = $db->agregar($sql);
        $producto->id = $id;
        return $producto;
    }
    
    
    function actualizarProducto($producto){
        $db = new DB();
        $sql = "UPDATE producto SET "
                . "Nombre='".$producto->nombre."', "
                . "FkIdProveedorProducto=".$producto->idProveedor.","
                . "Codigo='".$producto->Codigo."',"
                . "Marca='".$producto->Marca."',"
                . "Estado=".$producto->estado
                . " WHERE PkIdProducto=".$producto->id;
        $db->actualizar($sql);
        return $producto;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE producto SET Estado=0 WHERE PkIdProducto=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerProducto($busqueda, $opcion){
        $sql = "SELECT PkIdProducto,FkIdProveedorProducto,Nombre,Codigo,Marca,Estado FROM producto WHERE Estado=1";
        if($opcion == 1){
            $sql.= " AND PkIdProducto=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND Nombre LIKE '%".$busqueda."%'";
        } elseif ($opcion == 3) {
            $sql.= " AND Nombre = '".$busqueda."'";
        }elseif ($opcion == 4) {
            $sql.= " AND FkIdProveedorProducto = ".$busqueda;
        }
        $db = new DB();        
        if($opcion == 0 || $opcion==2){
            $row = $db->listar($sql);
        }else{
            $row = $db->obtenerUno($sql);            
        }
        $producto= array();
        if(count($row) > 0 && ($opcion==0 || $opcion==2)){            
             $producto = $this->parseDataList($row);
        } elseif (count($row) > 0 && ($opcion==1 || $opcion==3)) {
             $producto =  $this->parseRowProducto($row);              
        }
        return $producto;
    }
    
    function parseRowProducto($row) {
        $producto = new Producto();
        if(isset($row['PkIdProducto'])){
            $producto->id = $row['PkIdProducto'];
        }
        if(isset($row['Nombre'])){
            $producto->nombre = $row['Nombre'];
        }
        if(isset($row['Codigo'])){
            $producto->Codigo = $row['Codigo'];
        }
        if(isset($row['IdProveedor'])){
            $producto->idProveedor = $row['IdProveedor'];
        }
        if(isset($row['Marca'])){
            $producto->Marca = $row['Marca'];
        }
        if(isset($row['Estado'])){
            $producto->estado = $row['Estado'];
        }
        return $producto;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowProducto($row));
        }
        return $parseDatos;
    }
    
  
       
  
   
    
}
