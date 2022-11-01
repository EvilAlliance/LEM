<?php
session_start();
if ($_POST['CI'] !== null) {
    $_SESSION['CI']=$_POST['CI'];
    require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/login.php';
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
