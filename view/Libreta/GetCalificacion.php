<?php
$Libretita = $_POST['Libreta'];
$CI = $_POST['CI'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->GetCalificacion($Libretita, $CI);
echo json_encode($resultado);
