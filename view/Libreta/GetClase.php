<?php
$Libretita = $_POST['Libreta'];
$Fecha = $_POST['Fecha'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->GetClase($Libretita, $Fecha);
echo json_encode($resultado);
