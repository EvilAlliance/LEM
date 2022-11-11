<?php
Session_start();
$ID=$_POST['ID'];
require_once $_SERVER['DOCUMENT_ROOT'].'/Amari/controller/Libreta.php';
$controller = new controllerLibreta;
$resultado = $controller->DeleteCalificacion($ID, $_SESSION['CI'], $_SESSION['Seccion']);
echo json_encode($resultado);