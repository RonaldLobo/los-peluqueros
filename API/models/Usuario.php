<?php

class Usuario {
    public $id = 0;
    public $nombre = '';
    public $apellido1 = '';
    public $apellido2 = '';
    public $usuario = '';
    public $contrasenna = '';
    public $idSucursal= 0;
    public $tipo= '';
    public $estado= '';  
    public $rol= ''; 
    public $tiempoBarbero = 0;
    public $fechaNacimiento = '';
    public $telefono = array();
    public $correo = array();
    public $servicios = array();
    public $horarios = array();
    public $cedula = '';
    public $idProvincia = 0;
    public $idCanton = 0;
    public $distrito = '';
    public $barrio = '';
    public $detalleDireccion = '';
       
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getApellido1() {
        return $this->apellido1;
    }

    function getApellido2() {
        return $this->apellido2;
    }

    function getUsuario() {
        return $this->usuario;
    }

    function getContrasenna() {
        return $this->contrasenna;
    }

    function getIdSucursal() {
        return $this->idSucursal;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getEstado() {
        return $this->estado;
    }

    function getRol() {
        return $this->rol;
    }

    function getTiempoBarbero() {
        return $this->tiempoBarbero;
    }

    function getFechaNacimiento() {
        return $this->fechaNacimiento;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getServicios() {
        return $this->servicios;
    }

    function getHorarios() {
        return $this->horarios;
    }
    function getCedula() {
        return $this->cedula;
    }

    function getIdProvincia() {
        return $this->idProvincia;
    }

    function getIdCanton() {
        return $this->idCanton;
    }

    function getDistrito() {
        return $this->distrito;
    }

    function getBarrio() {
        return $this->barrio;
    }

    function getDetalleDireccion() {
        return $this->detalleDireccion;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setApellido1($apellido1) {
        $this->apellido1 = $apellido1;
    }

    function setApellido2($apellido2) {
        $this->apellido2 = $apellido2;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    function setContrasenna($contrasenna) {
        $this->contrasenna = $contrasenna;
    }

    function setIdSucursal($idSucursal) {
        $this->idSucursal = $idSucursal;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setRol($rol) {
        $this->rol = $rol;
    }

    function setTiempoBarbero($tiempoBarbero) {
        $this->tiempoBarbero = $tiempoBarbero;
    }

    function setFechaNacimiento($fechaNacimiento) {
        $this->fechaNacimiento = $fechaNacimiento;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setCorreo($correo) {
        $this->correo = $correo;
    }

    function setServicios($servicios) {
        $this->servicios = $servicios;
    }

    function setHorarios($horarios) {
        $this->horarios = $horarios;
    }

    function setCedula($cedula) {
        $this->cedula = $cedula;
    }

    function setIdProvincia($idProvincia) {
        $this->idProvincia = $idProvincia;
    }

    function setIdCanton($idCanton) {
        $this->idCanton = $idCanton;
    }

    function setDistrito($distrito) {
        $this->distrito = $distrito;
    }

    function setBarrio($barrio) {
        $this->barrio = $barrio;
    }

    function setDetalleDireccion($detalleDireccion) {
        $this->detalleDireccion = $detalleDireccion;
    }

       
    function toJson() {
        $data = array(
        'usuario' => array(
            'nombre' => $this->nombre,
            'id'=>$this->id,
            'apellido1'=> $this->apellido1,
            'apellido2'=> $this->apellido2,
            'usuario'=> $this->usuario,
            'contrasenna'=> $this->contrasenna,
            'idSucursal'=> $this->idSucursal,
            'idSucursalBarberia'=> $this->idSucursalBarberia,
            'tipo'=> $this->tipo,
            'estado'=> $this->estado,
            'telefono'=>$this->telefono,
            'correo'=>$this->correo,
            'rol'=>$this->rol,
            'tiempoBarbero'=>$this->tiempoBarbero,
            'fechaNacimiento'=>$this->fechaNacimiento,
            'telefono'=>$this->telefono,
            'correo'=>$this->correo,
            'cedula'=>$this->cedula,
            'idProvincia'=>$this->idProvincia,
            'idCanton'=>$this->idCanton,
            'distrito'=>$this->distrito,
            'barrio'=>$this->barrio,
            'detalleDireccion'=>$this->detalleDireccion
            )
        );
        return json_encode($data);
    }
    
    function AgregarTelefono($tel){
        array_push($this->telefono, $tel);
    }
    
     function AgregarCorreo($email){
        array_push($this->correo, $email);
    }
    
     function AgregarServicios($service){
        array_push($this->servicios, $service);
    }
    
    function parseDto($user) {
        if(isset($user->nombre)){
            $this->nombre = $user->nombre;
        }
        if(isset($user->id)){
            $this->id = $user->id;
        }
        if(isset($user->apellido1)){
            $this->apellido1 = $user->apellido1;
        }
        if(isset($user->apellido2)){
            $this->apellido2 = $user->apellido2;
        }
        if(isset($user->usuario)){
            $this->usuario = $user->usuario;
        }
        if(isset($user->tipo)){
            $this->tipo = $user->tipo;
        }
        if(isset($user->contrasenna)){
            $this->contrasenna = $user->contrasenna;
        }
        if(isset($user->estado)){
            $this->estado = $user->estado;
        }
        if(isset($user->idSucursal)){
            $this->idSucursal = $user->idSucursal;
        }
        if(isset($user->rol)){
            if($user->rol == "BA" || $user->rol == "AB"){
                $user->rol = "BS";
            }
            $this->rol = $user->rol;
        }
        if(isset($user->tiempoBarbero)){
            $this->tiempoBarbero = $user->tiempoBarbero;
        }
        if(isset($user->fechaNacimiento)){
            $this->fechaNacimiento = $user->fechaNacimiento;
        }
        if(isset($user->cedula)){
            $this->cedula = $user->cedula;
        }
        if(isset($user->idProvincia)){
            $this->idProvincia = $user->idProvincia;
        }
        if(isset($user->idCanton)){
            $this->idCanton = $user->idCanton;
        }
        if(isset($user->distrito)){
            $this->distrito = $user->distrito;
        }
        if(isset($user->barrio)){
            $this->barrio = $user->barrio;
        }
        if(isset($user->detalleDireccion)){
            $this->detalleDireccion = $user->detalleDireccion;
        }
    }
    
} 
