<?php

class Factura {

    public $fecha ='';    
    public $id =0;
    public $estado='';
    public $idCliente = null;
    public $idCreadoPor=0;
    public $idSucursal=0;
    public $total=0;
    public $totalImpuesto=0;
    public $totalDescuento=0;
    public $totalNeto=0;
    public $cantidad=0;
    public $moneda=0;
    public $detalle='';
    public $codigo='';
    public $tipoTransaccion='';
    public $numComprobante='';
    public $clave ='';
    public $consecutivo='';
    public $xml='';
    public $refresh='';
    public $nombreUserReserva='';
    public $primerApellidoUserReserva='';
    public $segundoApellidoUserReserva='';
    public $nombreBarbero='';
    public $primerApellidoBarbero='';
    public $segundoApellidoBarbero=''; 
    public $cedulaUser='';
    public $cedulaBarbero=''; 
    public $detalleFactura = array();
    public $idFacturadorBarbero = '';


    public $nombreCompletoBarbero ='';
    public $nombreCompletoUsuario ='';
    public $provinciaSucursal ='';
    public $cantonSucursal ='';
    public $distritoSucursal ='';
    public $detalleDireccionSucursal ='';
    public $nombreNegocio ='';
    public $tipoId ='';
    public $telefonoSucursal ='';
    public $correoSucursal ='';
    public $correoUsuario ='';




    function getNombreCompletoBarbero() {
        return $this->nombreCompletoBarbero;
    } 
    function getNombreCompletoUsuario() {
        return $this->nombreCompletoUsuario;
    } 
    function getProvinciaSucursal() {
        return $this->provinciaSucursal;
    } 
    function getCantonSucursal() {
        return $this->cantonSucursal;
    } 
    function getDistritoSucursal() {
        return $this->distritoSucursal;
    } 
    function getDetalleDireccionSucursal() {
        return $this->detalleDireccionSucursal;
    } 
    function getNombreNegocio() {
        return $this->nombreNegocio;
    } 
    function getTipoId() {
        return $this->tipoId;
    } 
    function getTelefonoSucursal() {
        return $this->telefonoSucursal;
    } 
    function getCorreoSucursal() {
        return $this->correoSucursal;
    } 
    function getCorreoUsuario() {
        return $this->correoUsuario;
    }
    
    function getNombreUserReserva() {
        return $this->nombreUserReserva;
    }      
    function getPrimerApellidoUserReserva() {
        return $this->primerApellidoUserReserva;
    }      
    function getSegundoApellidoUserReserva() {
        return $this->segundoApellidoUserReserva;
    }      
    function getNombreBarbero() {
        return $this->nombreBarbero;
    }      
    function getPrimerApellidoBarbero() {
        return $this->primerApellidoBarbero;
    }      
    function getBarrioSucursal() {
        return $this->barrioSucursal;
    }      

    function getIdFacturadorBarbero(){
        return $this->idFacturadorBarbero;
    }
    
    function getFecha() {
        return $this->fecha;
    }        
    
    function getIdCliente() {
        return $this->idCliente;
    }

    function getId() {
        return $this->id;
    }

    function getEstado() {
        return $this->estado;
    }

    function getIdCreadoPor() {
        return $this->idCreadoPor;
    }

    function getIdSucursal() {
        return $this->idSucursal;
    }

    function getTotal() {
        return $this->total;
    }

    function getTotalImpuesto() {
        return $this->totalImpuesto;
    }

    function getTotalDescuento() {
        return $this->totalDescuento;
    }

    function getTotalNeto() {
        return $this->totalNeto;
    }

    function getCantidad() {
        return $this->cantidad;
    }

    function getCodigo() {
        return $this->codigo;
    }

    function getMoneda() {
        return $this->moneda;
    }

    function getDetalle() {
        return $this->detalle;
    }

    function getTipoTransaccion() {
        return $this-> tipoTransaccion;
    }

    function getDetalleFactura(){
        return $this->detalleFactura;
    }

