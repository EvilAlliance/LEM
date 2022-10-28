<?php
if ( session_status() !== PHP_SESSION_ACTIVE){
    session_start();
}
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$_SESSION['Seccion'] = 'Login';

if (isset($_SESSION['CI'])) {
    if (isset($_SESSION['Rol'])) {
        $controller = new controllerLogin;
        $link = $controller->Pestana($_SESSION['Rol']);
        echo $link;
    } else {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/CerrarSesion.php';
        $CerrarSesion = new controllerCerrarSesion;
        $CerrarSesion->CerrarSesionsinLog();
        $Controllerlogin = new controllerLogin();
        $Controllerlogin->Iniciar();
        echo "index.php";
    }
}
