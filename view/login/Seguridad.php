<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/login.php';
$controller = new controllerLogin;
$resultado = $controller->HaySeguridad($_SESSION['CI']);
echo json_encode($resultado);