    function getNumComprobante(){
        return $this->numComprobante;
    }

    function getClave(){
        return $this->clave;
    }

    function getConsecutivo(){
        return $this->consecutivo;
    }

    function getXml(){
        return $this->xml;
    }

    function getRefresh(){
        return $this->refresh;
    }

    function getCedulaBarbero(){
        return $this->cedulaBarbero;
    }

    function getCedulaUser(){
        return $this->cedulaUser;
    }


    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setIdCliente($idCliente) {
        $this->idCliente = $idCliente;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setIdSucursal($idSucursal) {
        $this->idSucursal = $idSucursal;
    }

    function setIdCreadoPor($idCreadoPor) {
        $this->idCreadoPor = $idCreadoPor;
    }

     function setTotal($total) {
        $this->total = $total;
    }

    function setTotalImpuesto($totalImpuesto) {
        $this->totalImpuesto = $totalImpuesto;
    }

    function setTotalDescuento($totalDescuento) {
        $this->totalDescuento = $totalDescuento;
    }

    function setTotalNeto($totalNeto) {
        $this->totalNeto = $totalNeto;
    }

     function setMoneda($moneda) {
        $this-> moneda = $moneda;
    }

     function setCodigo($codigo) {
        $this->codigo = $codigo;
    }

     function setDetalle($detalle) {
        $this->detalle = $detalle;
    }

    function setTipoTransaccion($tipoTransaccion) {
        $this->tipoTransaccion = $tipoTransaccion;
    }
    
    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    function setDetalleFactura($detalleFactura) {
        $this->detalleFactura = $detalleFactura;
    }

    function setNumComprobante($numComprobante) {
        $this->numComprobante = $numComprobante;
    }

    function setClave($clave) {
        $this->clave = $clave;
    }
    function setConsecutivo($consecutivo) {
        $this->consecutivo = $consecutivo;
    }

    function setXml($xml) {
        $this->xml = $xml;
    }

    function setRefresh($refresh) {
        $this->refresh = $refresh;
    }

    function setNombreUserReserva($nombreUserReserva) {
        $this->nombreUserReserva = $nombreUserReserva;
    }

    function setPprimerApellidoUserReserva($primerApellidoUserReserva) {
        $this->primerApellidoUserReserva = $primerApellidoUserReserva;
    }

    function setSegundoApellidoUserReserva($segundoApellidoUserReserva) {
        $this->segundoApellidoUserReserva = $segundoApellidoUserReserva;
    }

    function setNombreBarbero($nombreBarbero) {
        $this->nombreBarbero = $nombreBarbero;
    }

    function setPrimerApellidoBarbero($primerApellidoBarbero) {
        $this->primerApellidoBarbero = $primerApellidoBarbero;
    }

    function setSsegundoApellidoBarbero($segundoApellidoBarbero) {
        $this->segundoApellidoBarbero = $segundoApellidoBarbero;
    }

    function setCedulaUser($cedulaUser) {
        $this->cedulaUser = $cedulaUser;
    }

    function setCedulaBarbero($cedulaBarbero) {
        $this->cedulaBarbero = $cedulaBarbero;
    }

    function setIdFacturadorBarbero($idFacturadorBarbero){
        $this->idFacturadorBarbero = $idFacturadorBarbero;
    }

    function setNombreCompletoBarbero($nombreCompletoBarbero) {
        $this->nombreCompletoBarbero = $nombreCompletoBarbero;
    }
    function setNombreCompletoUsuario($nombreCompletoUsuario) {
        $this->nombreCompletoUsuario = $nombreCompletoUsuario;
    }
    function setProvinciaSucursal($provinciaSucursal) {
        $this->provinciaSucursal = $provinciaSucursal;
    }
    function setCantonSucursal($cantonSucursal) {
        $this->cantonSucursal = $cantonSucursal;
    }
    function setDistritoSucursal($distritoSucursal) {
        $this->distritoSucursal = $distritoSucursal;
    }
    function setDetalleDireccionSucursal($detalleDireccionSucursal) {
        $this->detalleDireccionSucursal = $detalleDireccionSucursal;
    }
    function setNombreNegocio($nombreNegocio) {
        $this->nombreNegocio = $nombreNegocio;
    }
    function setTipoId($tipoId) {
        $this->tipoId = $tipoId;
    }
    function setTelefonoSucursal($telefonoSucursal) {
        $this->telefonoSucursal = $telefonoSucursal;
    }
    function setCorreoSucursal($correoSucursal) {
        $this->correoSucursal = $correoSucursal;
    }
    function setCorreoUsuario($correoUsuario) {
        $this->correoUsuario = $correoUsuario;
    }
    function setBarrioSucursal($barrioSucursal) {
        $this->barrioSucursal = $barrioSucursal;
    }






 function parseDto($factura) {
        if(isset($factura->id)){
            $this->id = $factura->id;
        }
        if(isset($factura->estado)){
            $this->estado = $factura->estado;
        }
        if(isset($factura->idSucursal)){
            $this->idSucursal = $factura->idSucursal;
        }
        if(isset($factura->idCreadoPor)){
            $this->idCreadoPor = $factura->idCreadoPor;
        }
        if(isset($factura->idCliente)){
            $this->idCliente = $factura->idCliente;
        }
         if(isset($factura->moneda)){
            $this->moneda = $factura->moneda;
        }
        if(isset($factura->total)){
            $this->total = $factura->total;
        }
        if(isset($factura->totalDescuento)){
            $this->totalDescuento = $factura->totalDescuento;
        }
        if(isset($factura->totalImpuesto)){
            $this->totalImpuesto = $factura->totalImpuesto;
        }
        if(isset($factura->totalNeto)){
            $this->totalNeto = $factura->totalNeto;
        }
        if(isset($factura->detalle)){
            $this->detalle = $factura->detalle;
        }
        if(isset($factura->tipoTransaccion)){
            $this->tipoTransaccion = $factura->tipoTransaccion;
        }
        if(isset($factura->codigo)){
            $this->codigo = $factura->codigo;
        }
        if(isset($factura->numComprobante)){
            $this->numComprobante = $factura->numComprobante;
        }     
        if(isset($factura->fecha)){
            $this->fecha = $factura->fecha;
        }
        if(isset($factura->clave)){
            $this->clave = $factura->clave;
        }
        if(isset($factura->consecutivo)){
            $this->consecutivo = $factura->consecutivo;
        }
        if(isset($factura->xml)){
            $this->xml = $factura->xml;
        }
        if(isset($factura->refresh)){
            $this->refresh = $factura->refresh;
        }  
        if(isset($factura->nombreUserReserva)){
            $this->nombreUserReserva = $factura->nombreUserReserva;
        }  
        if(isset($factura->primerApellidoUserReserva)){
            $this->primerApellidoUserReserva = $factura->primerApellidoUserReserva;
        }  
        if(isset($factura->segundoApellidoUserReserva)){
            $this->segundoApellidoUserReserva = $factura->segundoApellidoUserReserva;
        }  
        if(isset($factura->nombreBarbero)){
            $this->nombreBarbero = $factura->nombreBarbero;
        }  
        if(isset($factura->primerApellidoBarbero)){
            $this->primerApellidoBarbero = $factura->primerApellidoBarbero;
        }  
        if(isset($factura->segundoApellidoBarbero)){
            $this->segundoApellidoBarbero = $factura->segundoApellidoBarbero;
        }  
        if(isset($factura->cedulaBarbero)){
            $this->cedulaBarbero = $factura->cedulaBarbero;
        }  
        if(isset($factura->cedulaUser)){
            $this->cedulaUser = $factura->cedulaUser;
        }  
        if(isset($factura->idFacturadorBarbero)){
            $this->idFacturadorBarbero = $factura->idFacturadorBarbero;
        }   
        if(isset($factura->nombreCompletoBarbero)){
            $this->nombreCompletoBarbero = $factura->nombreCompletoBarbero;
        }  
        if(isset($factura->nombreCompletoUsuario)){
            $this->nombreCompletoUsuario = $factura->nombreCompletoUsuario;
        }  
        if(isset($factura->provinciaSucursal)){
            $this->provinciaSucursal = $factura->provinciaSucursal;
        }  
        if(isset($factura->cantonSucursal)){
            $this->cantonSucursal = $factura->cantonSucursal;
        }  
        if(isset($factura->distritoSucursal)){
            $this->distritoSucursal = $factura->distritoSucursal;
        }  
        if(isset($factura->detalleDireccionSucursal)){
            $this->detalleDireccionSucursal = $factura->detalleDireccionSucursal;
        }  
        if(isset($factura->nombreNegocio)){
            $this->nombreNegocio = $factura->nombreNegocio;
        }  
        if(isset($factura->tipoId)){
            $this->tipoId = $factura->tipoId;
        }  
        if(isset($factura->telefonoSucursal)){
            $this->telefonoSucursal = $factura->telefonoSucursal;
        }  
        if(isset($factura->correoSucursal)){
            $this->correoSucursal = $factura->correoSucursal;
        }  
        if(isset($factura->correoUsuario)){
            $this->correoUsuario = $factura->correoUsuario;
        }    
        if(isset($factura->barrioSucursal)){
            $this->barrioSucursal = $factura->barrioSucursal;
        }
    }
    



    function toJson() {
        $data = array(
        'factura' => array(
            'fecha' => $this->fecha,
            'id'=>$this->id,
            'estado'=> $this->estado,
            'idCliente'=> $this->idCliente,
            'idCreadoPor'=> $this->idCreadoPor,
            'idSucursal'=> $this->idSucursal,
            'total'=> $this->total,
            'totalImpuesto'=> $this->totalImpuesto,
            'totalDescuento'=> $this->totalDescuento,
            'totalNeto'=> $this->totalNeto,
            'cantidad'=>$this->cantidad,
            'moneda'=>$this->moneda,
            'detalle'=>$this->detalle,
            'codigo'=>$this->codigo,
            'tipoTransaccion'=>$this->tipoTransaccion,
            'detalleFactura'=>$this->detalleFactura,
            'numComprobante'=>$this->numComprobante,
            'clave'=>$this->clave,
            'consecutivo'=>$this->consecutivo,
            'xml'=>$this->xml,
            'refresh'=>$this->refresh,
            'nombreUserReserva'=>$this->nombreUserReserva,
            'primerApellidoUserReserva'=>$this->primerApellidoUserReserva,
            'segundoApellidoUserReserva'=>$this->segundoApellidoUserReserva,
            'nombreBarbero'=>$this->nombreBarbero,
            'primerApellidoBarbero'=>$this->primerApellidoBarbero,
            'segundoApellidoBarbero'=>$this->segundoApellidoBarbero,
            'cedulaBarbero'=>$this->cedulaBarbero,
            'cedulaUser'=>$this->cedulaUser,
            'idFacturadorBarbero'=>$this->idFacturadorBarbero,
            'nombreCompletoBarbero'=>$this->nombreCompletoBarbero,
            'nombreCompletoUsuario'=>$this->nombreCompletoUsuario,
            'provinciaSucursal'=>$this->provinciaSucursal,
            'cantonSucursal'=>$this->cantonSucursal,
            'distritoSucursal'=>$this->distritoSucursal,
            'barrioSucursal'=>$this->barrioSucursal,
            'detalleDireccionSucursal'=>$this->detalleDireccionSucursal,
            'nombreNegocio'=>$this->nombreNegocio,
            'tipoId'=>$this->tipoId,
            'telefonoSucursal'=>$this->telefonoSucursal,
            'correoSucursal'=>$this->correoSucursal,
            'correoUsuario'=>$this->correoUsuario
            )
        );
        return json_encode($data);
    }
    
    function AgregarDetalleFactura($detalleFact){
        array_push($this->detalleFactura, $detalleFact);
    }
}



