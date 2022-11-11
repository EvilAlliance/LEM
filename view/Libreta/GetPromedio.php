<?php
$Libretita = $_POST['Libreta'];
$CI = $_POST['CI'];
$Periodo = $_POST['Periodo'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->GetPromedio($Libretita, $CI, $Periodo);
echo json_encode($resultado);
