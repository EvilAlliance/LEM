<?php
Session_start();
$Libretita=$_POST['Libreta'];
$CI=$_POST['Estudiante'];
$descripcion=$_POST['Descripcion'];
$nota=$_POST['Nota'];
$tipo=$_POST['Tipo'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->SerCalificacion($CI, $Libretita, $nota, $tipo, $descripcion, $_SESSION['CI'], $_SESSION['Seccion']);
echo json_encode($resultado);