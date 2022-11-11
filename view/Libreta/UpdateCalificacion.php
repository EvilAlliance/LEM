<?php
Session_start();
$ID=$_POST['ID'];
$descripcion=$_POST['Descripcion'];
$nota=$_POST['Nota'];
$tipo=(String) $_POST['Tipo'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->UpdateCalificacion($ID, $nota, $tipo, $descripcion, $_SESSION['CI'], $_SESSION['Seccion']);
echo json_encode($resultado);