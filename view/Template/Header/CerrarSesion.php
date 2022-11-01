<?PHP
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/CerrarSesion.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/login.php';
$CerrarSesion = new controllerCerrarSesion;
$CerrarSesion->CerrarSesion($_SESSION['CI'], 'Cerro Sesion', $_SESSION['Seccion']);
$login= new controllerLogin();
$login->Iniciar();