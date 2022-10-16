<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/CerrarSesion.php';
session_start();
$_SESSION['CI'] = $_POST['CI'];
$_SESSION['pass'] = $_POST['pass'];
$_SESSION['Seccion'] = 'Login';
if ($_SESSION['pass'] !== null &&  $_SESSION['CI'] !== null) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
    $controller = new controllerLogin;
    $resultado = $controller->IniciarSesion($_SESSION['CI'], $_SESSION['pass']);
    if (json_encode($resultado->Existe->Resultado) === '"Error Cuenta"') {
        $CerrarSesion = new controllerCerrarSesion;
        $CerrarSesion->CerrarSesionsinLog();
    }
    echo json_encode($resultado);
} else {
    echo  'Error Set';
}
