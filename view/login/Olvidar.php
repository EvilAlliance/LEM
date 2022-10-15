<?php
session_start();
$_SESSION['Seccion'] = 'Login';
if ($_SESSION['CI'] !== null) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
    $controller = new controllerLogin;
    $resultado = $controller->Olvidar($_SESSION['CI'], 'Olvido Contrasena', $_SESSION['Seccion']);
    echo json_encode($resultado);
}
