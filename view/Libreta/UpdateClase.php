<?php
$Libretita = $_POST['Libreta'];
$Modulo = (int)$_POST['Modulo'];
$ID = $_POST['ID'];
$Fecha = $_POST['Fecha'];
$Alumno = $_POST['Inasistencias'];
$Estado = $_POST['Estado'];
require_once $_SERVER['DOCUMENT_ROOT'] . '/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->UpdateClase($Modulo, $Alumno, $Estado, $ID, $Libretita);
echo json_encode($resultado);
