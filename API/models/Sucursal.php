<?php


//require_once $_SERVER['DOCUMENT_ROOT'] . '/API/models/Telefono.php';

class Sucursal {
     
   
    public $id = 1;
    public $idCanton = 0;
    public $idBarberia = 0;
    public $idFacturaAPI = '';
    public $descripcion = '';
    public $detalleDireccion = '';
    public $estado = '';
    public $nombreBarberia = '';
    public $cedulaJuridica = '';
    public $nombreNegocio = '';
    public $distrito = '';
    public $barrio = '';
    public $canton = '';
    public $tipoId = '';
    public $provincia = 0;
    public $logo = '';
    public $logoAncho = 0;
    public $telefono = array();
    public $correo = array();
       
    
    function getId() {
        return $this->id;
    }

    function getIdCanton() {
        return $this->idCanton;
    }

    function getIdBarberia() {
        return $this->idBarberia;
    }

    function getIdFacturaAPI() {
        return $this->idFacturaAPI;
    } 
    function getDescripcion() {
        return $this->descripcion;
    }

    function getDetalleDireccion() {
        return $this->detalleDireccion;
    }

    function getEstado() {
        return $this->estado;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getNombreBarberia() {
        return $this->nombreBarberia;
    }
    
    function getNombreNegocio() {
        return $this->nombreNegocio;
    }

    function getCedulaJuridica() {
        return $this->cedulaJuridica;
    }

    function getDistrito() {
        return $this->distrito;
    }

    function getBarrio() {
        return $this->barrio;
    }

    function getProvincia() {
        return $this->provincia;
    }

    function setId($id) {
        $this->id = $id;
    }

    function getTipoId() {
        return $this->tipoId;
    }

    function setTipoId($tipoId) {
        $this->tipoId = $tipoId;
    }

    function getCanton() {
        return $this->canton;
    }

    function getLogo() {
        return $this->logo;
    }

    function getLogoAncho() {
        return $this->logoAncho;
    }

    function setLogo($logo) {
        $this->logo = $logo;
    }

    function setLogoAncho($logoAncho) {
        $this->logoAncho = $logoAncho;
    }

    function setCanton($canton) {
        $this->canton = $canton;
    }

    function setIdCanton($idCanton) {
        $this->idCanton = $idCanton;
    }

    function setIdBarberia($idBarberia) {
        $this->idBarberia = $idBarberia;
    }

    function setIdFacturaAPI($idFacturaAPI) {
        $this->idFacturaAPI = $idFacturaAPI;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setDetalleDireccion($detalleDireccion) {
        $this->detalleDireccion = $detalleDireccion;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setCorreo($correo) {
        $this->correo = $correo;
    }
    function setNombreBarberia($nombreBarberia) {
        $this->nombreBarberia = $nombreBarberia;
    }
    function setNombreNegocio($nombreNegocio) {
        $this->nombreNegocio = $nombreNegocio;
    }

    function setCedulaJuridica($cedulaJuridica) {
        $this->cedulaJuridica = $cedulaJuridica;
    }

    function setDistrito($distrito) {
        $this->distrito = $distrito;
    }
    function setBarrio($barrio) {
        $this->barrio = $barrio;
    }
    function setProvincia($provincia) {
        $this->provincia = $provincia;
    }
        
    function parseDto($sucursal) {
        if(isset($sucursal->idCanton)){
            $this->idCanton = $sucursal->idCanton;
        }
        if(isset($sucursal->id)){
            $this->id = $sucursal->id;
        }
        if(isset($sucursal->estado)){
            $this->estado = $sucursal->estado;
        }
        if(isset($sucursal->idBarberia)){
            $this->idBarberia = $sucursal->idBarberia;
        }
        if(isset($sucursal->idFacturaAPI)){
            $this->idFacturaAPI = $sucursal->idFacturaAPI;
        } 
        if(isset($sucursal->descripcion)){
            $this->descripcion = $sucursal->descripcion;
        }
        if(isset($sucursal->detalleDireccion)){
            $this->detalleDireccion = $sucursal->detalleDireccion;
        }
        if(isset($sucursal->nombreNegocio)){
            $this->nombreNegocio = $sucursal->nombreNegocio;
        }
        if(isset($sucursal->cedulaJuridica)){
            $this->cedulaJuridica = $sucursal->cedulaJuridica;
        } 
        if(isset($sucursal->distrito)){
            $this->distrito = $sucursal->distrito;
        }
        if(isset($sucursal->barrio)){
            $this->barrio = $sucursal->barrio;
        }
        if(isset($sucursal->provincia)){
            $this->provincia = $sucursal->provincia;
        }
        if(isset($sucursal->canton)){
            $this->canton = $sucursal->canton;
        }
        if(isset($sucursal->tipoId)){
            $this->tipoId = $sucursal->tipoId;
        }
        if(isset($sucursal->logo)){
            $this->logo = $sucursal->logo;
        }
        if(isset($sucursal->logoAncho)){
            $this->logoAncho = $sucursal->logoAncho;
        }
    }
    
    function AgregarTelefono($tel){
        array_push($this->telefono, $tel);
    }
    
     function AgregarCorreo($email){
        array_push($this->correo, $email);
    }
     function toJson() {
        $data = array(
        'sucursal' => array(
            'idCanton' => $this->idCanton,
            'id'=>$this->id,
            'idBarberia'=> $this->idBarberia,
            'idFacturaAPI'=> $this->idFacturaAPI,
            'descripcion'=> $this->descripcion,
            'detalleDireccion'=> $this->detalleDireccion,
            'estado'=> $this->estado,
            'telefono'=>$this->telefono,
            'correo'=>$this->correo,
            'nombreNegocio'=> $this->nombreNegocio,
            'cedulaJuridica'=> $this->cedulaJuridica,
            'barrio'=>$this->barrio,
            'distrito'=>$this->distrito,
            'provincia'=>$this->provincia,
            'canton'=>$this->canton,
            'tipoId'=>$this->tipoId,
            'logo'=>$this->logo,
            'logoAncho'=>$this->logoAncho
            )
        );
        return json_encode($data);
    }
}
