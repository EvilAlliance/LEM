<?php
session_start();
$_SESSION['CI'] = $_POST['CI'];

if ($_SESSION['CI'] !== null) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
    $controller = new controllerLogin;
    $resultado = $controller->GetCuenta($_SESSION['CI']);
    if (json_encode($resultado->Existe->Resultado) === '"Error Usuario"') {
        $CerrarSesion = new controllerCerrarSesion;
        $CerrarSesion->CerrarSesionsinLog();
    }
    echo json_encode($resultado);
} else {
    echo "Campo Vacio";
}
