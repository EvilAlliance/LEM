<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$controller = new controllerLogin;
$resultado = $controller->importarRoles($_SESSION['CI']);
echo json_encode($resultado);
