<?php
Session_start();
$Libretita=$_POST['Libreta'];
$CI=$_POST['CI'];
$Periodo=$_POST['Periodo'];
$nota=$_POST['nota'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->SetPromedio($CI, $Libretita, $nota, 'P', $Periodo, $_SESSION['CI'], $_SESSION['Seccion']);
echo json_encode($resultado);