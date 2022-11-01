<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/CerrarSesion.php';
session_start();
if ($_SESSION['CI'] !== null) {
    require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/login.php';
    $controller = new controllerLogin;
    $resultado = $controller->Olvidar($_SESSION['CI'], 'Olvido Contrasena', $_SESSION['Seccion']);
    if (json_encode($resultado->Seguridad->Resultado) === '"Error Peticion Seguridad"' || json_encode($resultado->Seguridad->Resultado) ==='"Error en Base de Datos"' || count($resultado->Seguridad->Resultado) < 2) {
        $CerrarSesion = new controllerCerrarSesion;
        $CerrarSesion->CerrarSesionsinLog();
    }
    echo json_encode($resultado);
}
