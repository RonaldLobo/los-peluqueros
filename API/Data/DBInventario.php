<?php


require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DB.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Inventario.php';

class DBInventario {
 
    
    function agregarInventario($inventario){
        $db = new DB();
        $sql = "INSERT INTO inventario (FkIdSucursalBarberia, Producto,Codigo, CantidadDisponible, CantidadMinima, Precio, Costo,Marca, Ubicacion, Descripcion, Descuento, Impuesto, Proveedor, Categoria, Utilidad, Modelo, Descripcion,Estado) VALUES ("
                .$inventario->idSucursal.",'"
                .$inventario->producto."','"
                .$inventario->codigo."',"
                .$inventario->cantDisponible.","
                .$inventario->cantMinima.",'"
                .$inventario->precio."','"
                .$inventario->costo."','"
                .$inventario->marca."','"
                .$inventario->ubicacion."','"
                .$inventario->descripcion."','"
                .$inventario->descuento."','"
                .$inventario->impuesto."','"
                .$inventario->proveedor."',"
                .$inventario->categoria.",'"
                .$inventario->utilidad."','"
                .$inventario->modelo."','"
                .$inventario->descripcion."',"
                .$inventario->estado. ")";
        $id = $db->agregar($sql);
        $inventario->id = $id;
        return $inventario;
    }
    
    
    function actualizarInventario($inventario){
        $db = new DB();
        $sql = "UPDATE inventario SET "
                . "Producto='".$inventario->producto."', "
                . "FkIdSucursalBarberia=".$inventario->idSucursal.","
                . "Codigo='".$inventario->codigo."',"
                . "Marca='".$inventario->marca."',"
                . "CantidadDisponible=".$inventario->cantDisponible.","
                . "CantidadMinima=".$inventario->cantMinima.","
                . "Precio='".$inventario->precio."',"
                . "Costo='".$inventario->costo."',"
                . "Ubicacion='".$inventario->ubicacion."',"
                . "Descripcion='".$inventario->descripcion."',"
                . "Descuento='".$inventario->descuento."',"
                . "Impuesto='".$inventario->impuesto."',"
                . "Proveedor='".$inventario->proveedor."',"
                . "Utilidad='".$inventario->utilidad."',"
                . "Categoria=".$inventario->categoria.","
                . "Modelo='".$inventario->modelo."',"
                . "Estado=".$inventario->estado
                . " WHERE PkIdInventario=".$inventario->id;
        $db->actualizar($sql);
        return $inventario;
    }
   
    function eliminar($id){
        $db = new DB();
        $sql = "UPDATE inventario SET Estado=0 WHERE PkIdInventario=".$id;
        $db->actualizar($sql);   
    }
   
    function obtenerInventario($busqueda, $busqueda2, $opcion){
        $sql = "SELECT PkIdInventario,FkIdSucursalBarberia,Producto,Codigo,CantidadDisponible,CantidadMinima,Marca,Precio,Costo,Ubicacion,Descripcion,Descuento,Impuesto,Proveedor,Utilidad,Categoria,Modelo, Estado FROM inventario WHERE Estado=1 ";
        if($opcion == 1){
            $sql.= " AND PkIdInventario=".$busqueda;
        } elseif ($opcion == 2) {
            $sql.= " AND Producto LIKE '%".$busqueda."%' AND FkIdSucursalBarberia=".$busqueda2;
        } elseif ($opcion == 3) {
            $sql.= " AND Codigo LIKE '%".$busqueda."%' AND FkIdSucursalBarberia=".$busqueda2;
        }elseif ($opcion == 4) {
            $sql.= " AND FkIdSucursalBarberia=".$busqueda2;
        }

        $db = new DB();        
        if($opcion == 1){
            $row = $db->obtenerUno($sql); 
        }else{
            $row = $db->listar($sql);           
        }
        $inventario= array();


        if($opcion==1){      
            $inventario =  $this->parseRowInventario($row);  
        } else {
            $inventario = $this->parseDataList($row);             
        }
        return $inventario;
    }
    
    function parseRowInventario($row) {
        $inventario = new Inventario();
        if(isset($row['PkIdInventario'])){
            $inventario->id = $row['PkIdInventario'];
        }
        if(isset($row['FkIdSucursalBarberia'])){
            $inventario->idSucursal = $row['FkIdSucursalBarberia'];
        }
        if(isset($row['Codigo'])){
            $inventario->codigo = $row['Codigo'];
        }
        if(isset($row['Producto'])){
            $inventario->producto = $row['Producto'];
        }
        if(isset($row['Descripcion'])){
            $inventario->descripcion = $row['Descripcion'];
        }
        if(isset($row['Modelo'])){
            $inventario->modelo = $row['Modelo'];
        }
        if(isset($row['Marca'])){
            $inventario->marca = $row['Marca'];
        }
        if(isset($row['Descuento'])){
            $inventario->descuento = $row['Descuento'];
        }
        if(isset($row['Impuesto'])){
            $inventario->impuesto = $row['Impuesto'];
        }
        if(isset($row['Precio'])){
            $inventario->descripcion = $row['Precio'];
        }
        if(isset($row['Costo'])){
            $inventario->costo = $row['Costo'];
        }
        if(isset($row['CantidadDisponible'])){
            $inventario->cantDisponible = $row['CantidadDisponible'];
        }
        if(isset($row['CantidadMinima'])){
            $inventario->cantMinima = $row['CantidadMinima'];
        }
        if(isset($row['Utilidad'])){
            $inventario->utilidad = $row['Utilidad'];
        }
        if(isset($row['Categoria'])){
            $inventario->categoria = $row['Categoria'];
        }
        if(isset($row['Proveedor'])){
            $inventario->proveedor = $row['Proveedor'];
        }
        if(isset($row['Estado'])){
            $inventario->estado = $row['Estado'];
        }
        return $inventario;
    }
    
 
    function parseDataList($rowList) {
        $parseDatos = array();
        foreach ($rowList as $row) {
            array_push($parseDatos, $this->parseRowInventario($row));
        }
        return $parseDatos;
    }
    
}
