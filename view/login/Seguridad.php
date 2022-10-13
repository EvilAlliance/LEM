<?php
session_start();

require_once $_SERVER['DOCUMENT_ROOT'] . '/controller/login.php';
$controller = new controllerLogin;
$resultado = $controller->HaySeguridad($_SESSION['CI']);
echo $resultado;
