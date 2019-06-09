<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require '../API/Vendor/Slim/Slim.php';
require '../API/Vendor/JWT/JWT.php';
require '../API/Vendor/JWT/BeforeValidException.php';
require '../API/Vendor/JWT/ExpiredException.php';
require '../API/Vendor/JWT/SignatureInvalidException.php';

\Slim\Slim::registerAutoloader();

if (isset($_SERVER['HTTP_ORIGIN'])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}   
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
} 

date_default_timezone_set('America/Costa_Rica');

$app = new \Slim\Slim();

error_log("about to load");
error_log("about to BarberiaController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/BarberiaController.php';
error_log("about to UsuarioController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/UsuarioController.php';
error_log("about to HorarioBarberoController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/HorarioBarberoController.php';
error_log("about to PausaHorarioBarberoController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/PausaHorarioBarberoController.php';
error_log("about to ProvinciaCantonController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/ProvinciaCantonController.php';
error_log("about to AuthController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/AuthController.php';
error_log("about to ReservarController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/ReservarController.php';
error_log("about to ServicioController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/ServicioController.php';
error_log("about to SucursalController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/SucursalController.php';
error_log("about to InventarioController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/InventarioController.php';
error_log("about to FacturaController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/FacturaController.php';
error_log("about to AprobacionController");
require_once $_SERVER['DOCUMENT_ROOT'] . '/API/controllers/AprobacionController.php';

$app->run();
?>
