<?php
$Libretita = $_POST['Libreta'];
$Modulo = (int)$_POST['Modulo'];
$Fecha = $_POST['Fecha'];
$Alumno = $_POST['Inasistencias'];
$Estado = $_POST['Estado'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->SetClase($Libretita, $Modulo, $Fecha, $Alumno, $Estado);
echo json_encode($resultado);
