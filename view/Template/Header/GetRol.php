<?php
session_start();
if (isset($_SESSION['Rol'])){
    require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
    $controller = new controllerLogin;
    $resultado = $controller->importarRoles($_SESSION['CI']);
    $resultado -> Eleccion = $_SESSION['Rol'];
    echo json_encode($resultado);
} else {
    echo "";
}
